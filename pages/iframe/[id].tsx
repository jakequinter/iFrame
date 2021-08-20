import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { Hit } from 'src/types/algolia/hits';
import { initAlgolia } from 'src/utils/initAlgolia';
import Occurrences from 'src/components/Occurrences';
import Search from 'src/components/Search';
import { useLocation } from 'src/hooks/useLocation';
import { useWatchLocation } from 'src/hooks/useWatchLocation';
import { geolocationOptions } from 'src/constants/geolocationOptions';

import styles from 'src/styles/iFrame.module.scss';

type IFrame = {
  type: 'instructor' | 'curriculum';
  id: string;
  initialHits: Array<Hit>;
  totalClasses: number;
};

export default function IFrame({ type, id, initialHits }: IFrame) {
  const [hits, setHits] = useState(initialHits);
  const { location: currentLocation, error: currentError } =
    useLocation(geolocationOptions);
  const { location, cancelLocationWatch, error } =
    useWatchLocation(geolocationOptions);
  const [isWatchinForLocation, setIsWatchForLocation] = useState(true);

  useEffect(() => {
    if (!location) return;

    // Cancel location watch after 3sec
    setTimeout(() => {
      cancelLocationWatch();
      setIsWatchForLocation(false);
    }, 3000);
  }, [location, cancelLocationWatch]);

  return (
    <div className={styles.container}>
      <Search type={type} id={id} setHits={setHits} />
      <Occurrences
        hits={hits}
        latitude={currentLocation?.latitude}
        longitude={currentLocation?.longitude}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
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
