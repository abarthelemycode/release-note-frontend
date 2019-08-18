export function getToken() {
  const storage = localStorage.getItem('token');
  if (storage === undefined) return '';

  const token = JSON.parse(storage);
  return (token === null) ? '' : token;
}

export function isLogged() {
  const storage = localStorage.getItem('token');
  if (storage === undefined) return false;

  const token = JSON.parse(storage);
  return token !== null;
}

export function removeDuplicatedObject(array, prop) {
  return array.map(e => e[prop]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => array[e]).map(e => array[e]);
}
