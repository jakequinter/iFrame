import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Hit } from 'src/types/algolia/hits';
import { getAlgoliaParameters, initAlgolia } from 'src/utils/initAlgolia';
import Occurrences from 'src/components/Occurrences';
import Search from 'src/components/Search';

import styles from 'src/styles/iFrame.module.scss';

type IFrame = {
  type: 'instructor' | 'curriculum';
  id: string;
  initialHits: Array<Hit>;
};

export default function IFrame({ type, id, initialHits }: IFrame) {
  const [hits, setHits] = useState(initialHits);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('lat') && sessionStorage.getItem('lng')) {
      setLatitude(Number(sessionStorage.getItem('lat')));
      setLongitude(Number(sessionStorage.getItem('lng')));
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          sessionStorage.setItem('lat', position.coords.latitude.toString());
          sessionStorage.setItem('lng', position.coords.longitude.toString());
        });
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <Search type={type} id={id} setHits={setHits} />
      <Occurrences
        hits={hits}
        latitude={latitude}
        longitude={longitude}
        totalHits={initialHits.length}
      />
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
