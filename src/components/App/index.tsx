import { FC, memo, useRef } from "react";

import Countries from "components/Countries";
import CachedCountries, {
  ICachedCountriesRef
} from "components/CachedCountries";

const App: FC = memo(() => {
  const cachedCountriesRef = useRef<ICachedCountriesRef | null>(null);
  const handleDone = () => {
    console.debug("handling done");
    cachedCountriesRef.current?.readCache();
  };
  return (
    <div>
      <h1>Hello Apollo React</h1>
      <Countries onDone={handleDone} />
      <CachedCountries ref={cachedCountriesRef} />
    </div>
  );
});

export default App;
