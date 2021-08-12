// @flow

type Match = {
  fullyHighlighted?: boolean;
  matchLevel: string;
  matchedWords: Array<string>;
  value: string;
};

type Hit = {
  admin_level: number;
  administrative: Array<string>;
  country: string;
  country_code: string;
  county: Array<string>;
  importance: number;
  is_city: boolean;
  is_country: boolean;
  is_highway: boolean;
  is_popular: boolean;
  is_suburb: boolean;
  locale_names: Array<string>;
  objectID: string;
  population: number;
  postcode: Array<string>;
  _geoloc: {
    lat: number;
    lng: number;
  };
  _highlightResult: {
    administrative: Array<Match>;
    country: Match;
    county: Array<Match>;
    locale_names: Array<Match>;
    postcode: Array<Match>;
  };
  _tags: Array<string>;
};

export type RawAnswer = {
  degradedQuery: boolean;
  hits: Array<Hit>;
  nbHits: number;
  params: string;
  processingTimeMS: number;
  query: string;
};

export type AlgoliaPlacesSuggestion = {
  type: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  administrative: string;
  county: string;
  suburb: string;
  latlng: {
    lat: number;
    lng: number;
  };
  postcode: string;
  value: string;
  highlight: {};
};
