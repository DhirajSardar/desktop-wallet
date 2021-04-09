import { motion, Variants } from 'framer-motion'
import React, { FC } from 'react'
import styled from 'styled-components'

export const SectionContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  height: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 8vw;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  shown: (apparitionDelay = 0) => ({
    opacity: 1,
    transition: {
      delay: apparitionDelay,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  })
}

interface ContentProps {
  apparitionDelay?: number
}

export const Content: React.FC<ContentProps> = ({ children, apparitionDelay }) => {
  return (
    <StyledContent variants={contentVariants} initial="hidden" animate="shown" custom={apparitionDelay}>
      {children}
    </StyledContent>
  )
}

export const StyledContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

interface SectionTitleProps {
  color: 'primary' | 'contrast'
}

export const SectionTitle: FC<SectionTitleProps> = ({ color, children }) => {
  return (
    <H1 color={color} layoutId="sectionTitle">
      {children}
    </H1>
  )
}

const H1 = styled(motion.h1)<{ color: string }>`
  color: ${({ theme, color }) => (color === 'primary' ? theme.font.primary : theme.font.contrast)};
`
