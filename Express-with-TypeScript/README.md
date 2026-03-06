Express with TypeScript environment steps:

1. Initialize node project with `npm init -y`
2. Install `express`
3. Install `typescript` and `@types/express` as dev dependencies
4. Create and setup a tsconfig.json
   a. Install and extend `@tsconfig/node{your_node_version_here}`
   b. Add compiler options: rootDir as `src` and outDir as `dist`

Setup TypeScript compilation and Server running:

1. Create a new `start` script in package.json
2. Assign it with this command: "npx tsc && node dist/index.js
