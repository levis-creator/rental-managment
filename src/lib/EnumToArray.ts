export function enumToArray<T extends Record<string, string | number>>(
    enumObj: T
  ): Array<{ id: T[keyof T]; name: string }> {
    // Get all keys and filter out the reverse mapping numeric keys.
    const keys = Object.keys(enumObj).filter(key => isNaN(Number(key))) as (keyof T)[];
    return keys.map(key => ({
      id: enumObj[key],
      name: key.toString(),
    }));
  }