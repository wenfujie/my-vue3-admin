import type { LoginParams, LoginRes } from './model/userModel';
import { request } from '@/utils/request';

export function login(data: LoginParams) {
  return request<LoginRes>({
    url: 'login',
    method: 'post',
    data,
  });
}
