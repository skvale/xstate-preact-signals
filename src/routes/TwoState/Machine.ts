import { signal } from "@preact/signals";
import { assign, createMachine, interpret } from "xstate";

const initialContext = {
  count: 0,
  text: "aa",
};
const twoStateMachine = createMachine(
  {
    schema: {
      context: {} as typeof initialContext,
    },
    id: "simple",
    initial: "adding",
    context: initialContext,
    states: {
      adding: {
        on: {
          NEXT: {
            target: "subtracting",
          },
          ACTION: {
            actions: ["addOne"],
          },
          ACTION2: {
            actions: ["addLetter"],
          },
        },
      },
      subtracting: {
        on: {
          NEXT: { target: "adding" },
          ACTION: {
            actions: ["subtractOne"],
          },
          ACTION2: {
            actions: ["removeLetter"],
          },
        },
      },
    },
  },
  {
    actions: {
      addOne: assign({
        count: (context) => context.count + 1,
      }),
      addLetter: assign({
        text: (context) => `${context.text}a`,
      }),
      subtractOne: assign({
        count: (context) => context.count - 1,
      }),
      removeLetter: assign({
        text: (context) => context.text.slice(0, context.text.length - 1),
      }),
    },
  }
);

const service = interpret(twoStateMachine);

export const send = service.send;
export const currentState = signal(service.getSnapshot().value);
export const count = signal(initialContext.count);
export const text = signal(initialContext.text);

service.onTransition(({ context, value }) => {
  currentState.value = value;
  count.value = context.count;
  text.value = context.text;
});
service.start();
