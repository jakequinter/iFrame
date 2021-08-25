import algoliasearch from 'algoliasearch/lite';

import { AlgoliaResponse } from 'src/types/algolia/response'
import { TYPE } from 'src/types/algolia/type'

const handleFilters = (type: TYPE, id: string) => {
  switch (type) {
    case TYPE.curriculum:
      return `curriculum.abbreviation:${id}`;
    case TYPE.organization:
      return `course.organizationId:${id}`;
    case TYPE.instructor:
      return `instructor.userId:${id}`;
    default:
      return `instructor.userId:${id}`;
  }
}

export async function initAlgolia(type: TYPE, id: string, lat?: string, lng?: string) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

  const res: AlgoliaResponse = await index.search('', {
    filters: handleFilters(type, id),
    aroundLatLng: lat && lng ? `${lat}, ${lng}` : '',
    aroundRadius: 160934, // 100 miles
    hitsPerPage: 1000
  });

  return await res.hits;
}