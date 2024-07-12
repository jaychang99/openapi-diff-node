import { flattenOpenapi } from './modules/flatten.openapi';
import { DiffOptions } from './types/diff.options.type';
import { DiffOutputItem } from './types/diff.output.type';
import { SpecType } from './types/spec.type';
import fs from 'fs';

export function add(a: number, b: number): number {
  return a + b;
}

const EXAMPLE_FILE_BASE_URL = 'src/__local__/examples';

const isDevelopment = process.env.NODE_ENV === 'development';

export function openapiDiff(
  oldSpec: SpecType,
  newSpec: SpecType,
  options?: DiffOptions
): DiffOutputItem[] {
  const flattenedOldSpec = flattenOpenapi(oldSpec);
  const flattenedNewSpec = flattenOpenapi(newSpec);
  return [];
}

if (isDevelopment) {
  function loadSpec(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  const oldSpec = loadSpec(`${EXAMPLE_FILE_BASE_URL}/openapi-old.json`);
  const newSpec = loadSpec(`${EXAMPLE_FILE_BASE_URL}/openapi-new.json`);

  const diff = openapiDiff(oldSpec, newSpec);
  console.table(diff);
}
