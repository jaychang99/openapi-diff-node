import { OpenAPIV3 } from 'openapi-types';

export type SpecType = OpenAPIV3.Document;

export type ApiHttpMethod = OpenAPIV3.HttpMethods;

export type ApiHttpMethodValue = OpenAPIV3.OperationObject;

export type ParameterInType = 'query' | 'path';

export type ApiMediaTypeObject = OpenAPIV3.MediaTypeObject;

export type ApiSchemaObject = OpenAPIV3.SchemaObject;

export type ApiReferenceObject = OpenAPIV3.ReferenceObject;
