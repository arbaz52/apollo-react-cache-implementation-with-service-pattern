import gql from "graphql-tag";

export interface ICountry {
  code: string;
  name: string;
  emoji: string;
  states: {
    name: string;
    code: string | null;
  }[];
}
export interface IQGetCountries {
  countries: ICountry[];
}
export const GET_COUNTRIES = gql`
  query GET_COUNTRIES {
    countries {
      code
      name
      emoji
      states {
        code
        name
      }
    }
  }
`;
