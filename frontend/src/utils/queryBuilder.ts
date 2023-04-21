
export interface QueryBuilderOptions {
  width?: number,
  height?: number,
  quality?: number,
  format?: string,
  fit?: string,
}

export function buildQuery (url: string, options: QueryBuilderOptions) {
  return buildQueryParams(url, options.width, options.height, options.quality, options.format, options.fit);
}

function buildQueryParams (url: string, width?: number, height?: number, quality?: number, format?: string, fit?: string) {
  let result: string = url;
  const params: string[] = [];

  if (width !== null && width !== undefined) {
    params.push(`width=${width}`);
  }

  if (height !== null && height !== undefined) {
    params.push(`height=${height}`);
  }

  if (quality !== null && quality !== undefined) {
    params.push(`quality=${quality}`);
  }

  if (format !== null && format !== undefined) {
    params.push(`format=${format}`);
  }

  if (fit !== null && fit !== undefined) {
    params.push(`fit=${fit}`);
  }

  if (params.length) {
    result += "?" + params.join("&");
  }

  return result;
}
