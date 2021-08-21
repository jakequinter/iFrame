import { getDistanceFromLatLng } from 'src/utils/getLatLngDistance';
import OccurrenceCard from './OccurrenceCard';

import { Hit } from 'src/types/algolia/hits';

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
  const hitsWithDistance = hits.map(hit => ({
    ...hit,
    distance: getDistanceFromLatLng(
      hit._geoloc.lat,
      hit._geoloc.lng,
      latitude as number,
      longitude as number
    ),
  }));

  return (
    <>
      <div className={styles.container}>
        {hitsWithDistance.length > 0 ? (
          hitsWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 20)
            .map(hit => (
              <OccurrenceCard
                key={hit.objectID}
                averageReviewRating={hit.instructor.averageReviewRating}
                city={hit.course.location.city}
                courseName={hit.course.name}
                courseId={hit.course.guid}
                distance={hit.distance}
                grantsCCW={hit.course.grantsCCW}
                hasLiveFire={hit.course.hasLiveFire}
                imageUrl={hit.course.imageUrl}
                instructorGuid={hit.instructor.guid}
                instructorName={hit.instructor.name}
                isInstructorCertifying={hit.curriculum.isInstructorCertifying}
                isWheelchairAccessible={hit.course.isWheelchairAccessible}
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
