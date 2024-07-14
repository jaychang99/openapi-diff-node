import { TEXT_DEFAULT_NOT_AVAILABLE } from '../constants/text.defaults';
import { PathFlattenedItem } from '../types/path.flattened.type';
import { ApiHttpMethodValue, ParameterInType } from '../types/spec.type';

export function flattenQueryParams(
  endpointItem: ApiHttpMethodValue
): PathFlattenedItem['flattenedQueryParams'] {
  const flattenedQueryParams: PathFlattenedItem['flattenedQueryParams'] = [];

  endpointItem.parameters?.forEach((param) => {
    if ('$ref' in param) return;
    if (param.schema && '$ref' in param.schema) return;

    flattenedQueryParams.push({
      name: param.name,
      in: param.in as ParameterInType, // TODO: figure out a way to remove type assertion
      description: param.description ?? '',
      required: !!param.required,
      type: param.schema?.type ?? TEXT_DEFAULT_NOT_AVAILABLE,
      enum: param.schema?.enum ?? [],
    });
  });

  return flattenedQueryParams;
}
