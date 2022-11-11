import crypto from 'crypto'
const MAXIMUM_BRINCESSES_IN_DATA_BASE = 25

const BASE_BRINCESS_1 = {
    name: 'Brincess 1',
    eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
    mouth: { up: { string: '#4F0' }, down: { string: '#500' } },
    hair: { color: { string: '#6F0' }, style: 'long' },
    backgroundColor: { string: '#7F0' },
    creationTimeStamp: Date.now(),
    authorId: '734147a3-9876-4f26-9ddd-b394ef93e732',
    id: '06986b57-5ebb-4647-8702-62b12b7759a1'
}
const BASE_BRINCESS_2 = {
    name: 'Brincess 2',
    eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
    mouth: { up: { string: '#1F0' }, down: { string: '#100' } },
    hair: { color: { string: '#2F0' }, style: 'short' },
    backgroundColor: { string: '#3F0' },
    creationTimeStamp: Date.now(),
    authorId: '734147a3-9876-4f26-9ddd-b394ef93e732',
    id: '6375393e-a746-4045-ba42-d32a5cc23ba3'
}
function populateDataBaseWithStandardBrincesses(dataBase) {
    dataBase.set(BASE_BRINCESS_1.id, BASE_BRINCESS_1)
    dataBase.set(BASE_BRINCESS_2.id, BASE_BRINCESS_2)
}
function mapValuesAsArray(map) {
    return Array.from(map.values())
}

// Initialize dataBase
const dataBaseMap = new Map()
populateDataBaseWithStandardBrincesses(dataBaseMap)
let dataBaseArray = mapValuesAsArray(dataBaseMap)

setInterval(() => {
    dataBaseMap.clear()
    populateDataBaseWithStandardBrincesses(dataBaseMap)
    dataBaseArray = mapValuesAsArray(dataBaseMap)
}, 1200000)

export const resolvers = {
    brincesses: () => {
        return dataBaseArray
    },

    brincess: ({ id }) => {
        const brincess = dataBaseMap.get(id)
        if (!brincess) throw new Error(`Brincess not found`)
        return brincess
    },

    numberOfBrincessesInDataBase: () => {
        return dataBaseMap.size
    },

    authorOfBrincess({ id, authorId }) {
        const brincess = dataBaseMap.get(id)
        if (!brincess) throw new Error(`Brincess not found`)
        return brincess.authorId === authorId
    },

    addBrincess: ({ brincessInput }) => {
        // TODO add brincessInput values validation function

        // Remove fist brincess if dataBase is full
        if (dataBaseMap.size >= MAXIMUM_BRINCESSES_IN_DATA_BASE)
            dataBaseMap.delete(dataBaseMap.keys().next().value)

        const uuid = crypto.randomUUID()
        brincessInput.creationTimeStamp = Date.now()
        brincessInput.id = uuid
        dataBaseMap.set(uuid, brincessInput)
        dataBaseArray = mapValuesAsArray(dataBaseMap)

        return dataBaseMap.get(uuid)
    },

    editBrincess: ({ brincessInput }) => {
        // TODO add brincessInput values validation function
        if (!brincessInput.authorId) throw new Error('No authorId provided')
        if (!brincessInput.id) throw new Error('No id provided')
        const brincess = dataBaseMap.get(brincessInput.id)
        if (!brincess) throw new Error('Brincess not found')
        if (brincess.authorId !== brincessInput.authorId)
            throw new Error('You do not have permission to edit this Brincess')

        dataBaseMap.set(brincessInput.id, brincessInput)
        dataBaseArray = mapValuesAsArray(dataBaseMap)
        return brincessInput
    },

    clearDataBase: () => {
        dataBaseMap.clear()
        populateDataBaseWithStandardBrincesses(dataBaseMap)
        dataBaseArray = mapValuesAsArray(dataBaseMap)
        return dataBaseArray
    },

    // Deprecated
    hello: () => {
        return 'Hello World!'
    }
}
