import { RemoteAuthentication } from "../../../data/usecases/authentication/remote-authentication";
import { makeApiUrl } from "../../http/api-url-factory";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";

export const makeRemoteAuthentication = () => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};
