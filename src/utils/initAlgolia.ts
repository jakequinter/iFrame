import algoliasearch from 'algoliasearch/lite';

export async function initAlgolia(type: 'instructor' | 'curriculum', id: string, lat?: string, lng?: string) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

// @TODO: filter by curriculum abbreviation
  const res = await index.search('', {
    filters: type === 'curriculum' ? `curriculum.abbreviation:${id}` : `instructor.userId:${id}`,
    aroundLatLng: lat && lng ? `${lat}, ${lng}` : '',
    aroundRadius: 160934, // 100 miles
    hitsPerPage: 100,
  });

  return await res.hits;
}

export async function getAlgoliaParameters() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX as string);

  const res = await index.search('', {
    hitsPerPage: 100,
  });

  return await res.hits;
}
