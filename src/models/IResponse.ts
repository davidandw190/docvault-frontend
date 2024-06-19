export interface IResponse<T> {
  timestamp: string;
  code: number;
  path: string;
  status: string;
  message: string;
  data: T;
}