import { DEFAULT_MEDIA_TYPE } from '../constants/media.defaults';
import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiHttpMethodValue, SpecType } from '../types/spec.type';
import { isHttpMethod } from '../utils/is.http-method';
import { flattenMediaType } from './flatten.media-type';
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

      const { requestBody, responses } = assertedMethodItem;

      // QUERY PARAMS
      const flattenedQueryParams = flattenQueryParams(assertedMethodItem);

      // REQUEST BODY
      const defaultRequestBody = requestBody
        ? '$ref' in requestBody
          ? {}
          : requestBody?.content?.[DEFAULT_MEDIA_TYPE]
        : undefined;
      const flattenedRequestBody = defaultRequestBody
        ? flattenMediaType(defaultRequestBody)
        : [];

      // RESPONSES
      const defaultResponse = responses['200'] ?? responses['201'];
      const defaultResponseObject =
        '$ref' in defaultResponse
          ? {}
          : defaultResponse?.content?.[DEFAULT_MEDIA_TYPE];
      const flattenedResponseBody = defaultResponseObject
        ? flattenMediaType(defaultResponseObject)
        : [];

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
