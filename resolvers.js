import crypto from 'crypto'

const basePrincess1 = {
    name: 'Brincess 1',
    eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
    mouth: { up: { string: '#4F0' }, down: { string: '#500' } },
    hair: { color: { string: '#6F0' }, style: 'long' },
    backgroundColor: { string: '#7F0' },
    creationTimeStamp: Date.now(),
    id: '06986b57-5ebb-4647-8702-62b12b7759a1',
    authorId: '734147a3-9876-4f26-9ddd-b394ef93e732'
    // id: crypto.randomUUID(),
}
const baseBrincess2 = {
    id: crypto.randomUUID(),
    name: 'Brincess 2',
    eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
    mouth: { up: { string: '#1F0' }, down: { string: '#100' } },
    hair: { color: { string: '#2F0' }, style: 'short' },
    backgroundColor: { string: '#3F0' },
    creationTimeStamp: Date.now()
}
const dataBase = [basePrincess1, baseBrincess2]

setInterval(() => {
    dataBase.length = 0
    dataBase.push(basePrincess1, baseBrincess2)
}, 1200000)

export const resolvers = {
    brincesses: () => {
        return dataBase
    },

    brincess: ({ id }) => {
        const brincess = dataBase.find((brincess) => brincess.id === id)
        if (!brincess) throw new Error(`Brincess not found`)

        return brincess
    },

    numberOfBrincessesInDataBase: () => {
        return dataBase.length
    },

    authorOfBrincess({ id, authorId }) {
        const brincess = dataBase.find((brincess) => brincess.id === id)
        if (!brincess) throw new Error(`Brincess not found`)
        return brincess.authorId === authorId
    },

    addBrincess: ({ brincess }) => {
        if (dataBase.length >= 25) dataBase.shift()

        brincess.id = crypto.randomUUID()
        brincess.creationTimeStamp = Date.now()

        dataBase.push(brincess)
        return dataBase[dataBase.length - 1]
    },

    editBrincess: ({ brincess }) => {
        if (!brincess.authorId) throw new Error('No authorId provided')
        if (!brincess.id) throw new Error('No id provided')
        const brincessIndex = dataBase.findIndex(
            (dataBaseBrincess) => dataBaseBrincess.id === brincess.id
        )
        if (brincessIndex === -1) throw new Error('Brincess not found')
        if (dataBase[brincessIndex].authorId !== brincess.authorId)
            throw new Error('You do not have permission to edit this Brincess')

        dataBase[brincessIndex] = brincess
        return brincess
    },

    clearDataBase: () => {
        dataBase.length = 0
        dataBase.push(basePrincess1, baseBrincess2)
        return dataBase
    },

    // Deprecated
    hello: () => {
        return 'Hello World!'
    }
}
