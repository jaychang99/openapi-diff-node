import { ApiHttpMethod, ParameterInType } from './spec.type';

export interface PathFlattenedItem {
  method: ApiHttpMethod;
  path: string;
  summary: string;
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
  required: boolean | string;
  type: string;
  enum: string[];
  example: string;
}
