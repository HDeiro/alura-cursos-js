import {handleStatus} from '../utils/promise-helpers.js';
import {partialize, compose, pipe} from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);

const filterItemsByCode = (codigo, items) => items.filter(item => item.codigo == codigo);

const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0);

export const notasService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível retornar informações das notas');
            });
    },
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(
            getItemsFromNotas, 
            filterItems, 
            sumItemsValue
        );

        return this.listAll().then(sumItems);
    }
}