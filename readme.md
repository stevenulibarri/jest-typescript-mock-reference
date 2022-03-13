# jest-typescript-mock-reference
Some reference examples of typed jest mocks without additional mocking frameworks.  

### Run
`npm install`  
`npm run test`  
### TLDR
I was really annoyed that I couldn't instantiate class mocks without ts forcing me to pass in their constructor args.
This is my solution.
```typescript
import { FancyDbConnector, IDbConnector } from '../src/DbConnector';

function instantiateClassMock<T>(clazz: unknown): jest.Mocked<T> {
  return new (<new () => T> clazz)() as jest.Mocked<T>;
}

const mockDbConnector = instantiateClassMock<IDbConnector>(FancyDbConnector);
```
It hides the necessary cast to unknown and news it up for you, no args necessary.

For everything else (functions, modules that don't export classes) the recent ish jest.mocked function is pretty good.  
```typescript
// fetch exports everything under the default
import * as fetch from 'node-fetch';
jest.mock('node-fetch');

const mockFetch = jest.mocked<typeof fetch.default>(fetch.default);

// uuid does not export a default
jest.mock('uuid');
import { v4 as uuidv4 } from 'uuid';

const mockUuid = jest.mocked<typeof uuidv4>(uuidv4);
```
documentation here: https://jestjs.io/docs/jest-object#jestmockedtitem-t-deep--false

