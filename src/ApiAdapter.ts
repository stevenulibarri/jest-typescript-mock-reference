import fetch from 'node-fetch';

type ApiResponse = {
  data?: string,
  error?: string,
};

export class ApiAdapter {
  async callEndpoint(path: string): Promise<ApiResponse> {
    const res = await fetch(path);
    const body = await res.json() as ApiResponse;

    if (res.ok) {
      return body;
    } else {
      throw new Error(body.error);
    }
  }
}
