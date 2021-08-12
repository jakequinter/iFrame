import { connectStateResults } from 'react-instantsearch-dom';

import OccurrenceCard from '../OccurrenceCard';

import styles from '../../../styles/CustomHits.module.scss';

type CustomHits = {
  searchState: any;
  searchResults: any;
};

function CustomHits({ searchState, searchResults }: CustomHits) {
  const validQuery = searchState.query?.length >= 3;

  console.log(searchResults?.hits);

  return (
    <div className={styles.container}>
      {searchResults?.hits.length === 0 && validQuery && (
        <p style={{ color: 'white' }}>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.map(hit => (
        <OccurrenceCard
          key={hit.objectID}
          courseName={hit.course.name}
          instructorName={hit.instructor.name}
          startTime={hit.dates.Day1_StartTime}
          price={hit.course.price}
          venue={hit.course.location.name}
          city={hit.course.location.city}
          state={hit.course.location.state}
        />
      ))}
    </div>
  );
}

export default connectStateResults(CustomHits);
