export interface NotifyErrorType {
  body: object;
  method: string;
  params: object;
  query: object;
  status: number;
  originalUrl: string;
}

export interface NotifyErrorStackType {
  stack: string;
}
