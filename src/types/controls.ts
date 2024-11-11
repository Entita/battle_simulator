export type ControlsState = 'playing' | 'paused' | 'stopped'

export interface TimestampsState {
  value: StopWatchArrayState;
  state: ControlsState;
}

export type StopWatchArrayState = StopWatchState[]

export interface StopWatchState {
  timestamp: number;
  state: ControlsState;
}