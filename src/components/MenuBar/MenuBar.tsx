import React from 'react'
import { MenuBarWrapperStyled } from './MenuBar.style'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import { layoutPositions, layoutVariants } from '@/types/layout'
import { changeMenuBarPosition, changePanelsPosition } from '@/lib/slices/layoutSlice'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/zoom.css'
import { socket } from '@/socket'

export default function MenuBar() {
  const resetSimulation = () => {
    socket.emit('timestamps_reset')
    socket.emit('logs_reset')
  }

  return (
    <MenuBarWrapperStyled>
      <Menu menuButton={<li>File</li>}>
        <MenuItem onClick={resetSimulation}>Reset sim</MenuItem>
      </Menu>
      <Menu menuButton={<li>Edit</li>} />
      <Menu menuButton={<li>View</li>}>
        <SubMenu label="Menu bar">
          <MenuItemCustom layoutKey='menuBar' position='top' />
          <MenuItemCustom layoutKey='menuBar' position='left'  />
          <MenuItemCustom layoutKey='menuBar' position='right'  />
          <MenuItemCustom layoutKey='menuBar' position='bottom'  />
        </SubMenu>
        <SubMenu label="Panels">
          <MenuItemCustom layoutKey='panels' position='top' />
          <MenuItemCustom layoutKey='panels' position='left'  />
          <MenuItemCustom layoutKey='panels' position='right'  />
          <MenuItemCustom layoutKey='panels' position='bottom'  />
        </SubMenu>
      </Menu>
    </MenuBarWrapperStyled>
  )
}

const MenuItemCustom = ({ layoutKey, position }: { layoutKey: layoutVariants, position: layoutPositions }) => {
  const layout = useAppSelector(state => state.layout)
  const className = layout[layoutKey] === position ? 'menu-bar-selected' : ''
  const dispatch = useAppDispatch()

  const changeLayout = () => {
    if (layoutKey === 'menuBar') dispatch(changeMenuBarPosition(position))
    else dispatch(changePanelsPosition(position))
  }

  return (
  <MenuItem onClick={changeLayout} className={className}>{position}</MenuItem>
)
}
