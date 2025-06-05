const add = (a, b) => a + b

const curry = (f, arr = []) => (...args) => (
    a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

const curriedAdd = curry(add)

// console.log(curriedAdd(1)(2))

const increment = curriedAdd(1)

// console.log(add(1, 2))
// console.log(curriedAdd(1)(2))

console.log(increment(10))

// // Rest parameters
// const f = (...a) => console.log(a)

// f(10, 20, 30, 40, 'hello', true, [1, 2, 3], {a: 'bye', b: 'hi'})

// // Spread argumentss into a function
// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// f(...a)