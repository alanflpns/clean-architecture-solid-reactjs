// Interface Segregation Principle - Separar as interfaces em pequenas partes
export interface HttpPostClient {
  post(url: string): Promise<void>;
}
