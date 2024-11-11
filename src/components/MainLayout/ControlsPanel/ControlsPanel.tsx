import React from 'react'
import { ControlsContentWrapperStyled, ControlsPanelWrapperStyled, ControlStyled, ControlsWrapperStyled } from './ControlsPanel.style'
import { ControlsState, StopWatchArrayState, StopWatchState, TimestampsState } from '@/types/controls'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { socket } from '@/socket'
import { setTimestamps } from '@/lib/slices/timestampSlice'

const getNewTimestamp = () => new Date().getTime()

const calculateRunningTimestamp = (timestamps: StopWatchArrayState) => {
  var sumTimestamp = 0
    timestamps.forEach((timeStamp: StopWatchState, timestampIndex: number) => {
      if (timeStamp.state === 'playing') {
        if (timestampIndex === timestamps.length - 1) {
          // is still playing
          const thisTimestamp = timeStamp.timestamp
          const nextTimestamp = getNewTimestamp()
          const differenceTime = nextTimestamp - thisTimestamp
          sumTimestamp += differenceTime
        } else {
          // timestamp was paused
          const thisTimestamp = timeStamp.timestamp
          const nextTimestamp = timestamps[timestampIndex + 1].timestamp
          const differenceTime = nextTimestamp - thisTimestamp
          sumTimestamp += differenceTime
        }
      }
    })
    return sumTimestamp
}

export default function ControlsPanel() {
  // for timer precision I'm saving every timer action (pausing & plaiyng) & based of that I'm calculating accurate time how long was the simulation running
  // but because I'm using React I need to update the timer (every 10ms) so user can see the timer changing
  // const [timestamps, setTimestamps] = React.useState<TimestampsState | null>(null)
  const timestamps = useAppSelector(state => state.timestamps)
  const logs = useAppSelector(state => state.logs.value)
  const [formattedTimer, setFormattedTimer] = React.useState(formatTimer())

  const dispatch = useAppDispatch()

  const changeState = (newState: ControlsState) => {
    // if stopped the timer, user can't interact anymore
    if (timestamps.state === newState || timestamps.state === 'stopped') return
    changeTimestamp(newState)
  }

  function formatTimer () {
    // format all timestamps (calculate how many milliseconds the sim was actually playing) and output in this format: "00:00:00"
    const formatTime = (time: number) => time.toString().padStart(2, '0')

    const millisecondsRunning = calculateRunningTimestamp(timestamps.value)
    const hours = Math.floor(millisecondsRunning / 3600000)
    const minutes = Math.floor((millisecondsRunning % 3600000) / 60000)
    const seconds = Math.floor((millisecondsRunning % 60000) / 1000)

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
  }

  const setTimestamp = (initTimestamps: TimestampsState) => {
    dispatch(setTimestamps(initTimestamps))
  }

  const changeTimestamp = (state: ControlsState) => {
    const newTimestamps = { state, value: [...timestamps.value, { state, timestamp: getNewTimestamp() }] }
    const newLog = { time: `[${formattedTimer}]`, description: `Sim ${logs.length === 0 ? 'starting' : state}` }
    socket.emit('timestamps_update', newTimestamps)
    socket.emit('logs_update', newLog)
  }

  React.useEffect(() => {
    // timestamps_get event just in case there is connection, but no event comes in so timestamps would be empty (low probability)
    socket.on('timestamps_update', setTimestamp)
    socket.emit('timestamps_get')
  }, [socket])

  React.useEffect(() => {
    var interval = setInterval(() => {
      const timer = formatTimer()
      setFormattedTimer(timer)
    }, 10)

    return () => clearInterval(interval)
  }, [timestamps])

  return (
    <ControlsPanelWrapperStyled>
      <h2>Simulation state</h2>
      <ControlsContentWrapperStyled>
        <ControlsWrapperStyled>
          <ControlStyled onClick={() => changeState('playing')}><Image src='/img/play.png' alt='play button' width={32} height={32} /></ControlStyled>
          <ControlStyled onClick={() => changeState('paused')}><Image src='/img/play_pause.png' alt='play/pause button' width={32} height={32} /></ControlStyled>
          <ControlStyled onClick={() => changeState('stopped')}><Image src='/img/stop.png' alt='stop button' width={32} height={32} /></ControlStyled>
        </ControlsWrapperStyled>
        <span>State:
          <b> {timestamps.state}</b>
        </span>
        <span>Current time:</span>
        <h3>{formattedTimer}</h3>
      </ControlsContentWrapperStyled>
    </ControlsPanelWrapperStyled>
  )
}
