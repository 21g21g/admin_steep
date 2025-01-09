export function _set(obj, path, value) {
    const pathParts = path.split(".");
    let current = obj;
  
    for (let i = 0; i < pathParts.length; i++) {
      if (i === pathParts.length - 1) {
        current[pathParts[i]] = value;
      } else {
        current[pathParts[i]] = current[pathParts[i]] || {};
        current = current[pathParts[i]];
      }
    }
  
    return obj;
  }
  
  export function _get(obj, path, defaultValue) {
    const pathParts = path.split(".");
    let current = obj;
  
    for (let i = 0; i < pathParts.length; i++) {
      if (current == null || current[pathParts[i]] === undefined) {
        return defaultValue;
      } else {
        current = current[pathParts[i]];
      }
    }
  
    return current;
  }
  
  export function _groupBy(collection, iteratee) {
    return collection?.reduce((result, item) => {
      const key =
        typeof iteratee === "function" ? iteratee(item) : item[iteratee];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
  }
  
  export function compact(array) {
    var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];
  
    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  }