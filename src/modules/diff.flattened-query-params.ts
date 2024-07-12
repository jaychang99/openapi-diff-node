import { DiffOutputItem } from '../types/diff.output.type';
import { PathFlattenedItem } from '../types/path.flattened.type';

type FlattenedQueryParam = PathFlattenedItem['flattenedQueryParams'][number];

export function diffFlattenedQueryParams(
  flattenedOldQueryParams: FlattenedQueryParam[],
  flattenedNewQueryParams: FlattenedQueryParam[]
): DiffOutputItem['queryParams'] {
  const flattenedQueryParams: DiffOutputItem['queryParams'] = [];

  // check for added and modified query params
  flattenedNewQueryParams.forEach((newParam) => {
    const oldParam = flattenedOldQueryParams.find(
      (param) => param.name === newParam.name
    );

    // if added
    if (!oldParam) {
      flattenedQueryParams.push({
        ...newParam,
        status: 'ADDED',
        modifiedFields: [],
      });

      return;
    }

    // if oldParam and newParam are the same then skip
    if (JSON.stringify(oldParam) === JSON.stringify(newParam)) return;

    // if modified
    const modifiedFields = Object.keys(newParam).filter(
      (key) =>
        newParam[key as keyof FlattenedQueryParam] !==
        oldParam[key as keyof FlattenedQueryParam]
    );

    if (modifiedFields.length) {
      flattenedQueryParams.push({
        ...newParam,
        status: 'MODIFIED',
        modifiedFields,
      });
    }
  });
  return flattenedQueryParams;
}
