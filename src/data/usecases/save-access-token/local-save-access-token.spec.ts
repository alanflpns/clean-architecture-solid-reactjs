import faker from "faker";
import { SetStorageSpy } from "../../test/mock-storage";
import { LocalSaveAccessToken } from "./local-save-access-token";

describe("LocalSaveAccessToken", () => {
  test("Should call setStorage with correct value", () => {
    const setStorage = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorage);
    const accessToken = faker.random.alphaNumeric();
    sut.save(accessToken);

    expect(setStorage.key).toBe("accessToken");
    expect(setStorage.value).toBe(accessToken);
  });
});
