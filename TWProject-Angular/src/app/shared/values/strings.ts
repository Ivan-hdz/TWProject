/*
* Archivo utilizado por varios componentes, este archivo contiene
* cosas referentes a constantes y manipulacion de cadenas
* */
 export const restEndpoint = 'http://' + window.location.host + '/Y-Como-Va-la-Historia';
// export const restEndpoint = 'http://localhost/TWJavaProject';

export function isSubstring(str: string, sub: string) {
  let f = 1;
  for (let i = 0; i < sub.length; i ++) {
    if (sub[i] !== str[i]) {
      return false;
    }
  }
  return true;
}
