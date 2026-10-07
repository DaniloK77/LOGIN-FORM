// A tiny in-browser stand-in for a real auth API.
// It only exists so the UI can show realistic loading and error states —
// nothing is stored and no request ever leaves the browser.

const TAKEN_USERNAMES = ["admin", "root", "test"];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockSignUp({ username, email }) {
  await wait(1200);

  if (TAKEN_USERNAMES.includes(username.toLowerCase())) {
    throw new Error(`The username "${username}" is already taken. Try another one.`);
  }

  return { username, email };
}

export async function mockSignIn({ email }) {
  await wait(1000);

  return { username: email.split("@")[0], email };
}
