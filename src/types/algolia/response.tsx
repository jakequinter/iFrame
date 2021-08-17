import { Hit } from './hits';

export type AlgoliaResponse = {
  hits: Array<Hit>;
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
};
