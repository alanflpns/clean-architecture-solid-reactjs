import { HttpResponse } from "./http-response";

// Interface Segregation Principle - Separar as interfaces em pequenas partes
export type HttpPostParams = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
