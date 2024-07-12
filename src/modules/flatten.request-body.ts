import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';

export function flattenRequestBody(
  pathItem: SpecType['paths'][string]
): PathFlattenedItem['flattenedRequestBody'] {
  return [];
}
