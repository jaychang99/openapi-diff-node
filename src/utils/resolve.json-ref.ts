interface JSONSchema {
  [key: string]: any;
}

export function resolveReferences(
  schema: JSONSchema,
  root: JSONSchema
): JSONSchema {
  if (Array.isArray(schema)) {
    return schema.map((item) => resolveReferences(item, root));
  }

  if (typeof schema === 'object' && schema !== null) {
    if (schema.$ref) {
      const refPath = schema.$ref.split('/').slice(1); // Split and remove the leading '#'
      let refObject: any = root;

      for (const part of refPath) {
        refObject = refObject[part];
        if (!refObject) {
          throw new Error(`Reference not found: ${schema.$ref}`);
        }
      }

      return resolveReferences(refObject, root); // Resolve the reference recursively
    } else {
      const resolvedObject: JSONSchema = {};
      for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
          resolvedObject[key] = resolveReferences(schema[key], root);
        }
      }
      return resolvedObject;
    }
  }

  return schema;
}
