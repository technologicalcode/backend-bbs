export interface LoginPayload {
  id_usuario_credencial: string;
  username: string;
  id_usuario: number;
}

export interface LoginResponseData {
  access_token: string;
  user: LoginPayload;
}
