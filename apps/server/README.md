
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
- `*.repository.ts`: Handles ***ALL*** data layer interaction (no where else should ***EVER*** access to the data layer)
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