import Vorpal from 'vorpal'
import {
    writeFileSync, 
    readAllFiles, 
    createLemonade, 
    addLemonadeToOrder, 
    updateOrderTotal
} from './lib'

const vorpal = Vorpal()

vorpal
    .command('hello <name>', 'Prints hello <name> to the console')
    .option('-f --file', 'Provide a file name')
    .action(function(args, callback) {
        if (args.options.file) {
            this.log('I see you want to make a file')
        }
        this.log(`Hello ${args.name}`)
        callback()
    })

vorpal
    .command('createOrder <name> <phoneNumber>', 'Create an order and saves it as a JSON file')
    .action(function (args, callback) {
    // Prompt the user for how many lemonades they would like
    this.prompt(
        {
            type: 'number',
            name: 'numLemonades',
            default: 1,
            message: 'How many lemonades would you like to order?'
        }, 
        ({numLemonades}) => {

            const buildQuestionArray = (val, i) => [
                { type: 'number', name: `lemonJuice${i}`, message: `How many cups of lemon juice do you want in lemonade ${i + 1}?`},
                { type: 'number', name: `water${i}`, message: `How many cups of water do you want in lemonade ${i + 1}?`},
                { type: 'number', name: `sugar${i}`, message: `How many cups of sugar do you want in lemonade ${i + 1}?`},
                { type: 'number', name: `iceCubes${i}`, message: `How many ice cubes do you want in lemonade ${i + 1}?`}
            ]

            const questions = [...Array(Number.parseInt(numLemonades))].flatMap(buildQuestionArray)

            this.prompt(questions, response => {

                // Create order using functional logic
                const order = updateOrderTotal(
                    [...Array(Number.parseInt(numLemonades))] // Create an array of size numLemonades
                        .map(createLemonade(response)) // Map all lemonades to created array
                        .reduce(addLemonadeToOrder, { // Reduce lemonade array to a single order
                            total: 0,
                            lemonades: [],
                            customer: {
                                name: args.name,
                                phoneNumber: args.phoneNumber
                            },
                            lemonadeStand: {
                                name: 'Cooksys Lemonade Stand'
                            }   
                        })
                )
                    
                writeFileSync(order.lemonadeStand.name + '/' + order.customer.name + '.json', order)
                callback()
            })
        }
    )
})

vorpal
    .command('getOrders <lemonadeStand>', 'Get all orders for the given lemonade stand')
    .action(function ({ lemonadeStand }, callback) {
        const orders = readAllFiles(lemonadeStand)
        this.log(`There are ${orders.length} orders at ${lemonadeStand}`)
        for (let order of orders) {         
            this.log(`Order:`)
            this.log(`Total Price: ${order.total}`)
            this.log(`Lemonades:`)
            this.log(order.lemonades)
            this.log(`Customer:`)
            this.log(order.customer)
        }
        callback()
    })

vorpal.delimiter('lemonade-stand$').show()