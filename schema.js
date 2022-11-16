import { buildSchema } from 'graphql'

const mutationSchema = `
type Mutation {
  addBrincess(brincessInput: BrincessInput!): Brincess
  editBrincess(brincessInput: BrincessInput!): Brincess
  clearDataBase(verySecretKey: String!): [Brincess]
}

input BrincessInput {
  name: String!,
  backgroundColor: BackgroundInput!,
  eyes: EyesInput!,
  mouth: MouthInput!,
  hair: HairInput!,
  body: BodyInput!,
  authorId: ID,
  id: ID,
}
input BackgroundInput {string: String!, imgSrc: String}
input EyesInput {right: BackgroundInput!, left: BackgroundInput!, pupils: BackgroundInput!}
input MouthInput {up: BackgroundInput!, down: BackgroundInput!}
input BodyInput {head: BackgroundInput!, torso: BackgroundInput!, type: String!}
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
  body: Body,
  spells: Spells,
  health: Int,
}
type Background {string: String!, imgSrc: String}
type Eyes {right: Background, left: Background, pupils: Background}
type Mouth {up: Background, down: Background}
type Body {head: Background, torso: Background, type: String}
type Hair {style: String, color: Background}
type Spell {name: String, description: String}
type Spells {first: Spell, second: Spell}
`

export const schema = buildSchema(querySchema + mutationSchema)
