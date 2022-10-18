import faker from "faker";
import { UnexpectedError } from "../../../domain/errors";
import { SetStorageMock } from "../../test/";
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

  test("Should throw if setStorage throws", async () => {
    const { sut, setStorageSpy } = makeSut();
    jest.spyOn(setStorageSpy, "set").mockRejectedValueOnce(new Error());
    const accessToken = faker.random.alphaNumeric();

    const promise = sut.save(accessToken);

    await expect(promise).rejects.toThrow(new Error());
  });

  test("Should throw if accessToken is falsy", async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
