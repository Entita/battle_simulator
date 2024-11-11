export interface LogsState {
  value: LogState[];
}

export interface LogState {
  time: string;
  description: string;
}