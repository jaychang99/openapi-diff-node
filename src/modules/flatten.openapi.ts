import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';
import { flattenQueryParams } from './flatten.query-params';
import { flattenRequestBody } from './flatten.request-body';
import { flattenResponseBody } from './flatten.response-body';

export function flattenOpenapi(spec: SpecType): PathFlattenedItem[] {
  return Object.entries(spec.paths).map(([path, pathItem]) => {
    const flattenedQueryParams = flattenQueryParams(pathItem);
    const flattenedRequestBody = flattenRequestBody(pathItem);
    const flattenedResponseBody = flattenResponseBody(pathItem);

    return {
      path,
      flattenedQueryParams,
      flattenedRequestBody,
      flattenedResponseBody,
    };
  });
}
