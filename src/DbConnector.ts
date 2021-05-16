export interface IDbConnector {
  query(query: string): Promise<string[]>
}

export class DbConnector {
  // unused constructor arg to show that the mocking can be made to ignore the args.
  constructor(private connectionString: string) {}

  async query(query: string): Promise<string[]> {
    return ['some', 'data'];
  }
}