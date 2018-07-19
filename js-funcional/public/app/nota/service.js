import {handleStatus} from '../utils/promise-helpers.js';

const API = 'http://localhost:3000/notas';

const sumItems = codigo => notas => notas
    .reduce((array, nota) => array.concat(nota.itens), [])
    .filter(item => item.codigo == codigo)
    .reduce((total, item) => total + item.valor, 0);

export const notasService = {
    listAll() {
        return fetch(API).then(handleStatus);
    },
    sumItems(code) {
        return this.listAll().then(sumItems(code));
    }
}