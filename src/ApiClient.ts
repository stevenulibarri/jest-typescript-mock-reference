export type ApiResponse = {
  id: number;
  data: string;
};

export class ApiClient {

  #baseUrl: URL;

  constructor(baseUrl: string) {
    this.#baseUrl = new URL(baseUrl);
  }

  public async getDataFromApi(id: number): Promise<ApiResponse> {
    console.log(`calling for data with id ${id} at ${this.#baseUrl.href}`);
    return await Promise.resolve({
      id,
      data: 'data',
    });
  }
}
