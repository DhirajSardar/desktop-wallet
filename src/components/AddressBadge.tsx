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

import { ComponentPropsWithoutRef } from 'react'
import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'

import Badge from './Badge'

type AddressBadgeProps = ComponentPropsWithoutRef<typeof Badge> & {
  addressName: string
  opaqueBg?: boolean
}

const AddressBadge = ({ addressName, className, ...props }: AddressBadgeProps) => (
  <Badge className={className} rounded {...props}>
    {addressName}
  </Badge>
)

export default styled(AddressBadge)`
  ${({ color, opaqueBg, theme }) => {
    const usedColor = color || theme.font.secondary
    const isBright = tinycolor(usedColor).getBrightness() > 160

    return css`
      color: ${opaqueBg
        ? isBright
          ? theme.font.primary
          : theme.font.contrastPrimary
        : isBright
        ? tinycolor(usedColor).darken(5).toString()
        : usedColor};
      background-color: ${({ theme }) =>
        opaqueBg
          ? tinycolor(usedColor).setAlpha(0.8).toString()
          : theme.name === 'dark'
          ? tinycolor(usedColor).setAlpha(0.08).toString()
          : tinycolor(usedColor).setAlpha(0.1).toString()};
      padding: 6px 10px;
    `
  }}
`
