import { LockIcon } from "./Icons";

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
        <LockIcon className="size-[18px] text-white" />
      </span>
      <span className="text-base font-semibold tracking-tight">Auth UI</span>
    </div>
  );
}
