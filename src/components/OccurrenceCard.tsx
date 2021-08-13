import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import { DEFAULT_COURSE_IMAGE } from 'src/images/images';
import { getDistanceFromLatLng } from 'src/utils/getLatLngDistance';
import { liveFire, wheelchair, shield, permit } from './icons/icons';
import styles from 'src/styles/Occurrence.module.scss';

type Occurrence = {
  courseName: string;
  instructorName: string;
  startTime: string;
  price: number;
  venue: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  latitude: number;
  longitude: number;
  instructorGuid: string;
  grantsCCW: boolean;
  hasLiveFire: boolean;
  isWheelchairAccessible: boolean;
  isInstructorCertifying: boolean;
};

export default function Occurrence({
  startTime,
  price,
  courseName,
  instructorName,
  venue,
  city,
  state,
  lat,
  lng,
  latitude,
  longitude,
  instructorGuid,
  grantsCCW,
  hasLiveFire,
  isWheelchairAccessible,
  isInstructorCertifying,
}: Occurrence) {
  return (
    <a className={styles.card}>
      <div className={styles.topContent}>
        <div className={styles.distanceTag}>
          {latitude === 0
            ? 'Calculating...'
            : getDistanceFromLatLng(lat, lng, latitude, longitude)}
        </div>
        <div className={styles.masthead}>
          <Image src={DEFAULT_COURSE_IMAGE} height="200" width="288" alt="" />
        </div>
        <div className={styles.description}>
          <h4 className={styles.date}>{format(new Date(startTime), 'PPP')}</h4>
          <h5 className={styles.name}>{courseName}</h5>
          <h6 className={styles.business}>
            with{' '}
            <Link
              href={`${
                process.env.NEXT_PUBLIC_TRAINING_URL || ''
              }/instructor/${instructorGuid}`}
              passHref
            >
              <a>{instructorName}</a>
            </Link>
            {/* {!!averageReviewRating && (
            <span className={styles.rating}>
              <FaStar />
              {averageReviewRating}
            </span>
          )} */}
          </h6>
          <address className={styles.address}>
            {venue}, {city}, {state}
          </address>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.classAttributes}>
          <ul>
            {grantsCCW && <li title="Carry Permit">{permit}</li>}
            {hasLiveFire && <li title="Live Fire">{liveFire}</li>}
            {isWheelchairAccessible && (
              <li title="Wheelchair Accessible">{wheelchair}</li>
            )}
            {isInstructorCertifying && (
              <li title="Instructor Certification Course">{shield}</li>
            )}
          </ul>
        </div>

        <p className={styles.price}>{price ? `$${price}` : 'Free'}</p>
      </div>
    </a>
  );
}
