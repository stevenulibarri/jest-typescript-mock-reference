import { ClassUnderTest } from '../src/ClassUnderTest';
import { ApiClient } from '../src/ApiClient';

jest.mock('../src/ApiClient');

type Constructor<T = object> = new (...args: any[]) => T;

function instantiateClassMock<T>(Clazz: Constructor<T>): jest.Mocked<T> {
  return new Clazz() as jest.Mocked<T>;
}

const mockedApiClient = instantiateClassMock(ApiClient);

beforeEach(() => {
  jest.resetAllMocks();
});

test('gets data', async () => {
  const instance = new ClassUnderTest(mockedApiClient);
  mockedApiClient.getDataFromApi.mockResolvedValue({ id: 1, data: 'mocked data' });

  const result = await instance.getSomeData(1);
  expect(result).toBe('mocked data');
});






