import fs from 'fs'

const curry = (f, arr = []) => (...args) => (
    a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

// curry(a, b) => a + b
// (f, arr = []) => (...args) => (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])  
// Replace ((a,b) => a + b) for f, and default [] for arr
// (...args) => (a => (a.length === ((a,b) => a + b).length ? ((a,b) => a + b)(...a) : curry(((a,b) => a + b), a)))([...[], ...args])
// when .length is called on a function, it returns the number of parameters that function has
// (...args) => (a => (a.length === 2) ? ((a,b) => a + b)(...a) : curry(((a,b) => a + b), a)))([...[], ...args])
// Plug in [...[], ...args] as a, which spreads empty array and all arguments
// (...args) => args.length === 2 ? ((a,b) => a + b)(...args) : curry((a, b) => a + b, args)

const calculateLemonadePrice = lemonade => {
    let result = 0.75
    for (let key in lemonade) {
        switch (key) {
            case 'lemonJuice':
                result += lemonade[key] * .30
                break
            case 'water':
                result += lemonade[key] * .01
                break
            case 'sugar':
                result += lemonade[key] * .20
                break
            case 'iceCubes':
                result += lemonade[key] * .05
                break
            default:
                break
        }
    }
    return result;
}

const calculateOrderTotal = (lemonades) => {
    let result = 0
    for (let lemonade of lemonades) {
        result += lemonade.price
    }
    return result
}

export const writeFileSync = (fileName, order) => {
    fs.writeFileSync(fileName, JSON.stringify(order))
}

export const readAllFiles = dirName => {
    const orders = []
    for (let name of fs.readdirSync(dirName)) {
        orders.push(JSON.parse(fs.readFileSync(dirName + '/' + name)))
    }
    return orders
}

export const createLemonade = (response) => { 
    return (curr, i) => ({
        lemonJuice: Number.parseInt(response['lemonJuice' + i]),
        water: Number.parseInt(response['water' + i]),
        sugar: Number.parseInt(response['sugar' + i]),
        iceCubes: Number.parseInt(response['iceCubes' + i])
    })
}

export const addLemonadeToOrder = (originalOrder, lemonade) => ({
    ...originalOrder,
    lemonades: [
        ...originalOrder.lemonades,
        { ...lemonade, price: calculateLemonadePrice(lemonade) }
    ]
})

export const updateOrderTotal = (order) => ({
    ...order,
    total: calculateOrderTotal(order.lemonades)
})