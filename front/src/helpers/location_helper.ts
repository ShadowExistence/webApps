import type { Location } from '@/types/location'

export function distance_points(A: Location, B: Location){

const latDif = A.latitude - B.latitude;
const longDiff = A.longitude - B.longitude;
return Math.sqrt(latDif*latDif + longDiff*longDiff);
}