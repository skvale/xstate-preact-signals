import { h } from 'preact';
import { send, Color } from './Machine';

type ColorBarProps = {
  color: Color;
  idx: number;
};

export const ColorBar = ({ color, idx }: ColorBarProps) => {
  return (
    <div
      class="p-4 m-4 hover:cursor-pointer"
      style={`background: rgb(${color.join(', ')})`}
    >
      <button
        class="px-4 py-2 inline-block bg-white mr-4"
        onClick={() => send('RANDOMIZE', { idx })}
      >
        Randomize
      </button>
      <div class="p-2 bg-white w-48 inline-block">{color.join(',')}</div>
    </div>
  );
};
