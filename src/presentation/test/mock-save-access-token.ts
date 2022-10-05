import { SaveAccessToken } from "../../domain/usecases/save-access-token";

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string | undefined;

  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}
