import {MenuItem} from '../../interfaces';

export const restEndpoint: String = 'http://localhost:8080';

const inicioItem: MenuItem = { displayName: 'Inicio', selectorName: '<app-admin-home></app-admin-home>'};
const cerrarItem: MenuItem = { displayName: 'Cerrar Sesión', selectorName: ''};

export const ITEMS_ADMIN: MenuItem[] = [
  inicioItem,
  {
    displayName: 'Administrar Usuarios',
    selectorName: '<app-adminUsers></app-adminUsers>'
  }, cerrarItem];

export const ITEMS_PROF: MenuItem[] = [
  inicioItem,
  {
    displayName: 'Gestionar Secciones',
    selectorName: ''
  }, cerrarItem];

export const ITEMS_ALUMNO: MenuItem[] = [ inicioItem, cerrarItem ];

export const userSacc_test = '<users>\n' +
  '\t<user>\n' +
  '\t\t<username>1</username>\n' +
  '\t\t<nickname>Ivan</nickname>\n' +
  '\t\t<password>asdf</password>\n' +
  '\t\t<authLevel>Admin</authLevel>' +
  '\t</user>\n' +
  '\t<user>\n' +
  '\t\t<username>2</username>\n' +
  '\t\t<nickname>ivan2</nickname>\n' +
  '\t\t<password>1234</password>\n' +
  '\t\t<authLevel>Profe</authLevel>' +
  '\t</user>\n' +
  '</users>';
export const usertAcc_test = '<user>' +
  '<username>honte</username>' +
  '<nickname>ivan hdz</nickname>' +
  '<password>aloo</password>' +
  '<authLevel>0</authLevel>' +
  '</user>';
export const restStatus_test = '<restStatus><status>success</status><message>Alo</message></restStatus>';
