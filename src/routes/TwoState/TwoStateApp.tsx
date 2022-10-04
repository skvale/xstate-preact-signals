import { h } from 'preact';
import { send, currentState, count, text } from './Machine';
import { OtherComponent } from './OtherComponent';

type TwoStateAppProps = {
  path?: string;
};

let rerenderCount = 0;
export const TwoStateApp = ({}: TwoStateAppProps) => {
  rerenderCount += 1;
  return (
    <div class="m-16">
      <div class="my-8">
        This component doesn't have any local state It imports the state it
        needs
      </div>
      <div class="my-8 text-sm">
        <code>
          <pre>
            {`import { send, currentState, count, text } from "./Machine";`}
          </pre>
        </code>
      </div>
      <div class="text-sm mb-2">
        <div>Count: {count.value}</div>
        <div>Text: {text.value}</div>
      </div>
      <div class="mb-4">
        These buttons alter the context data from a different component
      </div>
      <OtherComponent />
      <div class="mb-4">
        Change the current state of the machine: {currentState.value}
      </div>
      <button
        class={`bg-gray-300 border-4 ${
          currentState.value === 'adding'
            ? 'border-stone-700'
            : 'border-indigo-400'
        } active:bg-gray-200 py-2 px-4`}
        onClick={() => {
          send({ type: 'NEXT' });
        }}
      >
        Change current state
      </button>

      <div class="mt-8 text-xs">component rendered {rerenderCount} times</div>
    </div>
  );
};
