import { TEXT_DEFAULT_NOT_AVAILABLE } from '../constants/text.defaults';
import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiMediaTypeObject } from '../types/spec.type';

type FlattenedObjectSchemaReturnType =
  | PathFlattenedItem['flattenedRequestBody']
  | PathFlattenedItem['flattenedResponseBody'];

type Property = FlattenedObjectSchemaReturnType[number];

export function flattenMediaType(
  endpointItem: ApiMediaTypeObject
): FlattenedObjectSchemaReturnType {
  const flattenedMediaType: FlattenedObjectSchemaReturnType = [];

  const { schema } = endpointItem;

  if (!schema) return flattenedMediaType;
  if ('$ref' in schema) return flattenedMediaType; // we first resolve all references, effectively removing this case

  if ('items' in schema) {
    // ArraySchemaObject

    const { items } = schema;

    if ('$ref' in items) return flattenedMediaType; // we first resolve all references, effectively removing this case
  } else {
    // NonArraySchemaObject

    const { properties } = schema;

    if (!properties) return flattenedMediaType;
    if ('$ref' in properties) return flattenedMediaType; // we first resolve all references, effectively removing this case

    Object.entries(properties).forEach(([propertyName, propertyItem]) => {
      if ('$ref' in propertyItem) return; // we first resolve all references, effectively removing this case

      const { description, required, type } = propertyItem;

      const property: Property = {
        name: propertyName ?? TEXT_DEFAULT_NOT_AVAILABLE,
        description: description ?? TEXT_DEFAULT_NOT_AVAILABLE,
        required: required?.includes(propertyName ?? '') ?? false,
        type: type ?? TEXT_DEFAULT_NOT_AVAILABLE,
      };

      flattenedMediaType.push(property);
    });
  }

  return flattenedMediaType;
}
