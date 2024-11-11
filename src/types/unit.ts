import { MarkerState } from "./marker";

export type UnitsState = UnitState[]

export interface UnitState extends MarkerState {
  type: UnitTypes;
  callsign: UnitCallsigns;
  mission: UnitMoves;
  condition: UnitConditions;
  ammunition: UnitAmmunition;
}

export type UnitTypes = typeof allUnitTypes[number]
export type UnitCallsigns = typeof allUnitCallsigns[number]
export type UnitMoves = typeof allUnitMoves[number]
export type UnitConditions = typeof allUnitConditions[number]
export interface UnitAmmunition {
  type: typeof allUnitAmmunitionTypes[number];
  quantity: number;
}

export const allUnitTypes = ["Antitank/Antiarmor", "Infantry", "Motorized", "Air Defense", "Special Forces"]
export const allUnitCallsigns = ["Alpha-1", "Bravo-2", "Charlie-3"]
export const allUnitMoves = ["Move", "In-Action", "Waiting", "Defend", "Attack", "Patrol", "Hold Position", "Retreat"]
export const allUnitConditions = ["Operational", "Damaged", "Heavily Damaged", "Destroyed"]
export const allUnitAmmunitionTypes = ["Standard", "Armor Piercing", "High Explosive", "Incendiary", "Smoke"]