import { buildSchema } from 'graphql'

const mutationSchema = `
type Mutation {
  addBrincess(brincessInput: BrincessInput!): Brincess
  editBrincess(brincessInput: BrincessInput!): Brincess
  clearDataBase: [Brincess]
}

input BrincessInput {
  name: String!,
  backgroundColor: BackgroundInput!,
  eyes: EyesInput!,
  mouth: MouthInput!,
  hair: HairInput!,
  authorId: ID,
  id: ID,
}
input BackgroundInput {string: String!, imgSrc: String}
input EyesInput {right: BackgroundInput!, left: BackgroundInput!}
input MouthInput {up: BackgroundInput!, down: BackgroundInput!}
input HairInput {style: String!, color: BackgroundInput!}
`

const querySchema = `
type Query {
  brincesses: [Brincess],
  brincess(id: ID!): Brincess,
  numberOfBrincessesInDataBase: Int,
  authorOfBrincess(id: ID!, authorId: ID!): Boolean,

  hello: String @deprecated(reason: "hello was the initial implementation and only for testing purposes, Use \`brincesses\` instead."),
}

type Brincess {
  id: ID,
  name: String,
  backgroundColor: Background,
  eyes: Eyes,
  mouth: Mouth,
  hair: Hair,
  spells: Spells,
  health: Int,
}
type Background {string: String!, imgSrc: String}
type Eyes {right: Background, left: Background}
type Mouth {up: Background, down: Background}
type Hair {style: String, color: Background}
type Spell {name: String, description: String}
type Spells {first: Spell, second: Spell}
`

export const schema = buildSchema(querySchema + mutationSchema)
