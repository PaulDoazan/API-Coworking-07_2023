// SPREAD OPERATOR

// pour les tableaux
// const arr1 = [2, 4, 7]
// const arr2 = [3, 5, 8]

// const newArr = [1, ...arr2, "hello", "world"]

// console.log(newArr)

// pour les objets

const amir = {
    name: 'Amir',
    age: 36
}

const amirWithEmail = {
    ...amir,
    email: 'amir@example.com'
}

// console.log(amirWithEmail)

const oldAmir = {
    ...amir,
    age: 37
}

// console.log(oldAmir)

// Exercices
const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ["Salut", "à tous"]
const arr3 = ["je m'appelle", "mon nom est"]
const arr4 = ["Paul", "Doazan"]
const arr5 = ["Antoine", "Dupont"]

// à l'aide du spread operator, créer pour chaque phrase un seul tableau, qui sera ensuite parcouru :

// Bonjour tout le monde je m'appelle Antoine Dupont
const newArr1 = [...arr1, arr3[0], ...arr5]
const result = newArr1.join(' ')

// Salut à tous mon nom est Paul Doazan
const newArr2 = [...arr2, arr3[1], ...arr4]
const result2 = newArr2.join(' ')

// console.log(result2)

// CONFUSION AVEC LE REST PARAMETER
function sum(...params) {
    let total = 0
    params.forEach((element) => {
        total += element
    })
    return total
}

console.log(sum(4, 5, 7, 1, 4))


