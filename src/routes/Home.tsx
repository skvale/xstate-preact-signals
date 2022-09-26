import { h } from "preact";
import { Link } from "preact-router";
import { pages } from "../components/Header";

type HomeProps = {
  path?: string;
};

export const Home = ({}: HomeProps) => {
  return (
    <div class="m-16">
      <p class="mb-4">State management with Signals and Xstate</p>
      <p class="mb-4 text-lg font-bold">Use the state that you need as imports</p>
      <p class="mb-4">
        Send actions into a machine and deal with side effects as part of state
        transitions
      </p>
      <div class="text-xl">Apps:</div>
      <ul class="list-disc">
        {pages.map((page) => (
          <li key={page.path} class="ml-4">
            <Link
              class="hover:underline inline-block text-blue-800 mt-4"
              href={page.path}
            >
              {page.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
