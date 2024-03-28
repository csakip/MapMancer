# Mapmancer

Mapmancer is an open source battlemap application to aid online tabletop RPG sessions.

## How to use it

You can use it in two ways:

- Online - Navigate to https://csakip.github.io/Mapmancer
- Installed - Use the installer provided for your operating system in the [latest release](https://github.com/csakip/Mapmancer/releases/latest). The installed app can save files to your local system more easily but otherwise they are identical.

## Contributing

You are welcome to help out if you feel inspired, want a feature added or want something fixed. I suggest check the issues or raise one first to see if it's already in the works or not.

Mapmancer is a JavaScript project. VSCode is recommended, but not required.

The project uses:

- [Vite](https://vitejs.dev/)
- [Preact](https://preactjs.com/)
- [Kaboom.js](https://kaboomjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Supabase](https://supabase.com/)
- [Tauri](https://tauri.app/)

### Setting up

- Get the source from the `develop` brach.
- Run `yarn` to install dependecies.
- `yarn dev` to run it.
- Or `yarn app` to run it inside a native window (using Tauri).

### Building

- `yarn build` creates the web builds into `./dist`.
- `yarn build:app` creates the native app installers into `./src-tauri/target/release/bundle`.

### Developing

- Create a feature or bugfix branch from `develop`.
- Make your changes.
- Create a pull request against `develop`.
- After it is approved, it will get merged into the `main` branch, which will trigger a deployment to the `gh-pages` branch, which is a GitHub page at https://csakip.github.io/Mapmancer
