import { h } from 'preact';
import { Link } from 'preact-router/match';

export const HEADER_BUTTON_CLASS =
  'hover:underline inline-block py-2 px-4 text-gray-700 border border-transparent';

export const pages = [
  { path: '/two-state', text: '2 state machine' },
  { path: '/api-response', text: 'API Response' },
];

const routes = [{ path: '/', text: 'Home' }, ...pages];

export const Header = () => (
  <nav class="flex items-baseline flex-wrap bg-stone-300 pt-12 pb-2 px-12 w-full border-b-4 border-gray-900">
    <div class="w-30 text-xl text-gray-900 mr-6">XState Signals</div>
    <ul class="flex">
      {routes.map((route) => (
        <li class="mr-3" key={route.path}>
          <Link
            class={HEADER_BUTTON_CLASS}
            activeClassName="text-slate-900 underline bg-gray-100 border border-gray-800 rounded"
            href={route.path}
          >
            {route.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
