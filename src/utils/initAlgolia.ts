import algoliasearch from 'algoliasearch/lite';

import { AlgoliaResponse } from 'src/types/algolia/response'
import { Hit } from 'src/types/algolia/hits'

export async function initAlgolia(type: 'instructor' | 'curriculum', id: string, lat?: string, lng?: string) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

  const res: AlgoliaResponse = await index.search('', {
    filters: type === 'curriculum' ? `curriculum.abbreviation:${id}` : `instructor.userId:${id}`,
    aroundLatLng: lat && lng ? `${lat}, ${lng}` : '',
    aroundRadius: 160934, // 100 miles
    // hitsPerPage: 50,
  });

  return await res.hits;
}

export async function getAlgoliaParameters() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

  const res: AlgoliaResponse = await index.search('', {
    hitsPerPage: 100,
  });

  return await res.hits;
}

export async function getTotalClasses(type: 'instructor' | 'curriculum', id: string,) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

  const res = await index.search('', {
    filters: type === 'curriculum' ? `curriculum.abbreviation:${id}` : `instructor.userId:${id}`
  });

  return await res.nbHits;
}
