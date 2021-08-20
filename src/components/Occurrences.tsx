import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

import { Hit } from 'src/types/algolia/hits';
import OccurrenceCard from './OccurrenceCard';

import styles from 'src/styles/Occurrences.module.scss';

type Occurrences = {
  hits: Array<Hit>;
  latitude: number | undefined;
  longitude: number | undefined;
};

export default function Occurrences({
  hits,
  latitude,
  longitude,
}: Occurrences) {
  return (
    <>
      <div className={styles.container}>
        {hits.length > 0 ? (
          hits.map(hit => (
            <OccurrenceCard
              key={hit.objectID}
              averageReviewRating={hit.instructor.averageReviewRating}
              city={hit.course.location.city}
              courseName={hit.course.name}
              grantsCCW={hit.course.grantsCCW}
              hasLiveFire={hit.course.hasLiveFire}
              imageUrl={hit.course.imageUrl}
              instructorGuid={hit.instructor.guid}
              instructorName={hit.instructor.name}
              isInstructorCertifying={hit.curriculum.isInstructorCertifying}
              isWheelchairAccessible={hit.course.isWheelchairAccessible}
              lat={hit._geoloc.lat}
              latitude={latitude ? latitude : 0}
              lng={hit._geoloc.lng}
              longitude={longitude ? longitude : 0}
              price={hit.course.price}
              startTime={hit.dates.Day1_StartTime}
              state={hit.course.location.state}
              venue={hit.course.location.name}
            />
          ))
        ) : (
          <p className={styles.noResults}>
            There are currently no classes being offered within 100 miles of
            this location.
          </p>
        )}
      </div>
    </>
  );
}
