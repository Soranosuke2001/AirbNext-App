"use client"

import React, { FC } from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container: FC<ContainerProps> = ({children}) => {
  return <div>{children}</div>
}

export default Container