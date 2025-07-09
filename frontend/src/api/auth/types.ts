export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  username: string;
};

export type LogoutPayload = {
  refresh: string;
};

export type RefreshPayload = {
  refresh: string;
};
