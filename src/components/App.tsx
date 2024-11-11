"use client"

import React from 'react'
import MenuBar from './MenuBar/MenuBar'
import MainLayout from './MainLayout/MainLayout'
import { AppWrapperStyled } from './App.style'
import { useAppSelector } from '@/lib/hooks/hooks'
import { socket } from '@/socket'
import { MarkersState } from '@/types/marker'
import { UnitsState } from '@/types/unit'

export default function App() {
  const [isConnected, setIsConnected] = React.useState<Boolean>(false)
  const [markers, setMarkers] = React.useState<MarkersState>([])
  const [units, setUnits] = React.useState<UnitsState>([])
  const layout = useAppSelector(state => state.layout)

  React.useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    const initData = (data: { markers: MarkersState, units: UnitsState }) => {
      setMarkers(data.markers)
      setUnits(data.units)
    }

    if (socket.connected) onConnect()

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on('simulation_init', initData)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("simulation_init", initData)
    }
  }, [])

  if (!isConnected) return <>Loading</>

  return (
    <AppWrapperStyled $menuBarPosition={layout.menuBar}>
      <MenuBar />
      <MainLayout markers={markers} units={units} />
    </AppWrapperStyled>
  )
}
