import {
    BASE_BRINCESS_1,
    BASE_BRINCESS_2,
    BRINCESS_SPELLS
} from './brincessData.js'

export function populateDataBaseWithStandardBrincesses(dataBase) {
    dataBase.set(BASE_BRINCESS_1.id, BASE_BRINCESS_1)
    dataBase.set(BASE_BRINCESS_2.id, BASE_BRINCESS_2)
}

export function mapValuesAsArray(map) {
    return Array.from(map.values())
}

function randomArrayIndex(array) {
    return Math.floor(Math.random() * array.length)
}
function twoElementsFromArrayThatAreNotDuplicates(array) {
    const arrayCopy = [...array]
    const firstSpell = arrayCopy.splice(randomArrayIndex(arrayCopy), 1)[0]
    const secondSpell = arrayCopy[randomArrayIndex(arrayCopy)]
    return [firstSpell, secondSpell]
}
export function pickTwoRandomSpellsForBrincess() {
    const randomSpells =
        twoElementsFromArrayThatAreNotDuplicates(BRINCESS_SPELLS)
    return { first: randomSpells[0], second: randomSpells[1] }
}

export function validateBrincessInput(brincessInput) {
    // TODO add more validation
    if (brincessInput.name.length >= 10) throw new Error('Name is too long')
}

export function generateBrincessHealth() {
    return Math.floor(Math.random() * 1000) + 1
}
