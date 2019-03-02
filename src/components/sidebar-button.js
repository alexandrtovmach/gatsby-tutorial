import React from "react"
import styled from "styled-components"

import { colors } from "../utils/vars"
import chevronSvg from "../images/chevron.svg"

const Button = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.main};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;
`

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin: 0;
  transition: 0.3s;
`

const rotated180 = `
  transform: rotateZ(180deg);
`

const rotated90 = `
  transform: rotateZ(90deg);
`

const SidebarButton = ({ styles, onClick }) => (
  <Button css={[rotated90, styles]} onClick={onClick}>
    <Icon src={chevronSvg} css={rotated180} />
    <Icon src={chevronSvg} />
  </Button>
)

export default SidebarButton