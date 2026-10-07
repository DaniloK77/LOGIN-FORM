import { useState } from "react";
import TextField from "./TextField";
import { EyeIcon, EyeOffIcon, LockIcon } from "./Icons";

export default function PasswordField({ onKeyDown, onKeyUp, onBlur, children, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const syncCapsLock = (event) => setIsCapsLockOn(event.getModifierState("CapsLock"));

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      icon={LockIcon}
      onKeyDown={(event) => {
        syncCapsLock(event);
        onKeyDown?.(event);
      }}
      onKeyUp={(event) => {
        syncCapsLock(event);
        onKeyUp?.(event);
      }}
      onBlur={(event) => {
        setIsCapsLockOn(false);
        onBlur?.(event);
      }}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label="Show password"
          aria-pressed={isVisible}
          className="mr-1.5 grid size-8 shrink-0 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {isVisible ? <EyeOffIcon className="size-[18px]" /> : <EyeIcon className="size-[18px]" />}
        </button>
      }
    >
      {isCapsLockOn && (
        <p role="status" className="mt-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
          Caps Lock is on
        </p>
      )}
      {children}
    </TextField>
  );
}
