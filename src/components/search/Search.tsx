import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import type {
  AlgoliaPlacesSuggestion,
  RawAnswer,
} from '../../types/algolia/places';
import AlgoliaPlaces from 'algolia-places-react';

import CustomHits from './CustomHits';

import styles from '../../../styles/Search.module.scss';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_APP_ID as string;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_PUBLIC_KEY as string;
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

export default function Search() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="DEV_occurrences">
        <div className={styles.wrap}>
          <h1 className={styles.title}>
            Search our network of USCCA Partner Ranges, Certified Instructors
            and In-person classes near you.
          </h1>

          <div className={styles.inputwrap}>
            <SearchBox className={styles.input} />
          </div>
        </div>
        {/* <AlgoliaPlaces
          // ref={algoliaInputRef}
          className={styles.input}
          placeholder="Search by address, city, or zip"
          // defaultValue={query || ''}
          options={{
            appId,
            apiKey,
            language: 'en',
            countries: ['US', 'GU', 'PR'],
          }}
          // onChange={handleChange}

          // onLocate={handleOnLocate}
        /> */}
        <CustomHits />
      </InstantSearch>
    </>
  );
}
