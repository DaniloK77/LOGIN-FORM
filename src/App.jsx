import { useState } from "react";
import AuthForm from "./components/AuthForm";
import BrandPanel from "./components/BrandPanel";
import Logo from "./components/Logo";
import SuccessView from "./components/SuccessView";

export default function App() {
  // Lifted state: the form reports a successful sign-in, App decides what to render.
  const [user, setUser] = useState(null);

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <BrandPanel />

      <main className="flex min-h-dvh flex-col px-4 py-8 sm:px-6 lg:px-12">
        <Logo className="text-zinc-900 lg:hidden dark:text-white" />

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            {user ? <SuccessView user={user} onSignOut={() => setUser(null)} /> : <AuthForm onSuccess={setUser} />}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
          Front-end demo · No data ever leaves your browser.
        </p>
      </main>
    </div>
  );
}
