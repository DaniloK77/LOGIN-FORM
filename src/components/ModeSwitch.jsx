const OPTIONS = [
  { value: "login", label: "Sign in" },
  { value: "signup", label: "Create account" },
];

export default function ModeSwitch({ mode, onChange, disabled }) {
  return (
    <div role="group" aria-label="Choose a form" className="relative grid grid-cols-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
      {/* Sliding background pill */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm ring-1 ring-zinc-900/5 transition-transform duration-300 ease-out dark:bg-zinc-800 dark:ring-white/10 ${
          mode === "signup" ? "translate-x-full" : ""
        }`}
      />

      {OPTIONS.map((option) => {
        const isActive = mode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={`relative h-9 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed ${
              isActive
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
