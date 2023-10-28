
export class TestHelpers {
  public convertResponseKeysToFlatArray(response: object): string[] {
    const keys = new Set<string>();

    const getKeys = (obj: object, parent?: string) => {
      for (const key in obj) {
        const valueKey = parent ? `${parent}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'object' && value !== null && value !== undefined) {
          getKeys(value, valueKey);
        } else {
          keys.add(valueKey);
        }
      }
    };

    getKeys(response);

    return [...keys];
  }
}