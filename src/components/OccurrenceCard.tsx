import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import styles from '../../styles/Occurrence.module.scss';

type Occurrence = {
  courseName: string;
  instructorName: string;
  startTime: string;
  price: number;
  venue: string;
  city: string;
  state: string;
};

export default function Occurrence({
  startTime,
  price,
  courseName,
  instructorName,
  venue,
  city,
  state,
}: Occurrence) {
  return (
    <a className={styles.card}>
      <div className={styles.topContent}>
        <div className={styles.distanceTag}>
          12.8
          {/* {convertMetersToMiles(metersAwayFromTarget).toFixed(1)} mi. */}
        </div>
        <div className={styles.masthead}>
          <Image
            src="https://images.unsplash.com/photo-1592698426264-d5a81aaa4ec8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGd1bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
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
            {/* <a
            href={`${
              process.env.NEXT_PUBLIC_TRAINING_URL || ""
            }/instructor/${instructorGuid}`}
          > */}
            {instructorName}
            {/* </a> */}
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
          {/* <ul>
          {grantsCCW && <li title="Carry Permit">{permit}</li>}
          {hasLiveFire && <li title="Live Fire">{liveFire}</li>}
          {isWheelchairAccessible && (
            <li title="Wheelchair Accessible">{wheelchair}</li>
          )}
          {isInstructorCertifying && (
            <li title="Instructor Certification Course">{shield}</li>
          )}
        </ul> */}
        </div>

        <p className={styles.price}>{price ? `$${price}` : 'Free'}</p>
      </div>
    </a>
  );
}
