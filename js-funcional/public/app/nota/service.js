import {handleStatus} from '../utils/promise-helpers.js';
import {partialize, compose, pipe} from '../utils/operators.js';
import {Maybe} from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));

const filterItemsByCode = (codigo, itemsM) => itemsM.map(items => items.filter(item => item.codigo == codigo));

const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(Maybe.of)
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

        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
}