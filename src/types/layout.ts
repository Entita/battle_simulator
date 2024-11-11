export interface LayoutState {
  menuBar: layoutPositions;
  panels: layoutPositions;
}

export type layoutVariants = 'menuBar' | 'panels'
export type layoutPositions = 'left' | 'right' | 'top' | 'bottom'