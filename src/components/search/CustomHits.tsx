import { connectStateResults } from 'react-instantsearch-dom';

import OccurrenceCard from '../OccurrenceCard';

type CustomHits = {
  searchState: any;
  searchResults: any;
};

function CustomHits({ searchState, searchResults }: CustomHits) {
  const validQuery = searchState.query?.length >= 3;

  console.log(searchResults?.hits);

  return (
    <>
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
    </>
  );
}

export default connectStateResults(CustomHits);
