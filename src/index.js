// const order = {
//     total: 5.00,
//     lemonades: [
//         {
//             lemonJuice: 4,
//             water: 2,
//             sugar: 3,
//             iceCubes: 7,
//             price: 5
//         },
//         {
//             lemonJuice: 2,
//             water: 2,
//             sugar: 1,
//             iceCubes: 7,
//             price: 3.5
//         },
//         {
//             lemonJuice: 3,
//             water: 2,
//             sugar: .5,
//             iceCubes: 7,
//             price: 4.38
//         },
//         {
//             lemonJuice: 3,
//             water: 2.14,
//             sugar: 1.25,
//             iceCubes: 7,
//             price: 2.49
//         }
//     ],
//     lemonadeStand: {
//         name: "Cooksys Lemonade Stand"
//     },
//     customer: {
//         name: 'Bob',
//         phoneNumber: '5552223248'
//     }
// }

import Vorpal from 'vorpal'

const vorpal = Vorpal()

vorpal
    .command('hello <name> [number]', 'Prints hello to the console')
    .action(function(args, callback) {
        this.log(args.options)
        this.log('Hello ' + args.name + ', should I call you at ' + args.number + '?')
        callback()
    })

vorpal.show()