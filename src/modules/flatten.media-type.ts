import {
  TEXT_DEFAULT_ARRAY_REPRESENTATION,
  TEXT_DEFAULT_NOT_AVAILABLE,
} from '../constants/text.defaults';
import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiReferenceObject, ApiSchemaObject } from '../types/spec.type';

type FlattenedObjectSchemaReturnType =
  | PathFlattenedItem['flattenedRequestBody']
  | PathFlattenedItem['flattenedResponseBody'];

type Property = FlattenedObjectSchemaReturnType[number];

let flattenedMediaType: FlattenedObjectSchemaReturnType = [];

export function flattenMediaType(
  schema: ApiSchemaObject | ApiReferenceObject
): FlattenedObjectSchemaReturnType {
  flattenedMediaType = [];

  recursivelyFlattenMediaType(schema, '');

  return flattenedMediaType;
}

function recursivelyFlattenMediaType(
  schema: ApiSchemaObject | ApiReferenceObject,
  propertyPrefix = ''
) {
  if (!schema) return flattenedMediaType;
  if ('$ref' in schema) return flattenedMediaType; // we first resolve all references, effectively removing this case

  if ('items' in schema) {
    // ArraySchemaObject

    const { items } = schema;

    if ('$ref' in items) return flattenedMediaType; // we first resolve all references, effectively removing this case

    recursivelyFlattenMediaType(
      items,
      `${propertyPrefix}${TEXT_DEFAULT_ARRAY_REPRESENTATION}`
    );
  } else {
    // NonArraySchemaObject

    const { properties } = schema;
    if (!properties) return flattenedMediaType;

    if ('$ref' in properties) return flattenedMediaType; // we first resolve all references, effectively removing this case

    Object.entries(properties).forEach(([propertyName, propertyItem]) => {
      if ('$ref' in propertyItem) return; // we first resolve all references, effectively removing this case

      const { description, required, type } = propertyItem;

      const isRoot = !propertyPrefix;
      const addOnBefore = isRoot ? '' : `${propertyPrefix}.`;
      const name = propertyName
        ? `${addOnBefore}${propertyName}`
        : TEXT_DEFAULT_NOT_AVAILABLE;

      const example =
        typeof propertyItem?.example === 'object'
          ? JSON.stringify(propertyItem?.example)
          : propertyItem?.example ?? TEXT_DEFAULT_NOT_AVAILABLE;

      const property: Property = {
        name: name,
        description: description ?? TEXT_DEFAULT_NOT_AVAILABLE,
        required: required
          ? required?.includes(propertyName ?? '')
          : TEXT_DEFAULT_NOT_AVAILABLE,
        type: type ?? TEXT_DEFAULT_NOT_AVAILABLE,
        enum: propertyItem.enum ?? [],
        example,
      };

      flattenedMediaType.push(property);

      recursivelyFlattenMediaType(propertyItem, name);
    });
  }
}
