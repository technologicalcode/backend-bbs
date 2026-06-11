export interface LoginPayload {
  username: string;
  id_usuario: number;
}

export interface LoginResponseData {
  access_token: string;
  user: LoginPayload;
}
