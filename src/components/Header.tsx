import { h } from "preact";
import { Link } from "preact-router/match";
import { send } from "../routes/TwoState/Machine";

const HEADER_BUTTON_CLASS =
  "hover:underline inline-block py-2 px-4 text-gray-700 border border-transparent";
const routes = [
  { path: "/", text: "Home" },
  { path: "/two-state", text: "2 state machine" },
];

export const Header = () => (
  <nav class="flex items-center flex-wrap bg-stone-300 p-4 w-full border-b border-slate-500">
    <a href="/" class="flex items-center flex-shrink-0 text-gray-900 mr-6">
      <div class="w-30">Preact App</div>
    </a>
    <div class="flex-grow w-auto">
      <ul class="flex justify-start items-center">
        {routes.map((route) => (
          <li class="mr-3" key={route.path}>
            <Link
              class={HEADER_BUTTON_CLASS}
              activeClassName="text-slate-900 underline bg-gray-100 border border-gray-800"
              href={route.path}
            >
              {route.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <button
      class={HEADER_BUTTON_CLASS}
      onClick={() => {
        send({ type: "ACTION" });
      }}
    >
      Update state count
    </button>
    <button
      class={HEADER_BUTTON_CLASS}
      onClick={() => {
        send({ type: "ACTION2" });
      }}
    >
      Update state text
    </button>
  </nav>
);
