## Setup Guide & Prerequisists
## Commands
Here are some of the useful commands setup to improve local devex
- `npm run dev:setup`: Will reset an existing database state, run the migrations from scratch, apply seed files and trigger a stripe login
  > This requires stripe cli to be installed (see below)

- `npm run start:dev`: Will startup the api (4000), delegate web (3000) and provider dashboard (3001) - all of the apps in this monorepo

### Stripe CLI
This should be bundled as a docker dependency. However, for speed, you need to install the stripe CLI following these steps:
1. `brew install stripe/stripe-cli/stripe`
2. `stripe login` - there is a 90 day session time so you will need to run this every 90 days

## General Structure/Practices
### File naming conventions
- All file names should be `snake-case` 
- File names should be postfixed with their responsibility where possible (e.g. user.controller, user.repository, auth.guard etc)

### File responsibilities
- `*.module.ts`: Bundles all parts of a related subject/area. This defines the public interface for a concern
- `*.controller.ts`: Handles the routing of requests 
- `*.service.ts`: Handles all business logic for the given subject/area
- `*.response.ts`: Shapes the response object, enforces what data is sent over the wire
- `*.request.ts`: Handles any incoming data and ensures it is ok to process
- `*.repository.ts`: Handles ***ALL*** data layer interaction (no where else should ***EVER*** access the data layer)
- `*.guard.ts`: Determins if a request is safe to be passed to the route handler (controller)
- `*.exception.ts`: Any custom exception that can be raised (internal or public facing)

### Imports
Where possible, we should use absolute imports (even if this is not the shortest possible route). This will create consistency and make readability easier across the entire codebase. 

For Example: 
`import UserController from '../../user.controller.ts'` 
should be 
`import UserController from '@/user/user.controller.ts'`

This is still true when importing from the same module so:
`import UserController from './user.controller.ts'` 
should be 
`import UserController from '@/user/user.controller.ts'`

### Testing
We should only write full integration tests. These are heavy, slow and expensive BUT they give us the most coverage for the least amount of time and effort. All tests live in the `/test` folder for now. If we introduce unit tests, these will likely live alongside the unit they are testing. 

#### Running Tests
To run integration tests, you should first setup the test framework which includes a database. The testing database runs in the same docker container as the local dev database. Once the docker container is running (run `npm run db:up` in the root of the project) you can run the test setup script. Inside `apps/server`, run `npm run test:setup`. You should also run this everytime there are schema changes. You will not need to run this setup script everytime code changes are made.

Once the test framework is setup, you can run `npm run test:e2e` to run all e2e tests