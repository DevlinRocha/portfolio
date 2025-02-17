# Portfolio

This monorepo contains the **frontend**, **API**, and custom **CMS** solution for my personal portfolio and blog.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/DevlinRocha/portfolio.git

# or

git clone git@github.com:DevlinRocha/portfolio.git
```

2. Change directories and install the modules:

```bash
cd portfolio/

pnpm install
```

## Scripts

The following scripts are available in the monorepo root. Similar scripts may exist for the individual packages and apps (projects) within the monorepo. Running a script from the monorepo root will run the script across all individual projects. Running a script from within an individual project will scope it to that project only.

### `pnpm build`

Typechecks the monorepo root and builds each individual project. You can pass arguments and flags to control the behavior of the build process.

#### Arguments:

- `<projects>` _(optional)_

A space-separated list of project names to build. By default, the script will build all projects in the `packages` and `apps` directories.

Example: `pnpm build projectX projectY`.

#### Flags:

- `--typecheck-projects=<projects>` _(optional)_

A comma-separated list of project paths to typecheck instead of building. By default, all projects will be built.

Example: `--typecheck-projects=packages/projectX,apps/projectY`.

- `--ignore-projects=<projects>` _(optional)_

A comma-separated list of projects to ignore during the build process.

Example: `--ignore-projects=packages/projectX,apps/projectY`.

- `--ignore-errors` _(optional)_

The script will continue running even if errors occur. By default, errors will cause the script to exit.

#### Examples:

- Typecheck monorepo root and `packages/api`, build all other projects:

    ```bash
    pnpm build --typecheck-projects=packages/api
    ```

- Typecheck monorepo root and build `apps/frontend`:

    ```bash
    pnpm build frontend
    ```

- Typecheck monorepo root and `packages/api`:

    ```bash
    pnpm build --typecheck-projects=packages/api --ignore-projects=apps/frontend
    ```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle](https://orm.drizzle.team/)
- [tRPC](https://trpc.io/)
- [Zod](https://zod.dev/)
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)
