import { PASSWORD_RULES, getPasswordStrength } from "../utils/validation";
import { CheckIcon } from "./Icons";

const LEVELS = [
  { label: "Too weak", bar: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  { label: "Weak", bar: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  { label: "Fair", bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  { label: "Good", bar: "bg-lime-500", text: "text-lime-700 dark:text-lime-400" },
  { label: "Strong", bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
];

export default function PasswordStrength({ password }) {
  const { score, passed } = getPasswordStrength(password);
  const level = LEVELS[score];

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                score >= step ? level.bar : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>
        <p className={`min-w-16 text-right text-xs font-semibold ${level.text}`} aria-live="polite">
          <span className="sr-only">Password strength: </span>
          {level.label}
        </p>
      </div>

      <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
        {PASSWORD_RULES.map((rule) => {
          const isMet = passed.includes(rule.id);

          return (
            <li
              key={rule.id}
              className={`flex items-center gap-2 text-xs transition-colors ${
                isMet ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-full transition-colors ${
                  isMet ? "bg-emerald-500 text-white" : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              >
                {isMet && <CheckIcon className="size-2.5" strokeWidth={3.5} />}
              </span>
              {rule.label}
              <span className="sr-only">{isMet ? "(met)" : "(not met)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
