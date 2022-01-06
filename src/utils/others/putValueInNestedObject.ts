
export const putValueInNestedObject = function (
  obj: Record<string, unknown>,
  keyList: (string | number)[],
  value: unknown,
) {
  // Cache the path length and current spot in the object
  const length: number = keyList.length;
  let current: Record<string, unknown> = obj;

  // Loop through the path
  keyList.forEach((key: string | number, index: number) => {
    // If this is the last item in the loop, assign the value
    if (index === length - 1) {
      current[key] = value;
    } // if

    // Otherwise, update the current place in the object
    else {
      // If the key doesn't exist, create it
      if (!current[key]) {
        current[key] = {};
      }
      // Update the current place in the object
      current = current[key] as Record<string, unknown>;
    } // else
  });
};
