import { DiffOutputItem } from '../types/diff.output.type';
import { PathFlattenedItem } from '../types/path.flattened.type';

type FlattenedMediaType =
  | PathFlattenedItem['flattenedRequestBody'][number]
  | PathFlattenedItem['flattenedResponseBody'][number];

type DiffFlattenedMediaTypeReturnType =
  | DiffOutputItem['requestBody']
  | DiffOutputItem['responseBody'];

export function diffFlattenedMediaType(
  flattenedOldMediaType: FlattenedMediaType[],
  flattenedNewMediaType: FlattenedMediaType[]
): DiffFlattenedMediaTypeReturnType {
  const flattenedMediaType: DiffFlattenedMediaTypeReturnType = [];

  // check for added and modified media types
  flattenedNewMediaType.forEach((newMediaType) => {
    const oldMediaType = flattenedOldMediaType.find(
      (mediaType) => mediaType.name === newMediaType.name
    );

    // if added
    if (!oldMediaType) {
      flattenedMediaType.push({
        ...newMediaType,
        status: 'ADDED',
        modifiedFields: [],
        changeLogs: [],
      });

      return;
    }

    // if oldMediaType and newMediaType are the same then mark as unchanged
    if (JSON.stringify(oldMediaType) === JSON.stringify(newMediaType)) {
      flattenedMediaType.push({
        ...newMediaType,
        status: 'UNCHANGED',
        modifiedFields: [],
        changeLogs: [],
      });
    }

    // if modified
    const modifiedFields = Object.keys(newMediaType).filter(
      (key) =>
        // reference objects (arrays, (non-array) objects, etc) are always different, so stringify and compare
        JSON.stringify(newMediaType[key as keyof FlattenedMediaType]) !==
        JSON.stringify(oldMediaType[key as keyof FlattenedMediaType])
    );

    const changeLogs = modifiedFields.map((field) => {
      return {
        field,
        oldValue: oldMediaType[field as keyof FlattenedMediaType],
        newValue: newMediaType[field as keyof FlattenedMediaType],
      };
    });

    if (modifiedFields.length) {
      flattenedMediaType.push({
        ...newMediaType,
        status: 'MODIFIED',
        modifiedFields,
        changeLogs,
      });
    }
  });

  // check for removed media types
  flattenedOldMediaType.forEach((oldMediaType) => {
    const newMediaType = flattenedNewMediaType.find(
      (mediaType) => mediaType.name === oldMediaType.name
    );

    if (!newMediaType) {
      flattenedMediaType.push({
        ...oldMediaType,
        status: 'REMOVED',
        modifiedFields: [],
        changeLogs: [],
      });
    }
  });

  return flattenedMediaType;
}
