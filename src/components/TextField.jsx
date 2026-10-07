import { useId } from "react";
import { AlertCircleIcon } from "./Icons";

export default function TextField({
  label,
  icon: Icon,
  error,
  hint,
  trailing,
  children,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error || hint;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </label>

      <div
        className={`group flex items-center rounded-lg border bg-white shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:ring-4 dark:bg-zinc-900 ${
          error
            ? "border-red-500 focus-within:ring-red-500/15 dark:border-red-400"
            : "border-zinc-300 focus-within:border-indigo-500 focus-within:ring-indigo-500/15 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
        }`}
      >
        {Icon && (
          <Icon
            className={`ml-3 size-[18px] shrink-0 transition-colors ${
              error ? "text-red-500 dark:text-red-400" : "text-zinc-400 group-focus-within:text-indigo-500"
            }`}
          />
        )}

        <input
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={message ? messageId : undefined}
          className="h-11 w-full min-w-0 bg-transparent px-3 text-base text-zinc-900 outline-none placeholder:text-zinc-400 sm:text-[15px] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          {...inputProps}
        />

        {trailing}
      </div>

      {error ? (
        <p id={messageId} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-600 dark:text-red-400">
          <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}

      {children}
    </div>
  );
}
