import crypto from 'crypto'

const basePrincess1 = {
    id: crypto.randomUUID(),
    name: 'Brincess 1',
    eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
    mouth: { up: { string: '#4F0' }, down: { string: '#500' } },
    hair: { color: { string: '#6F0' }, style: 'long' },
    backgroundColor: { string: '#7F0' },
    creationTimeStamp: Date.now()
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
}, 60000)

export const resolvers = {
    brincesses: () => {
        return dataBase
    },

    hello: () => {
        return 'Hello World!'
    },

    addBrincess: ({ brincess }) => {
        if (dataBase.length >= 25) dataBase.shift()

        brincess.id = crypto.randomUUID()
        brincess.creationTimeStamp = Date.now()

        dataBase.push(brincess)

        return dataBase[dataBase.length - 1]
    }
}
