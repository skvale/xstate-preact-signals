import { h } from "preact";
import { send } from "./Machine";

export const OtherComponent = ({}) => {
  return (
    <div class="m-2">
      <button
        class="bg-gray-200 active:bg-gray-200 py-2 px-4 mr-4"
        onClick={() => {
          send({ type: "ACTION" });
        }}
      >
        Update state count
      </button>
      <button
        class="bg-gray-200 active:bg-gray-200 py-2 px-4"
        onClick={() => {
          send({ type: "ACTION2" });
        }}
      >
        Update state text
      </button>
    </div>
  );
};
