import { ApiAdapter } from '../src/ApiAdapter';
import * as fetch from 'node-fetch';

jest.mock('node-fetch');

const mockFetch = jest.mocked<typeof fetch.default>(fetch.default);

describe('mock node-fetch example', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // res.status >= 200 && res.status < 300
  test('res.ok', async () => {
    const adapter = new ApiAdapter();

    mockFetch.mockResolvedValue(<fetch.Response> {
      ok: true,
      json: () => Promise.resolve({ data: 'good request'}),
    });

    const result = await adapter.callEndpoint('https://someEndpoint.com/');

    expect(result).toBeDefined();
    expect(result.data).toBe('good request');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://someEndpoint.com/');
  });

  // res.status >= 300
  test('!res.ok', async () => {
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

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://someEndpoint.com/');
  });

});
