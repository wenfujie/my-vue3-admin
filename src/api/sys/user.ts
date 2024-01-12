import type { LoginParams, LoginResModel } from './model/userModel';
import { request } from '@/utils/request';

export const accountLogin = ({ username: user_id, password }: LoginParams) =>
  request<LoginResModel>({
    url: '/admin/login/Account',
    data: {
      user_id,
      password,
    },
  });
