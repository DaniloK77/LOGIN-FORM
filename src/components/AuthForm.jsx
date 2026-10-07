import { useState } from "react";
import ModeSwitch from "./ModeSwitch";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import PasswordStrength from "./PasswordStrength";
import { AlertCircleIcon, ArrowRightIcon, MailIcon, SpinnerIcon, UserIcon } from "./Icons";
import { validate } from "../utils/validation";
import { mockSignIn, mockSignUp } from "../utils/mockAuth";

const INITIAL_VALUES = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Visual order of the fields — used to focus the first invalid one on submit.
const FIELD_ORDER = ["username", "email", "password", "confirmPassword"];

const COPY = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to continue where you left off.",
    submit: "Sign in",
    submitting: "Signing in…",
  },
  signup: {
    title: "Create your account",
    subtitle: "It only takes a minute — no credit card required.",
    submit: "Create account",
    submitting: "Creating account…",
  },
};

export default function AuthForm({ onSuccess }) {
  const [mode, setMode] = useState("signup");
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Derived on every render — no need to keep errors in sync with values.
  const errors = validate(values, mode);
  const isSignup = mode === "signup";
  const copy = COPY[mode];

  // "Reward early, punish late": only show an error once the user has left a
  // non-empty field, or after they tried to submit the form.
  const visibleError = (name) => {
    const hasInteracted = hasSubmitted || (touched[name] && values[name] !== "");
    return hasInteracted ? errors[name] : undefined;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Reset interaction state in the event handler instead of a useEffect.
  // Typed values are kept, so switching modes never loses the user's email.
  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setTouched({});
    setHasSubmitted(false);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    const firstInvalidField = FIELD_ORDER.find((name) => errors[name]);
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    const payload = {
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password,
    };

    setIsSubmitting(true);
    try {
      const user = isSignup ? await mockSignUp(payload) : await mockSignIn(payload);
      onSuccess({ ...user, isNewAccount: isSignup });
    } catch (error) {
      setFormError(error.message);
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: visibleError(name),
  });

  return (
    <div className="motion-safe:animate-fade-up">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{copy.title}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{copy.subtitle}</p>
      </header>

      <ModeSwitch mode={mode} onChange={switchMode} disabled={isSubmitting} />

      <form noValidate onSubmit={handleSubmit} aria-busy={isSubmitting} className="mt-6">
        <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
          <legend className="sr-only">{copy.title}</legend>

          {formError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
              {formError}
            </div>
          )}

          {isSignup && (
            <TextField
              {...fieldProps("username")}
              label="Username"
              icon={UserIcon}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="jane_doe"
              hint="3–16 characters: letters, numbers or underscores."
              className="motion-safe:animate-fade-up"
            />
          )}

          <TextField
            {...fieldProps("email")}
            label="Email address"
            type="email"
            icon={MailIcon}
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@example.com"
          />

          <PasswordField
            {...fieldProps("password")}
            label="Password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            placeholder={isSignup ? "Create a strong password" : "Enter your password"}
          >
            {isSignup && values.password && <PasswordStrength password={values.password} />}
          </PasswordField>

          {isSignup && (
            <PasswordField
              {...fieldProps("confirmPassword")}
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              className="motion-safe:animate-fade-up"
            />
          )}

          <button
            type="submit"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-600/70"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="size-4" />
                {copy.submitting}
              </>
            ) : (
              <>
                {copy.submit}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
