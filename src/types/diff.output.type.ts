export interface DiffOutputItem {
  path: string;
  queryParams: QueryParam[];
  requestBody: RequestBody[];
  responseBody: ResponseBody[];
  status: ApiStatus;
}

interface QueryParam extends CommonEndpointInfo {}
interface RequestBody extends ObjectSchemaBase {}
interface ResponseBody extends ObjectSchemaBase {}

interface ObjectSchemaBase extends CommonEndpointInfo {}

interface CommonEndpointInfo {
  name: string;
  description: string;
  required: boolean;
  status: ApiStatus;
}

type ApiStatus = 'REMOVED' | 'MODIFIED' | 'ADDED';
