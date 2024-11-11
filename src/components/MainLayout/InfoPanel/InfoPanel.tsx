import React from 'react'
import { InfoPanelWrapperStyled } from './InfoPanel.style'
import { UnitState } from '@/types/unit'

export default function InfoPanel({ unitInfo }: { unitInfo: UnitState | null }) {
  return (
    <InfoPanelWrapperStyled>
      <h2>Unit info</h2>
      {unitInfo && (
        <div>
          <span>Type: {unitInfo.type}</span>
          <span>Callsign: {unitInfo.callsign}</span>
          <span>Position: {unitInfo.location.lat}N, {unitInfo.location.lon}E</span>
          <span>Current task: {unitInfo.mission}</span>
          <span>Damage condition: {unitInfo.condition}</span>
          <span>Ammunition: {unitInfo.ammunition.type} {unitInfo.ammunition.quantity}x</span>
        </div>
      )}
    </InfoPanelWrapperStyled>
  )
}
