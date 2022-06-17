import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "../../../data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error: any) {
      httpResponse = error.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
