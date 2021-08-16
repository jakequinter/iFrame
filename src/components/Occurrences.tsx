import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

import { Hit } from 'src/types/algolia/hits';
import OccurrenceCard from './OccurrenceCard';

import styles from 'src/styles/Occurrences.module.scss';

type Occurrences = {
  hits: Array<Hit>;
  latitude: number;
  longitude: number;
  totalHits: number;
};

export default function Occurrences({
  hits,
  latitude,
  longitude,
  totalHits,
}: Occurrences) {
  return (
    <>
      <div className={styles.container}>
        {hits &&
          hits.map(hit => (
            <OccurrenceCard
              key={hit.objectID}
              averageReviewRating={hit.instructor.averageReviewRating}
              city={hit.course.location.city}
              courseName={hit.course.name}
              grantsCCW={hit.course.grantsCCW}
              hasLiveFire={hit.course.hasLiveFire}
              instructorGuid={hit.instructor.guid}
              instructorName={hit.instructor.name}
              isInstructorCertifying={hit.curriculum.isInstructorCertifying}
              isWheelchairAccessible={hit.course.isWheelchairAccessible}
              lat={hit._geoloc.lat}
              latitude={latitude}
              lng={hit._geoloc.lng}
              longitude={longitude}
              price={hit.course.price}
              startTime={hit.dates.Day1_StartTime}
              state={hit.course.location.state}
              venue={hit.course.location.name}
            />
          ))}
      </div>
      <Link href="#">
        <a className={styles.link}>
          See all {totalHits} classes{' '}
          <FaChevronRight className={styles.icon} size={16} />
        </a>
      </Link>
    </>
  );
}
