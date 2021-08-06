import { FC, memo, useEffect, useRef, useState } from "react";

import {
  getCountries,
  removeCountry,
  watchCountries
} from "services/countries";
import { ICountry } from "services/countries/queries";

interface ICountriesProps {
  onDone?: () => void;
}
const Countries: FC<ICountriesProps> = memo(({ onDone = () => null }) => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const onDoneRef = useRef<typeof onDone>(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    watchCountries((newCountries) => setCountries(newCountries));
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setCountries(await getCountries());
      setLoading(false);
      onDoneRef.current();
    })();
  }, []);

  if (loading) return <i>Loading...</i>;

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map(({ name, code }) => (
          <li key={name} onClick={() => removeCountry(code)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Countries;
