import { ApiHttpMethod } from '../types/spec.type';

export function isHttpMethod(value: string): value is ApiHttpMethod {
  return [
    'get',
    'post',
    'put',
    'delete',
    'options',
    'head',
    'patch',
    'trace',
  ].includes(value);
}
