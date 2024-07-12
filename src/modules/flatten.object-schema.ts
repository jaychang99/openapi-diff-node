import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';

type FlattenedObjectSchemaReturnType =
  | PathFlattenedItem['flattenedRequestBody']
  | PathFlattenedItem['flattenedResponseBody'];

export function flattenObjectSchema(
  pathItem: SpecType['paths'][string]
): FlattenedObjectSchemaReturnType {
  return [];
}
