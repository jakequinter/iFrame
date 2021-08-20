import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { Hit } from 'src/types/algolia/hits';
import { initAlgolia, getTotalClasses } from 'src/utils/initAlgolia';
import Occurrences from 'src/components/Occurrences';
import Search from 'src/components/Search';

import styles from 'src/styles/iFrame.module.scss';

type IFrame = {
  type: 'instructor' | 'curriculum';
  id: string;
  initialHits: Array<Hit>;
  totalClasses: number;
};

export default function IFrame({
  type,
  id,
  initialHits,
  totalClasses
}: IFrame) {
  const router = useRouter();
  const [hits, setHits] = useState(initialHits);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleLocation = () => {
    if (router.query.id === 'FL-CCHDF') {
      setLatitude(28.5384);
      setLongitude(-81.633);
    }
  };

  // const fetchCoursesByGeolocation = async () => {
  //   const searchHits = await initAlgolia(
  //     type,
  //     id,
  //     latitude.toString(),
  //     longitude.toString()
  //   );

  //   console.log('hitssss', searchHits);
  //   // @ts-ignore
  //   setHits(searchHits);
  // };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        sessionStorage.setItem('lat', position.coords.latitude.toString());
        sessionStorage.setItem('lng', position.coords.longitude.toString());
      });
    } else {
      handleLocation();
    }

    // fetchCoursesByGeolocation();
  }, [handleLocation]);

  return (
    <div className={styles.container}>
      <Search type={type} id={id} setHits={setHits} />
      <Occurrences
        hits={hits}
        latitude={latitude}
        longitude={longitude}
        totalHits={totalClasses}
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

  const totalClasses = await getTotalClasses(type, id);

  return {
    props: {
      type,
      id,
      initialHits,
      totalClasses
    }
  };
};
