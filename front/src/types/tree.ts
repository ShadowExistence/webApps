import type { Location } from '@/types/location'
import type { Sensor } from './sensor'
export interface Tree {
  id: string,
  name: string,
  descritpion: string,
  location: Location,
  img_url: string,
  sensors: Sensor[],
}