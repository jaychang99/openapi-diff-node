import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiMediaTypeObject } from '../types/spec.type';

type FlattenedObjectSchemaReturnType =
  | PathFlattenedItem['flattenedRequestBody']
  | PathFlattenedItem['flattenedResponseBody'];

export function flattenMediaType(
  pathItem: ApiMediaTypeObject
): FlattenedObjectSchemaReturnType {
  return [];
}
