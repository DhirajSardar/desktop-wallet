/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { motion, Transition } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

interface ToggleProps {
  toggled: boolean
  onToggle: (value: boolean) => void
  className?: string
  disabled?: boolean
  ToggleIcons?: [LucideIconType, LucideIconType]
  handleColors?: [string, string]
}

const Toggle = ({ toggled, onToggle, className, disabled, ToggleIcons, handleColors }: ToggleProps) => {
  const theme = useTheme()
  const [toggleWidth, setToggleWidth] = useState(0)
  const [ToggleIconRight, ToggleIconLeft] = ToggleIcons ?? [undefined, undefined]

  const toggleBackgroundVariants = {
    off: { backgroundColor: theme.bg.tertiary },
    on: { backgroundColor: handleColors ? theme.bg.tertiary : theme.global.accent }
  }

  const handleContainerVariants = {
    off: { left: 0 },
    on: { left: toggleWidth / 2 }
  }

  const handleVariants = {
    off: { backgroundColor: handleColors?.[0] ?? 'var(--color-white)' },
    on: { backgroundColor: handleColors?.[1] ?? 'var(--color-white)' }
  }

  useEffect(() => {
    setToggleWidth(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--toggleWidth')))
  }, [])

  const toggleState = toggled ? 'on' : 'off'

  const transition: Transition = { duration: 0.2, type: 'tween' }

  const onClick = () => {
    if (!disabled) {
      onToggle(!toggled)
    }
  }

  const getToggleIconColor = (isActive: boolean) => (isActive ? 'var(--color-white)' : theme.font.tertiary)

  return (
    <StyledToggle
      onClick={onClick}
      className={className}
      toggled={toggled}
      variants={toggleBackgroundVariants}
      animate={toggleState}
      transition={transition}
      disabled={disabled}
    >
      {ToggleIconRight && ToggleIconLeft && (
        <ToggleContent>
          <ToggleIconContainer>
            <ToggleIconRight color={getToggleIconColor(!toggled)} size={16} className="toggle-icon" strokeWidth={2} />
          </ToggleIconContainer>
          <ToggleIconContainer>
            <ToggleIconLeft color={getToggleIconColor(toggled)} size={16} className="toggle-icon" strokeWidth={2} />
          </ToggleIconContainer>
        </ToggleContent>
      )}
      <ToggleHandleContainer variants={handleContainerVariants} animate={toggleState} transition={transition}>
        <ToggleHandle variants={handleVariants} animate={toggleState} transition={transition} />
      </ToggleHandleContainer>
    </StyledToggle>
  )
}

export const StyledToggle = styled(motion.div)<Omit<ToggleProps, 'onToggle'>>`
  position: relative;
  display: flex;
  align-items: center;
  width: var(--toggleWidth);
  height: calc(var(--toggleWidth) / 2);
  border-radius: var(--toggleWidth);
  overflow: hidden;
  cursor: pointer;
  box-sizing: content-box;

  svg {
    cursor: pointer;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`

const ToggleHandleContainer = styled(motion.div)`
  position: absolute;
  width: calc(var(--toggleWidth) / 2);
  height: calc(var(--toggleWidth) / 2);
  z-index: 0;
  padding: 2px;
`

const ToggleHandle = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--toggleWidth);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`

const ToggleContent = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 1;
`

const ToggleIconContainer = styled.div`
  width: 50%;
  display: flex;

  .toggle-icon {
    margin: auto;
  }
`
export default Toggle
