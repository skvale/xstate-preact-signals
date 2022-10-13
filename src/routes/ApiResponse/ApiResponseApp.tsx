import { h } from 'preact';
import { ColorBar } from './ColorBar';
import { send, colors, options } from './Machine';

type ApiResponseAppProps = {
  path?: string;
};

let rerenderCount = 0;
export const ApiResponseApp = ({}: ApiResponseAppProps) => {
  rerenderCount += 1;

  return (
    <div class="m-16">
      <div>Rerendered: {rerenderCount}</div>
      <label className="block" htmlFor={'theme-select'}>
        Select a color theme
      </label>
      <select
        id="theme-select"
        onChange={(e) => {
          send({ type: 'FETCH', value: e.currentTarget.value });
        }}
      >
        <option>None</option>
        {options.value.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {colors.value.map((color, idx) => (
        <ColorBar key={`${idx}-${color.join('-')}`} color={color} idx={idx} />
      ))}
    </div>
  );
};
