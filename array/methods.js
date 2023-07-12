//push: Adiciona um ou mais elementos ao final do array.
let array_push = [1, 2, 3];
array_push.push(4);
console.log(array_push); // [1, 2, 3, 4]

//pop: Remove o último elemento do array e retorna o elemento removido.
let array_pop = [1, 2, 3, 4];
let element_to_pop = array_pop.pop();
console.log(element_to_pop); // 4
console.log(array_pop); // [1, 2, 3]

//shift: Remove o primeiro elemento do array e retorna o elemento removido.
let array_shift = [1, 2, 3, 4];
let element_to_shift = array_shift.shift();
console.log(element_to_shift); // 1
console.log(array_shift); // [2, 3, 4]

//unshift: Adiciona um ou mais elementos no início do array.
let array_unshift = [2, 3, 4];
array_unshift.unshift(1);
console.log(array_unshift); // [1, 2, 3, 4]

//concat: Combina dois ou mais arrays e retorna um novo array.
let array_concat_1 = [1, 2];
let array_concat_2 = [3, 4];
let new_array_concat = array_concat_1.concat(array_concat_2);
console.log(new_array_concat); // [1, 2, 3, 4]

//splice: Permite adicionar, remover ou substituir elementos em um array. Ele modifica o array original.
let array_splice = [1, 2, 3, 4, 5];
array_splice.splice(2, 2, "a", "b");
console.log(array_splice); // [1, 2, 'a', 'b', 5]

//indexOf: Retorna o primeiro índice em que um elemento especificado é encontrado no array.
let array_indexOf = [1, 2, 3, 4, 5];
let index_array_indexOf = array_indexOf.indexOf(3);
console.log(index_array_indexOf); // 2

//forEach: Executa uma função em cada elemento do array.
let array_forEach = [1, 2, 3];
array_forEach.forEach(function (element) {
  console.log(element);
});
// Saída:
// 1
// 2
// 3

//map: Cria um novo array com os resultados de chamar uma função em cada elemento do array.
let array_map = [1, 2, 3];
let new_array_map = array_map.map(function (element) {
  return element * 2;
});
console.log(new_array_map); // [2, 4, 6]

//filter: Cria um novo array com todos os elementos que passam por um teste especificado em uma função.
let array_filter = [1, 2, 3, 4, 5];
let new_array_filter = array_filter.filter(function (element) {
  return element % 2 === 0;
});
console.log(new_array_filter); // [2, 4]

//reduce: Executa uma função em cada elemento do array, resultando em um único valor de saída.
let array_reduce = [1, 2, 3, 4, 5];
let sum_array_reduce = array_reduce.reduce(function (accumulator, element) {
  return accumulator + element;
}, 0);
console.log(sum_array_reduce); // 15

//sort: Ordena os elementos do array em ordem crescente (por padrão) ou com base em uma função de comparação.
let array_sort = [3, 1, 4, 2, 5];
array_sort.sort();
console.log(array_sort); // [1, 2, 3, 4, 5]

//reverse: Inverte a ordem dos elementos do array.
let array_reverse = [1, 2, 3, 4, 5];
array_reverse.reverse();
console.log(array_reverse); // [5, 4, 3, 2, 1]

//join: Combina todos os elementos do array em uma única string, separada por um separador especificado.
let array_join = ["Hello", "world", "!"];
let result_array_join = array_join.join(" ");
console.log(result_array_join); // "Hello world !"

//slice: Retorna uma cópia superficial de uma parte do array, especificada pelos índices de início e fim.
let array_slice = [1, 2, 3, 4, 5];
let new_array_slice = array_slice.slice(2, 4);
console.log(new_array_slice); // [3, 4]
