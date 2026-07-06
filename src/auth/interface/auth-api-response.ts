/** Formato de respuesta exclusivo de auth (sin interceptor global). */
export interface AuthApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}
