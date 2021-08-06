import {
  memo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle
} from "react";

import {
  removeCountry,
  watchCountries,
  getCachedCountries
} from "services/countries";
import { ICountry } from "services/countries/queries";

export interface ICachedCountriesRef {
  readCache: () => void;
}
const CachedCountries = memo(
  forwardRef<ICachedCountriesRef, {}>((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<ICountry[] | undefined>([]);

    const readCache = useCallback(async () => {
      setLoading(true);
      setCountries(await getCachedCountries());
      setLoading(false);
    }, []);

    useEffect(() => {
      watchCountries((newCountries) => setCountries(newCountries));
    }, []);

    useImperativeHandle(ref, () => ({
      readCache
    }));

    if (loading) return <i>Loading...</i>;

    return (
      <div>
        <h1>Cached Countries</h1>
        <ul>
          {countries ? (
            countries.map(({ name, code }) => (
              <li key={name} onClick={() => removeCountry(code)}>
                {name}
              </li>
            ))
          ) : (
            <strong>Cache null</strong>
          )}
        </ul>
      </div>
    );
  })
);

export default CachedCountries;
