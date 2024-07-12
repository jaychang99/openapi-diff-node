import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';
import { flattenObjectSchema } from './flatten.object-schema';
import { flattenQueryParams } from './flatten.query-params';

export function flattenOpenapi(spec: SpecType): PathFlattenedItem[] {
  return Object.entries(spec.paths).map(([path, pathItem]) => {
    const flattenedQueryParams = flattenQueryParams(pathItem);
    const flattenedRequestBody = flattenObjectSchema(pathItem);
    const flattenedResponseBody = flattenObjectSchema(pathItem);

    return {
      path,
      flattenedQueryParams,
      flattenedRequestBody,
      flattenedResponseBody,
    };
  });
}
