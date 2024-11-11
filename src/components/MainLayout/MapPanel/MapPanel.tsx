import React from 'react'
import { MapPanelWrapperStyled } from './MapPanel.style'
import OLMap from './OLMap'
import { MarkersState } from '@/types/marker';

export default function MapPanel({ markers, changeUnitInfo }: { markers: MarkersState; changeUnitInfo: Function }) {
  return (
    <MapPanelWrapperStyled>
      <OLMap markers={markers} changeUnitInfo={changeUnitInfo} />
    </MapPanelWrapperStyled>
  )
}
