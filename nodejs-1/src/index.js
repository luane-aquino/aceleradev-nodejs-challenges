'use strict'
const fs = require('fs');

const players = (() => {
    const data = fs.readFileSync(`./data.csv`, 'utf8')
        .trim() //removes empty lines from start and end of data
        .split('\n')
        .map(line => line.split(','));

    const [properties, ...players] = data //gets the header

    //returns a player object
    function player(values){
        properties.forEach( (prop, index) => {
            this[prop] = values[index]
        })
    }

    //generates an array of objects
    return players.map(values => new player(values))
})()

//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {
    return players.reduce((acc, curr) => { //generates an array of unique nationalities
        if (!acc.includes(curr.nationality)) { acc.push(curr.nationality) }
        return acc;
    }, []).length; //returns length of unique nationalities array
}

//console.log(players[players.length - 1])
console.log(q1())

//Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
    return players.reduce((acc, curr) => { //generates an array of unique clubs
        if (!acc.includes(curr.club) && curr.club) { acc.push(curr.club) }
        return acc;
    }, []).length; //returns length of unique nationalities array
}

//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
    return players.slice(0, 20).map(el => el.full_name)
}

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    return players
        .sort((a, b) => { //sorts array in descending order
            return Number(b.eur_wage) - Number(a.eur_wage)
        })
        .slice(0, 10) //gets first 10 objects
        .map(el => el.full_name) //gets their names
}

//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => {
    return players
        .sort((a, b) => { //sort array in descending order
            if (Number(b.age) === Number(a.age)) { //a and b have same age
                return Number(b.eur_wage) - Number(a.eur_wage) //if break even, criteria is wage
            }
            return Number(b.age) - Number(a.age)
        })
        .slice(0, 10) //gets first 10 objects
        .map(el => el.full_name) //gets their age
}

//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {
    return players.reduce((acc, curr) => {
        if (!acc[curr.age]) {
            acc[curr.age] = 1
            return acc
        }
        acc[curr.age] += 1
        return acc
    }, {})
}

module.exports = { q1, q2, q3, q4, q5, q6 }
