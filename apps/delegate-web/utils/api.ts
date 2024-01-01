export const constructApiRequestParameters = <Filters extends { [key: string]: string | number | string[] }>(filters: Filters) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryParams.append(`${key}[]`, item);
      });
    } else {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams;
}