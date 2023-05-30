# jest-typescript-mock-reference
Some reference examples of typed jest mocks without additional mocking frameworks.  

### Run
`npm install`  
`npm run test`  
### TLDR
I was really annoyed that I couldn't instantiate class mocks without ts forcing me to pass in their constructor args.
This is my solution.
```typescript
type Constructor<T = object> = new (...args: any[]) => T;

function instantiateClassMock<T>(Clazz: Constructor<T>): jest.Mocked<T> {
  return new Clazz() as jest.Mocked<T>;
}
```

See `test/ClassMock.test.ts` for more detail.

