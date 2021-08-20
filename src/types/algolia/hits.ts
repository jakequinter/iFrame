export type Hit = {
  objectID: string;
  guid: string;
  isMultiday: boolean;
  startsAt: string;
  startsAtTimestamp: number;
  endsAt: string;
  endsAtTimestamp: number;
  course: Course;
  curriculum: Curriculum;
  dates: Dates;
  instructor: Instructor;
  _geoloc: GeoLoc;
};

type Location = {
  address1: string;
  address2: string;
  city: string;
  name: string;
  postalCode: string;
  state: string;
  stateAbbr: string;
};

type Course = {
  canPurchase: boolean;
  canRegister: boolean;
  capacity: number;
  classroomHours: number;
  description: string;
  environment: string;
  grantsCCW: boolean;
  guid: string;
  hasLiveFire: true;
  imageUrl: string;
  isWheelchairAccessible: true;
  isWomensOnly: boolean;
  location: Location;
  name: string;
  organizationId: string;
  price: number;
  rangeHourse: number;
};

type Curriculum = {
  abbreviation: string;
  displayName: string;
  isInstructorCertifying: boolean;
  isModule: boolean;
  moduleName: string;
};

type Dates = {
  Day1_EndTime: string;
  Day1_StartTime: string;
};

type Instructor = {
  averageReviewRating: number;
  guid: string;
  imageUrl: string;
  name: string;
  totalReviewCount: number;
  userId: string;
};

type GeoLoc = {
  lat: number;
  lng: number;
};
