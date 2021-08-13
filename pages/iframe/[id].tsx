import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import AlgoliaPlaces from 'algolia-places-react';

import { Hit } from '../../src/types/algolia/hits';
import { getAlgoliaParameters, initAlgolia } from '../../src/utils/initAlgolia';
import Occurrences from '../../src/components/Occurrences';

type IFrame = {
  type: 'instructor' | 'curriculum';
  id: string;
  initialHits: Array<Hit>;
};

type Suggestion = {
  suggestion: { latlng: { lat: string; lng: string } };
};

const appId = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PLACES_PUBLIC_KEY;

export default function IFrame({ type, id, initialHits }: IFrame) {
  const [hits, setHits] = useState(initialHits);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  const handleChange = async ({ suggestion }: Suggestion) => {
    const {
      latlng: { lat, lng },
    } = suggestion;

    const searchHits = await initAlgolia(type, id, lat, lng);

    // @ts-ignore
    setHits(searchHits);
  };

  return (
    <div>
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
      <Occurrences hits={hits} latitude={latitude} longitude={longitude} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hits = await getAlgoliaParameters();

  const curriculumAbbreviations = hits.map(hit => ({
    // @ts-ignore
    params: { id: hit.curriculum.abbreviation || '404' },
  }));

  const instructorUserIds = hits.map(hit => ({
    // @ts-ignore
    params: { id: hit.instructor.userId || '404' },
  }));

  const paths = instructorUserIds.concat(curriculumAbbreviations);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id as string;
  let type: 'instructor' | 'curriculum';

  if (id.includes('CCHDF') || id.includes('DSF1-CI')) type = 'curriculum';
  else type = 'instructor';

  const initialHits = await initAlgolia(type, id);

  return {
    props: {
      type,
      id,
      initialHits,
    },
  };
};
