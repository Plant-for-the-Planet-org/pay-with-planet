// This function removes all the null,  empty objects, "" (empty string values), undefined values from the object

const cleanObject = (
  object: Record<string, unknown>
): Record<string, unknown> => {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      cleanObject(value as Record<string, unknown>);
    }
    if (
      (value && typeof value === "object" && !Object.keys(value).length) ||
      value === null ||
      value === undefined ||
      value === ""
    ) {
      if (Array.isArray(object)) {
        object.splice(Number(key), 1);
      } else {
        delete object[key as keyof typeof object];
      }
    }
  });
  return object;
};

export default cleanObject;
