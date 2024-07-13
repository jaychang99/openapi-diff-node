# openapi-diff-node

A tool for diffing two openapi-compatible api schema.

### Goal

- To quickly and easily find out the differences between the two openapi schemas.
- To filter out unnecessary information from overly complicated schema.

### No-Goal

- Display an exhaustive list of all details of every endpoint in openapi schema.

## Usage

---

```tsx
import { openapiDiff } from 'opeanpi-diff-node';

const diff: DiffOutputItem = openapiDiff(oldOpenapiSchema, newOpenapiSchema);

console.log(diff);
```

- see following interfaces for the type of the result

```tsx
export interface DiffOutputItem {
  path: string; // path of the endpoint
  method: ApiHttpMethod; // http method of the endpoint
  queryParams: QueryParam[]; // changes in query string parameters
  requestBody: RequestBody[]; // changes in http request body (application/json)
  responseBody: ResponseBody[]; // changes in http response body (application/json)
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

export interface FlattenedCommonEndpointInfo {
  name: string;
  description: string;
  required: boolean;
  type: string;
}
```

- We assume all request and response bodies are in `application/json` format.
- Error responses are not supported. For response bodies, a response of status code 200 will be used first, then 201. If no responses are of status code 200 or 201, response object will simply be an empty object.
