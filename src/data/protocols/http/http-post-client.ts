// Interface Segregation Principle - Separar as interfaces em pequenas partes
export type HttpPostParams = {
  url: string;
};

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}
