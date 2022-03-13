import { DataRepository, IDataRepository } from '../src/DataRepository';
import { DbConnector, FancyDbConnector, IDbConnector } from '../src/DbConnector';

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

  test('the same except apparently the above method doesn\'t quite work for classes that extend others', async () => {
    // if you uncomment this it will be red (gross)
    // const mockDbConnector = new (<new () => FancyDbConnector>FancyDbConnector)() as jest.Mocked<FancyDbConnector>;

    // must cast to unknown first, its ugly so hide it in this function somewhere
    function instantiateClassMock<T>(clazz: unknown): jest.Mocked<T> {
      return new (<new () => T> clazz)() as jest.Mocked<T>;
    }

    // yay, no //eslintignore lines or warnings about any
    const mockDbConnector = instantiateClassMock<IDbConnector>(FancyDbConnector);

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
