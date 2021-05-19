import { ApiAdapter } from '../src/ApiAdapter';
import * as fetch from 'node-fetch';

jest.mock('node-fetch');

const mockFetch = fetch.default as jest.MockedFunction<typeof fetch.default>;

describe('mock node-fetch example', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('200', async () => {
    const adapter = new ApiAdapter();

    mockFetch.mockResolvedValue(<fetch.Response> {
      ok: true,
      json: () => Promise.resolve({ data: 'good request'}),
    });

    const result = await adapter.callEndpoint('https://someEndpoint.com/');

    expect(result).toBeDefined();
    expect(result.data).toBe('good request');
  });

  test('500', async () => {
    const adapter = new ApiAdapter();

    mockFetch.mockResolvedValue(<fetch.Response> {
      ok: false,
      json: () => Promise.resolve({ error: 'bad request'}),
    });

    let expectedError: Error | undefined;

    try {
      await adapter.callEndpoint('https://someEndpoint.com/');
    } catch (error) {
      expectedError = error as Error;
    }

    expect(expectedError).toBeDefined();
    expect(expectedError instanceof Error).toBe(true);
    expect(expectedError?.message).toBe('bad request');
  });

});
