import { DiffOutputItem } from '../types/diff.output.type';
import { PathFlattenedItem } from '../types/path.flattened.type';
import { diffFlattenedMediaType } from './diff.flattened-media-type';
import { diffFlattenedQueryParams } from './diff.flattened-query-params';

function findApiItemInSpec(
  item: PathFlattenedItem,
  spec: PathFlattenedItem[]
): PathFlattenedItem | undefined {
  return spec.find(
    (specItem) => specItem.method === item.method && specItem.path === item.path
  );
}
export function diffFlattenedOpenapi(
  flattenedOldSpec: PathFlattenedItem[],
  flattenedNewSpec: PathFlattenedItem[]
): DiffOutputItem[] {
  const diffOutput: DiffOutputItem[] = [];

  // check for added and modified endpoints
  flattenedNewSpec.forEach((newItem) => {
    const oldItem = findApiItemInSpec(newItem, flattenedOldSpec);

    // if added
    if (!oldItem) {
      diffOutput.push({
        path: newItem.path,
        method: newItem.method,
        queryParams: [
          ...newItem.flattenedQueryParams.map(
            (param): DiffOutputItem['queryParams'][number] => ({
              ...param,
              status: 'ADDED',
              modifiedFields: [],
            })
          ),
        ],
        requestBody: [
          ...newItem.flattenedRequestBody.map(
            (param): DiffOutputItem['requestBody'][number] => ({
              ...param,
              status: 'ADDED',
              modifiedFields: [],
            })
          ),
        ],
        responseBody: [
          ...newItem.flattenedResponseBody.map(
            (param): DiffOutputItem['responseBody'][number] => ({
              ...param,
              status: 'ADDED',
              modifiedFields: [],
            })
          ),
        ],
        status: 'ADDED',
      });

      return;
    }
    // if oldItem and newItem are the same then skip
    if (JSON.stringify(oldItem) === JSON.stringify(newItem)) return;

    // check if modified
    diffOutput.push({
      path: newItem.path,
      method: newItem.method,
      queryParams: diffFlattenedQueryParams(
        oldItem.flattenedQueryParams,
        newItem.flattenedQueryParams
      ),
      requestBody: diffFlattenedMediaType(
        oldItem.flattenedRequestBody,
        newItem.flattenedRequestBody
      ),
      responseBody: diffFlattenedMediaType(
        oldItem.flattenedResponseBody,
        newItem.flattenedResponseBody
      ),
      status: 'MODIFIED',
    });
  });

  // check for removed endpoints
  flattenedOldSpec.forEach((oldItem) => {
    const newItem = findApiItemInSpec(oldItem, flattenedNewSpec);

    if (!newItem) {
      diffOutput.push({
        path: oldItem.path,
        method: oldItem.method,
        queryParams: [
          ...oldItem.flattenedQueryParams.map(
            (param): DiffOutputItem['queryParams'][number] => ({
              ...param,
              status: 'REMOVED',
              modifiedFields: [],
            })
          ),
        ],
        requestBody: [
          ...oldItem.flattenedRequestBody.map(
            (param): DiffOutputItem['requestBody'][number] => ({
              ...param,
              status: 'REMOVED',
              modifiedFields: [],
            })
          ),
        ],
        responseBody: [
          ...oldItem.flattenedResponseBody.map(
            (param): DiffOutputItem['responseBody'][number] => ({
              ...param,
              status: 'REMOVED',
              modifiedFields: [],
            })
          ),
        ],
        status: 'REMOVED',
      });
    }
    return;
  });

  return diffOutput;
}
