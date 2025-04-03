import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';
import { CharacterModel } from '../models/character';

const StatusEnum = new GraphQLEnumType({
  name: 'Status',
  values: {
    Alive: { value: 'Alive' },
    Dead: { value: 'Dead' },
    unknown: { value: 'unknown' },
  },
});

const GenderEnum = new GraphQLEnumType({
  name: 'Gender',
  values: {
    Female: { value: 'Female' },
    Male: { value: 'Male' },
    Genderless: { value: 'Genderless' },
    unknown: { value: 'unknown' },
  },
});

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: StatusEnum },
    species: { type: GraphQLString },
    type: { type: GraphQLString },
    gender: { type: GenderEnum },
    origin: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      args: {
        name: { type: GraphQLString },
        status: { type: StatusEnum },
        species: { type: GraphQLString },
        gender: { type: GenderEnum },
        origin: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const filters = Object.fromEntries(
            Object.entries(args).filter(([_, value]) => value !== undefined),
          );

          return await CharacterModel.getCharactersWithCache(filters);
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export { schema };
