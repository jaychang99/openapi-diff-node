import { ApiHttpMethod, ParameterInType } from './spec.type';

export interface PathFlattenedItem {
  method: ApiHttpMethod;
  path: string;
  description: string;
  flattenedQueryParams: FlattenedQueryParam[];
  flattenedRequestBody: FlattenedRequestBody[];
  flattenedResponseBody: FlattenedResponseBody[];
}

interface FlattenedQueryParam extends FlattenedCommonEndpointInfo {
  in: ParameterInType;
}
interface FlattenedRequestBody extends FlattenedObjectSchemaBase {}
interface FlattenedResponseBody extends FlattenedObjectSchemaBase {}

interface FlattenedObjectSchemaBase extends FlattenedCommonEndpointInfo {}

export interface FlattenedCommonEndpointInfo {
  name: string;
  description: string;
  required: boolean;
  type: string;
}
