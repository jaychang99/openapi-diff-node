import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiHttpMethodValue, SpecType } from '../types/spec.type';
import { isHttpMethod } from '../utils/is.http-method';
import { flattenObjectSchema } from './flatten.object-schema';
import { flattenQueryParams } from './flatten.query-params';

export function flattenOpenapi(spec: SpecType): PathFlattenedItem[] {
  const flattenedOpenapi: PathFlattenedItem[] = [];

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    if (!pathItem) return;

    Object.entries(pathItem).forEach(([method, methodItem]) => {
      if (!isHttpMethod(method)) return;

      // if key is a valid HTTP method methodItem is guaranteed to be an OperationObject
      // TODO: come up with a better way to tackle this problem
      const assertedMethodItem = methodItem as ApiHttpMethodValue;

      const flattenedQueryParams = flattenQueryParams(assertedMethodItem);
      const flattenedRequestBody = flattenObjectSchema(assertedMethodItem);
      const flattenedResponseBody = flattenObjectSchema(assertedMethodItem);

      const pathFlattenedItem: PathFlattenedItem = {
        method,
        path,
        description: assertedMethodItem.description ?? '',
        flattenedQueryParams,
        flattenedRequestBody,
        flattenedResponseBody,
      };

      flattenedOpenapi.push(pathFlattenedItem);
    });
  });

  return flattenedOpenapi;
}
