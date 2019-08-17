export function getFromLS(key) {
  if (global.localStorage) {
    try {
      return JSON.parse(global.localStorage.getItem(key))
    } catch (e) {
      /*Ignore*/
    }
  }
}

export function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value))
  }
}
