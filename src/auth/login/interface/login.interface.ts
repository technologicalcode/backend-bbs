export interface LoginPayload {
  id_user: number;
  username: string;
  id_bb: number;
}

export interface LoginResponseData {
  access_token: string;
  user: LoginPayload;
}
