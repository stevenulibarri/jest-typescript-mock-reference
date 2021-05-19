import { IDbConnector } from './DbConnector';

export interface IDataRepository {
  getDataById(id: number): Promise<string[]>
}

export class DataRepository implements IDataRepository {
  constructor(private dbConnector: IDbConnector) {}

  async getDataById(id: number): Promise<string[]> {
    const result: string[] = await this.dbConnector.query(`SELECT ${id} FROM THE DB LOL`);
    return result;
  }
}
