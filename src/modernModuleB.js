console.log('Running Module B')

export const moduleBVariable = 'Name Variable from Module B'

export const moduleBVariable2 = 50

export function moduleBFunction() {
    console.log('Running from Module B function')
}

export default {
    a: moduleBVariable,
    b: moduleBVariable2,
    c: moduleBFunction
}

console.log('Finished Running Module B')