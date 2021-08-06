import client from "client";
import produce from "immer";
import { GET_COUNTRIES, ICountry, IQGetCountries } from "./queries";

export function slice<T>(arr: T[]) {
  return arr.slice(0, 10);
}

export const getCountries = async () => {
  const { data } = await client.query<IQGetCountries>({
    query: GET_COUNTRIES
  });

  return slice(data.countries);
};

export const getCachedCountries = async () => {
  const { data } = await client.query<IQGetCountries>({
    query: GET_COUNTRIES
  });

  return slice(data?.countries ?? []);
};

export const removeCountry = async (code: string) => {
  const cached = client.readQuery<IQGetCountries>({
    query: GET_COUNTRIES
  });
  if (cached) {
    const update = produce(cached, (draft) => {
      draft.countries = draft.countries.filter(
        ({ code: countryCode }) => countryCode !== code
      );
    });
    client.writeQuery<IQGetCountries>({
      query: GET_COUNTRIES,
      data: update
    });
  }
};

export const watchCountries = async (
  onChange: (countries: ICountry[]) => void
) => {
  return client
    .watchQuery<IQGetCountries>({
      query: GET_COUNTRIES
    })
    .subscribe(({ data }) => {
      onChange(slice(data.countries));
    });
};
