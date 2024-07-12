import { flattenOpenapi } from './modules/flatten.openapi';
import { DiffOptions } from './types/diff.options.type';
import { DiffOutputItem } from './types/diff.output.type';
import { SpecType } from './types/spec.type';

export function add(a: number, b: number): number {
  return a + b;
}

export function openapiDiff(
  oldSpec: SpecType,
  newSpec: SpecType,
  options?: DiffOptions
): DiffOutputItem[] {
  const flattenedOldSpec = flattenOpenapi(oldSpec);
  const flattenedNewSpec = flattenOpenapi(newSpec);

  return [];
}
