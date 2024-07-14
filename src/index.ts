import { flattenOpenapi } from './modules/flatten.openapi';
import { DiffOptions } from './types/diff.options.type';
import { DiffOutputItem } from './types/diff.output.type';
import { SpecType } from './types/spec.type';
import fs from 'fs';
import { resolveReferences } from './utils/resolve.json-ref';
import { diffFlattenedOpenapi } from './modules/diff.flattened-openapi';

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
  // TODO: remove type assertion if possible
  const refResolvedOldSpec = resolveReferences(oldSpec, oldSpec) as SpecType;
  const refResolvedNewSpec = resolveReferences(newSpec, newSpec) as SpecType;

  const flattenedOldSpec = flattenOpenapi(refResolvedOldSpec);
  const flattenedNewSpec = flattenOpenapi(refResolvedNewSpec);

  const diff = diffFlattenedOpenapi(flattenedOldSpec, flattenedNewSpec);

  return diff;
}

if (isDevelopment) {
  function loadSpec(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  const oldSpec = loadSpec(`${EXAMPLE_FILE_BASE_URL}/openapi-old.json`);
  const newSpec = loadSpec(`${EXAMPLE_FILE_BASE_URL}/openapi-new.json`);

  const diff = openapiDiff(oldSpec, newSpec);
  diff.forEach((item) => {
    const apiToConsoleLog = {
      method: 'get',
      path: '/sdk/campaigns/{id}',
    };
    // if specific endpoint is needed
    // if (
    //   apiToConsoleLog.method !== item.method ||
    //   apiToConsoleLog.path !== item.path
    // ) {
    //   return;
    // }

    console.log('|-----------------------|');
    console.log('|                       |');
    console.log('|         🔅API🔅       |');
    console.log('|                       |');
    console.log('|-----------------------|');
    console.log(`${item.status}: ${item.method.toUpperCase()} : ${item.path}`);

    console.table([item]);
    console.log('--- Query Params ---');
    console.table(item.queryParams);
    console.log('--- Request Body ---');
    console.table(item.requestBody);
    console.log('--- Response Body ---');
    console.table(item.responseBody);
  });
}

export type { DiffOutputItem, SpecType as OpenapiSpecType };
