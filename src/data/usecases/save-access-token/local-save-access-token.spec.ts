import faker from "faker";
import { SetStorageMock } from "../../test/mock-storage";
import { LocalSaveAccessToken } from "./local-save-access-token";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageSpy);

  return {
    sut,
    setStorageSpy,
  };
};

describe("LocalSaveAccessToken", () => {
  test("Should call setStorage with correct value", async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.random.alphaNumeric();

    await sut.save(accessToken);

    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });

  
});
