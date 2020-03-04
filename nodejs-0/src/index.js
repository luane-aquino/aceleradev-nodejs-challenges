'use strict'

// returns an array with fibonacci numbers until it pass the number 350 e.g. [0, 1,..., 377]
const fibonacci = () => {
    let fibonacciArr = [0, 1] // populate array with first 2 fibonacci numbers
    let len = fibonacciArr.length

    do{
        fibonacciArr.push(fibonacciArr[len - 1] + fibonacciArr[len - 2]) // f(n) = f(n-1) + f(n-2)
        len = fibonacciArr.length
    }while(fibonacciArr[len - 1] < 350)
    
    return fibonacciArr
}

// A utility method that returns true if x is perfect square 
function isPerfectSquare(x){ 
    const squareRoot = Math.sqrt(x)
    // if s is decimal number,then it cannot be a perfect square
    if(!Number.isInteger(squareRoot)) {return false}

    // x is an integer number so, it is a perfect square
    return true
}

const isFibonnaci = (n) => {
    // n is Fibonacci if one of 5*n*n + 4 or 5*n*n - 4 or both 
    // is a perfect square 
    return isPerfectSquare(5 * Math.pow(n, 2) + 4) || 
            isPerfectSquare(5 * Math.pow(n, 2) - 4)
}

module.exports = {
    fibonacci,
    isFibonnaci
}
