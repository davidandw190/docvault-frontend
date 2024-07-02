/**
 * Interface representing a generic server response structure.
 * 
 * @interface
 * @template T - The type of data contained in the response.
 */
export interface IResponse<T> {
  timestamp: string;
  code: number;
  path: string;
  status: string;
  message: string;
  data: T;
}