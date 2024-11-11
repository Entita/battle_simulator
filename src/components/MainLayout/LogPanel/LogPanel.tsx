import React from 'react'
import { LogPanelWrapperStyled } from './LogPanel.style'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { LogState } from '@/types/log'
import { socket } from '@/socket'
import { setLogs } from '@/lib/slices/logSlice'

export default function LogPanel() {
  const logs = useAppSelector(state => state.logs.value)

  const dispatch = useAppDispatch()

  const setLog = (log: LogState) => {
    dispatch(setLogs(log))
  }

  React.useEffect(() => {
    // timestamps_get event just in case there is connection, but no event comes in so timestamps would be empty (low probability)
    socket.on('logs_update', setLog)
    socket.emit('logs_get')
  }, [socket])

  return (
    <LogPanelWrapperStyled>
      <h2>Log</h2>
      <div>
        {logs.map((log: LogState, logIndex: number) => (
          <span key={logIndex}>{`${log.time} ${log.description}`}</span>
        ))}
      </div>
    </LogPanelWrapperStyled>
  )
}
