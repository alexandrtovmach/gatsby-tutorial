import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { colors } from "../utils/vars"

const Header = styled.header`
  width: 100%;
  height: 3em;
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.main};
  color: ${colors.textSecond};
  padding: 0.5em
`

const langLink = `
  margin-left: 0.5em;
  color: inherit;
  opacity: 0.8;
  transition: 0.2s;
  font-size: 90%;
  
  &:hover {
    opacity: 1;
  }
`

const NameLink = styled.a`
  color: inherit;
  margin-right: 0.5em;
`

const Quote = styled.span`
  opacity: 0.8;
  font-size: 90%;
`

export default ({ text }) => (
  <Header>
    <div>
      <NameLink href="https://twitter.com/alexandrtovmach" target="_blank">
        @alexandrtovmach: 
      </NameLink>
      <Quote>
        {text || 'Nothing special, only header'}
      </Quote>
    </div>
    <div>
      <Link to="/ru" css={langLink} >
        RU
      </Link>
      <Link to="/ua" css={langLink} >
        UA
      </Link>
    </div>
  </Header>
)
