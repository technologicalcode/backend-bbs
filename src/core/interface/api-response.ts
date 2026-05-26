export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string | null;
  data: T;
}
