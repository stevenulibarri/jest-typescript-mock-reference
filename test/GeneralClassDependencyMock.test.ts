import { DataRepository, IDataRepository } from '../src/DataRepository';
import { DbConnector } from '../src/DbConnector';

jest.mock('../src/DbConnector');

describe('general class dependency mock example', () => {

  test('mock', async () => {
    // cast to parameter-less constructor so tsc doesn't care about the missing args
    const mockDbConnector = new (<new () => DbConnector>DbConnector)() as jest.Mocked<DbConnector>;
    // you can also cast to <any>, its shorter but depending on your lint config might not be allowed
    // const mockDbConnector = new (<any>DbConnector)() as jest.Mocked<DbConnector>;
    const repo: IDataRepository = new DataRepository(mockDbConnector);

    // autocomplete actually works here! and the return type is enforced!
    mockDbConnector.query.mockResolvedValue(['some', 'mocked', 'data']);

    const result = await repo.getDataById(123);

    expect(result.length).toBe(3);
    expect(result).toEqual(expect.arrayContaining(['some', 'mocked', 'data']));

    // all the spy stuff works as expected
    expect(mockDbConnector.query).toHaveBeenCalledTimes(1);
    expect(mockDbConnector.query).toHaveBeenCalledWith('SELECT 123 FROM THE DB LOL');
    expect(mockDbConnector.query.mock.calls[0][0]).toBe('SELECT 123 FROM THE DB LOL');
  });
});
