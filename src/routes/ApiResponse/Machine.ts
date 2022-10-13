import { signal } from '@preact/signals';
import {
  AnyEventObject,
  assign,
  createMachine,
  EventObject,
  interpret,
} from 'xstate';

const API = 'http://colormind.io/api/';
const API_LIST = 'http://colormind.io/list/';

export type Color = [number, number, number];

const initialContext: { data: Color[]; options: string[] } = {
  data: [],
  options: [],
};

type ApiListResponseEvent = EventObject & {
  json: { result: string[] };
};
type ApiResponseEvent = EventObject & {
  json: { result: [number, number, number][] };
};
type FetchEvent = EventObject & {
  value: string;
};
type RandomizeEvent = EventObject & { idx: number };
type Events = EventObject | ApiResponseEvent | RandomizeEvent | FetchEvent;

const apiMachine = createMachine<typeof initialContext, Events>(
  {
    predictableActionArguments: true,
    id: 'api',
    initial: 'loading',
    context: initialContext,
    states: {
      loading: {
        invoke: {
          src: () => async (callback) => {
            try {
              const result = await fetch(API_LIST, {
                method: 'GET',
              });
              const json = await result.json();
              callback({ type: 'LIST_SUCCESS', json });
            } catch (e) {
              callback({ type: 'ERROR' });
            }
          },
        },
        on: {
          LIST_SUCCESS: {
            target: 'loaded',
            actions: 'loadedListComplete',
          },
        },
      },
      fetchScheme: {
        invoke: {
          src: (context, event: AnyEventObject) => async (callback) => {
            try {
              const result = await fetch(API, {
                method: 'POST',
                body: JSON.stringify({ model: event.value }),
              });
              const json = await result.json();
              callback({ type: 'SUCCESS', json });
            } catch (e) {
              callback({ type: 'ERROR' });
            }
          },
        },
        on: {
          SUCCESS: {
            target: 'loaded',
            actions: 'loadedComplete',
          },
        },
      },
      loaded: {
        on: {
          FETCH: { target: 'fetchScheme' },
          RANDOMIZE: {
            actions: 'randomize',
          },
        },
      },
      error: {
        on: {},
      },
    },
  },
  {
    actions: {
      loadedListComplete: assign({
        options: (_context, event: AnyEventObject) =>
          (event as ApiListResponseEvent).json.result,
      }),
      loadedComplete: assign({
        data: (_context, event: AnyEventObject) =>
          (event as ApiResponseEvent).json.result,
      }),
      randomize: assign({
        data: (context, event: AnyEventObject) =>
          context.data.map((c, i) =>
            i === (event as RandomizeEvent).idx
              ? (c.map(() => Math.floor(Math.random() * 256)) as Color)
              : c
          ),
      }),
    },
  }
);

const service = interpret(apiMachine);

export const send = service.send;
export const currentState = signal(service.getSnapshot().value);
export const colors = signal(initialContext.data);
export const options = signal(initialContext.options);
service.onTransition(({ context, value }) => {
  currentState.value = value;
  colors.value = context.data;
  options.value = context.options;
});
service.start();
