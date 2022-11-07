const dataBase = [
    {
        name: 'Brincess 1',
        eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
        mouth: { up: { string: '#4F0' }, down: { string: '#500' } },
        hair: { color: { string: '#6F0' }, style: 'long' },
        backgroundColor: {
            string: '#7F0',
            imgSrc: 'https://i.imgur.com/0F0.png'
        }
    },
    {
        name: 'Brincess 2',
        eyes: { right: { string: '#0F0' }, left: { string: '#000' } },
        mouth: { up: { string: '#1F0' }, down: { string: '#100' } },
        hair: { color: { string: '#2F0' }, style: 'short' },
        backgroundColor: { string: '#3F0' }
    }
]

export const resolvers = {
    princesses: () => {
        return dataBase
    },
    hello: () => {
        return 'Hello World!'
    }
}
