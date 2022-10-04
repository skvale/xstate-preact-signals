import { h } from 'preact';
import { send, currentState } from './Machine';

export const OtherComponent = ({}) => {
  return (
    <div class="my-2">
      <button
        class="bg-gray-900 active:bg-gray-700 py-2 px-4 text-gray-100 my-4 block"
        onClick={() => {
          send({ type: 'ACTION' });
        }}
      >
        {currentState.value === 'adding' ? 'Add to' : 'Subtract from'} state
        count
      </button>
      <button
        class="bg-gray-900 active:bg-gray-700 py-2 px-4 text-gray-100"
        onClick={() => {
          send({ type: 'ACTION2' });
        }}
      >
        {currentState.value === 'adding' ? 'Add to' : 'Subtract from'} state
        text
      </button>
    </div>
  );
};
