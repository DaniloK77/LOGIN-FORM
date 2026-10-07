# React Fundamentals Lab — Events & State

A hands-on sandbox where I worked through the **[Adding Interactivity](https://react.dev/learn/adding-interactivity)** and **[Managing State](https://react.dev/learn/managing-state)** chapters of the official React docs.

Each exercise is a small, self-contained component that isolates **one concept**. Together they form the foundation for the main project in this repository, the [Auth UI sign-in & sign-up form](../README.md).

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Immer](https://img.shields.io/badge/use--immer-0.11-00E7C3)

## Concept map

| # | Concept | Exercise | File |
|---|---|---|---|
| 1 | **Responding to events** — passing handlers, not calling them | `Dugme` (alert on click) | `src/App.jsx` |
| 2 | **Event handlers as props** — custom prop names like `onSmash`, `onPlayMovie` | `Toolbar`, `Apps`, `Button`, `Button2` | `src/App.jsx` |
| 3 | **Preventing default behaviour** — `e.preventDefault()` on form submit | `Signup` | `src/App.jsx` |
| 4 | **State: a component's memory** — `useState` basics | `Counter`, sculpture gallery (`App`) | `src/App.jsx` |
| 5 | **Conditional rendering from state** — show/hide details | sculpture gallery (`App`) | `src/App.jsx` |
| 6 | **State as a snapshot** — a delayed `alert` still sees the old value | `Form` (send message after 5 s) | `src/App.jsx` |
| 7 | **Batching & updater functions** — `+3` with `setScore(s => s + 1)` | `Counter2` | `src/App.jsx` |
| 8 | **Mixing replacement and updaters** — `setNumber(n + 5)` then `setNumber(n => n + 1)` | `Brojac` | `src/App.jsx` |
| 9 | **Updaters in async code** — correct `pending` / `completed` counters | `Requst` | `src/App.jsx` |
| 10 | **Updating objects immutably** — spread syntax, including nested objects | `Forma`, `Polja`, `Scoreboard` | `src/App.jsx`, `src/image.jsx` |
| 11 | **Writing concise immutable updates with Immer** — `useImmer` drafts | `Form` | `src/image.jsx` |
| 12 | **Updating arrays immutably** — add with spread, remove with `filter` | `Lista`, `Lista2` | `src/image.jsx` |
| 13 | **Reacting to input with state** — `typing → submitting → success / error` | `Formular`, `Prijava` (city quiz) | `src/image.jsx`, `src/App.jsx` |
| 14 | **Replacing a component after submit** — `isSent` state | `Formm` | `src/App.jsx` |
| 15 | **Pointer events** — a dot that follows the cursor | `Krug` | `src/image.jsx` |
| 16 | **State is isolated per instance** — every panel has its own `isActive` | `Accordion` / `Panel` | `src/image.jsx` |
| 17 | **Choosing the state structure** — redundant and duplicated state | `ImePrezime`, `Meni` | `src/fullname.jsx` |
| 18 | **Lifting state up & derived data** — search query filters a list | `FilterableList`, `SearchBar`, `List` | `src/App.jsx`, `src/set.jsx` |

## Key takeaways

**State is a snapshot.** Calling `setCount(count + 1)` three times in one handler only adds 1, because `count` is fixed for that render. Updater functions (`setCount(c => c + 1)`) queue changes based on the latest value.

**Never mutate state.** Objects and arrays must be replaced, not changed in place: spread (`{ ...person, name }`), `map` and `filter` for arrays, or Immer when nesting gets deep.

**Model UI as states, not as toggles.** The city quiz uses one `status` value (`typing`, `submitting`, `success`) instead of several booleans that could contradict each other.

**Don't store what you can calculate.** `fullName` can be derived from `firstName` and `lastName` during render, and a selected item should be stored by `id`, not as a copy of the object.

These lessons are applied directly in the main Auth UI project: a single `values` object, derived validation errors, functional updates and a single `isSubmitting` flag.

## Running the lab

```bash
cd event_handler
npm install
npm run dev
```

## Refactoring backlog

The exercises are kept close to how I first wrote them, so the learning progress stays visible. Planned clean-ups:

- [ ] Remove the leftover `root.render(<Image />)` call at the top of `App.jsx` (rendering belongs in `main.jsx` only)
- [ ] Derive `fullName` instead of storing it (`ImePrezime`) and store `selectedId` instead of a copied object (`Meni`)
- [ ] Pass the event object into the `Scoreboard` input handlers
- [ ] Split the exercises into one file per concept and add a simple navigation between them
