import { EventEmitter } from 'events';
export interface IDbConnector {
  query(query: string): Promise<string[]>
}

export class DbConnector implements IDbConnector {
  // unused constructor arg to show that the mocking can be made to ignore the args.
  constructor(private connectionString: string) {}

  async query(query: string): Promise<string[]> {
    return Promise.resolve(['some', 'data']);
  }
}

export class FancyDbConnector extends EventEmitter implements IDbConnector {

  constructor(private connectionString: string) {
    super();
  }

  query(query: string): Promise<string[]> {
    return Promise.resolve(['some', 'fancy', 'data']);
  }

}
