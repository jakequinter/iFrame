import { Hit } from '../../src/types/algolia/hits';
import OccurrenceCard from './OccurrenceCard';

import styles from '../../styles/Occurrences.module.scss';

type Occurrences = {
  hits: Array<Hit>;
  latitude: number;
  longitude: number;
};

export default function Occurrences({
  hits,
  latitude,
  longitude,
}: Occurrences) {
  return (
    <div className={styles.container}>
      {hits &&
        hits.map(hit => (
          <OccurrenceCard
            key={hit.objectID}
            courseName={hit.course.name}
            instructorName={hit.instructor.name}
            startTime={hit.dates.Day1_StartTime}
            price={hit.course.price}
            venue={hit.course.location.name}
            city={hit.course.location.city}
            state={hit.course.location.state}
            lat={hit._geoloc.lat}
            lng={hit._geoloc.lng}
            latitude={latitude}
            longitude={longitude}
          />
        ))}
    </div>
  );
}
