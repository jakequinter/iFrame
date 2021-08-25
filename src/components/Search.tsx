import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';

import { Hit } from 'src/types/algolia/hits';
import { TYPE } from 'src/types/algolia/type';
import { initAlgolia } from 'src/utils/initAlgolia';

import styles from 'src/styles/Search.module.scss';

type Search = {
  type: TYPE;
  id: string;
  setHits: (hits: Array<Hit>) => void;
};

type Suggestion = {
  suggestion: { latlng: { lat: string; lng: string } };
};

const appId = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_PUBLIC_KEY;

export default function Search({ type, id, setHits }: Search) {
  const handleChange = async ({ suggestion }: Suggestion) => {
    const {
      latlng: { lat, lng },
    } = suggestion;

    const searchHits = await initAlgolia(type, id, lat, lng);

    setHits(searchHits);
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        Search our network of USCCA Partner Ranges, Certified Instructors and
        In-person classes near you.
      </h1>

      <div className={styles.inputwrap}>
        <AlgoliaPlaces
          placeholder="Search by address, city, or zip"
          options={{
            appId,
            apiKey,
            language: 'en',
            countries: ['US', 'GU', 'PR'],
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
