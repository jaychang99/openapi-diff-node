import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';

export function flattenResponseBody(
  pathItem: SpecType['paths'][string]
): PathFlattenedItem['flattenedResponseBody'] {
  return [];
}
