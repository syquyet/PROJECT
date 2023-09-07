function navigation(path) {
  window.location.pathname = path;
}
function navigationParam(url, param) {
  location.href = `${url}?${param}`;
}
function getDataFormLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function setDataFormLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
