import { h } from "preact";
import { send, colors, currentState } from "./Machine";

type ApiResponseAppProps = {
  path?: string;
};

let rerenderCount = 0;
export const ApiResponseApp = ({}: ApiResponseAppProps) => {
  rerenderCount += 1;
  return (
    <div class="m-16">
      <div>Rerendered: {rerenderCount}</div>
      <div>{currentState.value}</div>
      <button
        class={`bg-gray-300 border-4 ${
          currentState.value === "loading"
            ? "border-stone-700"
            : "border-indigo-400"
        } active:bg-gray-200 py-2 px-4`}
        onClick={() => {
          send({ type: "FETCH" });
        }}
      >
        Fetch new colors
      </button>
      {colors.value.map((color) => (
        <div
          key={color.join(",")}
          class="p-8 m-4"
          style={`background: rgb(${color.join(", ")})`}
        >
          {color.join(",")}
        </div>
      ))}
    </div>
  );
};
