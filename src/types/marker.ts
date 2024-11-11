import { UnitTypes } from "./unit";

export type MarkersState = MarkerState[]

export interface MarkerState {
  id: number,
  type: UnitTypes,
  location: LocationState,
  path: PathState[],
  speed: number,
}

export interface LocationState {
  lon: number,
  lat: number,
}

export interface PathState extends LocationState {
  reached: boolean,
}