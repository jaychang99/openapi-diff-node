export interface PathFlattenedItem {
  path: string;
  flattenedQueryParams: FlattenedQueryParam[];
  flattenedRequestBody: FlattenedRequestBody[];
  flattenedResponseBody: FlattenedResponseBody[];
}

interface FlattenedQueryParam extends FlattenedCommonEndpointInfo {}
interface FlattenedRequestBody extends FlattenedObjectSchemaBase {}
interface FlattenedResponseBody extends FlattenedObjectSchemaBase {}

interface FlattenedObjectSchemaBase extends FlattenedCommonEndpointInfo {}

interface FlattenedCommonEndpointInfo {
  name: string;
  description: string;
  required: boolean;
}
