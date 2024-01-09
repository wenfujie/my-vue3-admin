import { request } from '@/utils/request';
import type { LoginParams, LoginRes } from './model/userModel';

export function login(data: LoginParams) {
  return request<LoginRes>(
    {
      url: 'login',
      method: 'post',
      data,
    }
  );
}