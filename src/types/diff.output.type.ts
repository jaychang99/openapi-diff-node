import { FlattenedCommonEndpointInfo } from './path.flattened.type';
import { ApiHttpMethod } from './spec.type';

export interface DiffOutputItem {
  path: string;
  method: ApiHttpMethod;
  queryParams: QueryParam[];
  requestBody: RequestBody[];
  responseBody: ResponseBody[];
  status: ApiStatus;
}

interface QueryParam extends CommonEndpointInfo {}
interface RequestBody extends ObjectSchemaBase {}
interface ResponseBody extends ObjectSchemaBase {}

interface ObjectSchemaBase extends CommonEndpointInfo {}

interface CommonEndpointInfo extends FlattenedCommonEndpointInfo, DiffInfo {}

interface DiffInfo {
  status: ApiStatus;
  modifiedFields: string[];
}

type ApiStatus = 'REMOVED' | 'MODIFIED' | 'ADDED' | 'UNCHANGED';
