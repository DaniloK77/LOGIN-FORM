import Logo from "./Logo";
import { AccessibilityIcon, ShieldCheckIcon, ZapIcon } from "./Icons";

const FEATURES = [
  {
    icon: ZapIcon,
    title: "Instant, friendly validation",
    text: "Feedback appears after you leave a field — never while you're still typing it.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Live password strength meter",
    text: "Scored against four clear rules, with a checklist that updates as you type.",
  },
  {
    icon: AccessibilityIcon,
    title: "Accessible by default",
    text: "Real labels, keyboard support and screen-reader announcements throughout.",
  },
];

export default function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-zinc-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 size-[30rem] rounded-full bg-indigo-600/35 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[-12rem] size-[34rem] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <Logo className="relative" />

      <div className="relative max-w-md">
        <h2 className="text-4xl leading-tight font-semibold tracking-tight text-balance">
          Forms that guide you, not fight you.
        </h2>
        <p className="mt-4 text-pretty text-zinc-300">
          A React practice project about managing form state with <code className="font-mono text-indigo-300">useState</code> —
          built to feel like a production sign-in flow.
        </p>

        <ul className="mt-10 space-y-6">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <feature.icon className="size-5 text-indigo-300" />
              </span>
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="mt-1 text-sm text-zinc-400">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-sm text-zinc-500">Built with React 19, Vite &amp; Tailwind CSS v4.</p>
    </aside>
  );
}
