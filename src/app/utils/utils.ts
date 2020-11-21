export function sortBy(array: any[], fields: string[]): any[] {
  if (!array) {
    return [];
  }
  if (!fields.length) {
    return array;
  }
  const field = fields.pop();
  array.sort((a, b) => a[field] - b[field]);
  return array;
}

export function get(object: any, key: string): any {
  const keys = key.split('.');
  if (!keys[0]) {
    return object;
  } else if (object && object.hasOwnProperty(keys[0])) {
    return get(object[keys[0]], keys.slice(1).join('.'));
  } else {
    return null;
  }
}

export function unidecode(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
