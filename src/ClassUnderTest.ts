import { ApiClient } from './ApiClient';

export class ClassUnderTest {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public async getSomeData(id: number): Promise<string> {
    const apiDate = await this.#apiClient.getDataFromApi(id);
    return apiDate.data;
  }
}
