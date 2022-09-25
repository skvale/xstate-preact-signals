import { signal } from "@preact/signals";
import { assign, createMachine, interpret } from "xstate";

const API = "http://colormind.io/api/";

type Color = [number, number, number];

const initialContext: { data: Color[] } = {
  data: [],
};

const apiMachine = createMachine(
  {
    schema: {
      context: {} as typeof initialContext,
    },
    id: "api",
    initial: "loading",
    context: initialContext,
    states: {
      loading: {
        invoke: {
          src: () => async (callback) => {
            try {
              const result = await fetch(API, {
                method: "POST",
                body: JSON.stringify({ model: "default" }),
              });
              const json = await result.json();
              callback({ type: "SUCCESS", json });
            } catch (e) {
              callback({ type: "ERROR" });
            }
          },
        },
        on: {
          SUCCESS: {
            target: "loaded",
            actions: "loadedComplete",
          },
        },
      },
      loaded: {
        on: {
          FETCH: { target: "loading" },
        },
      },
      error: {
        on: {},
      },
    },
  },
  {
    actions: {
      loadedComplete: assign({
        data: (_context, event: any) => event.json.result,
      }),
    },
  }
);

const service = interpret(apiMachine);

export const send = service.send;
export const currentState = signal(service.getSnapshot().value);
export const colors = signal(initialContext.data);
service.onTransition(({ context, value }) => {
  currentState.value = value;
  colors.value = context.data;
});
service.start();
