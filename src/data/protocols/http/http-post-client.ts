import { HttpResponse } from ".";

// Interface Segregation Principle - Separar as interfaces em pequenas partes
export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>;
}
