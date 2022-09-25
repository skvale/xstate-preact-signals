import { h } from "preact";
import { send, currentState, count, text } from "./Machine";

type TwoStateAppProps = {
  path?: string;
};

let rerenderCount = 0;
export const TwoStateApp = ({}: TwoStateAppProps) => {
  rerenderCount += 1;
  return (
    <div class="m-16">
      <div>
        The buttons in the top right are in a different part of the Preact tree,
        they alter the data for this component
      </div>
      <br />
      <hr />
      <br />
      <div>
        This component, <code>TwoStateApp</code> doesn't have any local state.
        It imports the state it needs
        <br />
        <hr />
        <br />
        <code>
          <pre>
            {`import { send, currentState, count, text } from "./Machine";`}
          </pre>
        </code>
      </div>
      <br />
      <hr />
      <br />
      <div>rendered {rerenderCount} times</div>
      <br />
      <hr />
      <br />
      <p>A machine with 2 states</p>
      <div>Count: {count.value}</div>
      <div>Text: {text.value}</div>
      <br />
      <hr />
      <br />
      <hr />
      <button
        class={`bg-gray-300 border-4 ${
          currentState.value === "adding"
            ? "border-stone-700"
            : "border-indigo-400"
        } active:bg-gray-200 py-2 px-4`}
        onClick={() => {
          send({ type: "NEXT" });
        }}
      >
        {currentState.value}
      </button>
    </div>
  );
};
