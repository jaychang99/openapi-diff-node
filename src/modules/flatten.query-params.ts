import { PathFlattenedItem } from '../types/path.flattened.type';
import { SpecType } from '../types/spec.type';

export function flattenQueryParams(
  pathItem: SpecType['paths'][string]
): PathFlattenedItem['flattenedQueryParams'] {
  return [];
}
