import { CheckIcon } from "./Icons";

export default function SuccessView({ user, onSignOut }) {
  return (
    <div className="text-center motion-safe:animate-fade-up">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 ring-8 ring-emerald-50 dark:bg-emerald-500/15 dark:ring-emerald-500/5">
        <CheckIcon className="size-7 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Focus moves here on mount so screen-reader users hear the result. */}
      <h1
        ref={(heading) => heading?.focus()}
        tabIndex={-1}
        className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 outline-none dark:text-white"
      >
        {user.isNewAccount ? "Account created" : "Welcome back"}, {user.username}!
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        You're signed in as <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.email}</span>.
      </p>

      <p className="mt-6 rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        This is a front-end demo — nothing was sent to a server.
      </p>

      <button
        type="button"
        onClick={onSignOut}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-xs transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
      >
        Sign out
      </button>
    </div>
  );
}
