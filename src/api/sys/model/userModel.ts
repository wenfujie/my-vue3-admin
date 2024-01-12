export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResModel {
  user_id: string;
  name: string;
  token: string;
  is_admin: number;
  data_permission: object;
  expiration?: number;
  menu: {
    menus: any[];
  };
}
