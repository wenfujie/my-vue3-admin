import { request } from '@/utils/request';
import { LoginParams } from './model/userModel';

export function login(data: LoginParams) {
  return request<LoginParams>(
    {
      url: 'login',
      method: 'post',
      data,
    }
  );
}