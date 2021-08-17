import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';

import { DEFAULT_COURSE_IMAGE } from 'src/images/images';
import { getDistanceFromLatLng } from 'src/utils/getLatLngDistance';
import { liveFire, wheelchair, shield, permit } from './icons/icons';
import styles from 'src/styles/Occurrence.module.scss';

type Occurrence = {
  averageReviewRating: number;
  city: string;
  courseName: string;
  grantsCCW: boolean;
  hasLiveFire: boolean;
  imageUrl: string;
  instructorGuid: string;
  instructorName: string;
  isInstructorCertifying: boolean;
  isWheelchairAccessible: boolean;
  lat: number;
  latitude: number;
  lng: number;
  longitude: number;
  price: number;
  startTime: string;
  state: string;
  venue: string;
};

export default function Occurrence({
  averageReviewRating,
  city,
  courseName,
  grantsCCW,
  hasLiveFire,
  imageUrl,
  instructorGuid,
  instructorName,
  isInstructorCertifying,
  isWheelchairAccessible,
  lat,
  latitude,
  lng,
  longitude,
  price,
  startTime,
  state,
  venue,
}: Occurrence) {
  return (
    <a className={styles.card}>
      <div className={styles.topContent}>
        {latitude !== 0 && (
          <div className={styles.distanceTag}>
            {getDistanceFromLatLng(lat, lng, latitude, longitude)}
          </div>
        )}
        <div className={styles.masthead}>
          <Image
            src={imageUrl ? imageUrl : DEFAULT_COURSE_IMAGE}
            height="200"
            width="288"
            alt=""
          />
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
            {!!averageReviewRating && (
              <span className={styles.rating}>
                <FaStar />
                {averageReviewRating}
              </span>
            )}
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
