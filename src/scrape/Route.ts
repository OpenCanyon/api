import {Feature, LineString} from '@turf/helpers';
import {AdditionalRisk} from './parseAdditionalRisk';
import {Difficulty} from './parseDifficulty';
import {Month} from './parseMonths';
import {Sport} from './parseSports';
import {Time} from './parseTime';

export interface Route {
  URL: string;
  Name: string;
  Quality: number;
  Popularity: number | undefined;
  Latitude: number;
  Longitude: number;
  Months: Month[];
  Difficulty: Difficulty | undefined;
  CanyonWaterGrade: 'a' | 'b' | 'c' | undefined;
  CanyonTechGrade: 1 | 2 | 3 | 4 | undefined;
  AdditionalRisk: AdditionalRisk | undefined;
  Vehicle: string | undefined;
  Shuttle: string | undefined;
  Permits: string | undefined;
  Sports: Sport[];
  Time: Time | undefined;
  RappelCountMin: number | undefined;
  RappelCountMax: number | undefined;
  RappelLengthMax: number | undefined;
  KMLURL: string | undefined;
  HTMLDescription: string;
  GeoJSON: Feature<LineString, {}> | undefined;
}
