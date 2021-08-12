import algoliasearch from 'algoliasearch/lite';

export async function initAlgolia() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const index = searchClient.initIndex('DEV_occurrences');

  const res = await index.search('', {
    hitsPerPage: 100,
  });

  return await res.hits;
}
