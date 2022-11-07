import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Query {
    brincesses: [Brincess],
    hello: String @deprecated(reason: "hello was the initial implementation and only for testing purposes, Use \`brincesses\` instead.")
  }
  type Brincess {
    name: String,
    backgroundColor: Background,
    eyes: Eyes,
    mouth: Mouth,
    hair: Hair
  }
  type Background {string: String, imgSrc: String}
  type Eyes {right: Background, left: Background}
  type Mouth {up: Background, down: Background}
  type Hair {style: String, color: Background}
`)
