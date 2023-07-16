// LES TROIS PETITS POINTS ...

// SPREAD OPERATOR

// pour les tableaux
const middleNumbers = [6, 7];
const numbers = [5, ...middleNumbers, 8];
// console.log(numbers)

const numbers1 = [1, 2];
const numbers2 = [3, 4];
let result = [...numbers1, ...numbers2];
// console.log(result)

// Pour des objets
const amir = {
    name: 'Amir',
    age: 36,
};
const amirWithEmail = {
    ...amir,
    email: 'amir@example.com'
};

// console.log(amirWithEmail);

const newAmir = {
    name: 'Amir',
    age: 37,
}

const lastAmir = {
    ...amir,
    ...newAmir
}

// console.log(lastAmir);

// Exercices
const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ["Salut", "à tous"]
const arr3 = ["je m'appelle", "mon nom est"]
const arr4 = ["Paul", "Doazan"]
const arr5 = ["Antoine", "Dupont"]

// à l'aide du spread operator, creer un seul et unique tableau, qui sera ensuite parcouru pour écrire les phrases suivantes :
// Bonjour tout le monde, je m'appelle Antoine Dupont
// Salut à tous, mon nom est Paul Doazan


// Le spread operator ressemble au rest parameter :
function sum(...params) {
    let total = 0
    params.forEach(param => total += param)
    return total
}

// console.log(sum(3, 4, 8, 12))

// Précisions à nouveau sur les assignations par valeur, assignations par référence.
// Précisions sur le destructuring

