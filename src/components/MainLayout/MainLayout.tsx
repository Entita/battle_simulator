import React from 'react'
import { MainLayoutPanelsWrapperStyled, MainLayoutWrapperStyled } from './MainLayout.style'
import MapPanel from './MapPanel/MapPanel'
import ControlsPanel from './ControlsPanel/ControlsPanel'
import InfoPanel from './InfoPanel/InfoPanel'
import LogPanel from './LogPanel/LogPanel'
import { useAppSelector } from '@/lib/hooks/hooks'
import { UnitsState } from '@/types/unit'
import { MarkersState } from '@/types/marker'

export default function MainLayout({ markers, units }: { markers: MarkersState; units: UnitsState }) {
  const unitsRef = React.useRef(units);
  const [selectedUnitId, setSelectedUnitId] = React.useState<number | null>(null)
  const unitInfo = React.useMemo(() => unitsRef.current.find(unit => unit.id === selectedUnitId) || null, [units, selectedUnitId]) // Have to make units reference otherwise the constrant won't update inside this function
  const layout = useAppSelector(state => state.layout)

  const changeUnitInfo = (id: number) => setSelectedUnitId(id)

  React.useEffect(() => {
    // Updating the reference based on units
    unitsRef.current = units
  }, [units])

  return (
    <MainLayoutWrapperStyled $panelsPosition={layout.panels}>
      <MapPanel markers={markers} changeUnitInfo={changeUnitInfo} />
      <MainLayoutPanelsWrapperStyled>
        <ControlsPanel />
        <InfoPanel unitInfo={unitInfo} />
        <LogPanel />
      </MainLayoutPanelsWrapperStyled>
    </MainLayoutWrapperStyled>
  )
}
