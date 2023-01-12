import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      code
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries (
      order_by: {name: asc}
    ){
      name
      capital
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS_COUNTRIES = gql`
  query GetContinentsCountries {
    continents {
      id
      code
      name
      countries {
        code
        name
        capital
        emoji
        continent {
          name
        }
      }
    }
  }
`;

export const GET_FILTERED_COUNTRIES = gql`
  query GetFilteredCountries ($filter: String!) {
    countries (filter: $filter) {
      code
      name
      capital
      emoji
    }
  }
`;


async function countries(parent, args, context, info) {
  const where = args.filter ? 
      { name: {contains: args.filter}} : {}

  const countries = await context.prisma.link.findMay({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  return {
    countries
  }
}