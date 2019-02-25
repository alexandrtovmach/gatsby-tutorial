import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { colors } from "../utils/vars"

const Sidebar = styled.section`
  position: fixed;
  left: 0;
  width: 20%;
  height: 100%;
  padding: 4em 1em 1em 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.second};
  color: ${colors.textMain};
`

const navItem = `
  display: flex;
  align-items: center;
  margin-left: 1em;
  padding: 0.5em 0;
  border-bottom: 0.05em solid ${colors.main25};
  postion: relative;
  color: ${colors.textBody};
  text-decoration: none;
  transition: 0.5s;

  &:before {
    content: '';
    transition: inherit;
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    left: 0.8em;
    border-radius: 50%;
    display: block;
    background-color: ${colors.main};
    transform: scale(0);
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${colors.main};
    &:before {
      transform: scale(1);
    }
  }
`

const GatsbyLogoLink = styled.a`
  width: 50%;
  > img {
    margin: 0;
  }
`

const AboutSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 70%;

  > a {
    color: inherit;
    margin-left: 0.3em;
  }
`

export default ({ locale }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulArticle(sort: {
          order: ASC,
          fields: orderNumber
        }) {
          edges {
            node {
              title,
              link,
              lang,
              orderNumber
            }
          }
        }
        allFile(filter: {extension: {eq: "svg"}}) {
          edges {
            node {
              publicURL,
              name
            }
          }
        }
      }
    `}
    render={({
      allContentfulArticle: {
        edges
      },
      allFile: {
        edges: files
      }
    }) => {
      const fileMap = files.reduce((prev, {node:{name, publicURL}}) => ({...prev, [name]: publicURL}), {});
      return (
        <Sidebar>
          <GatsbyLogoLink href="https://www.gatsbyjs.org">
            <img src={fileMap.gatsby} alt="gatsby logo" />
          </GatsbyLogoLink>
          <div>
            {
              edges.map(({
                node: {
                  title,
                  link,
                  lang,
                  orderNumber
                }
              }) => (
                locale === lang &&
                <Link activeStyle={{ color: colors.main, fontWeight: 800, }} to={`${locale}${link}`} key={link} css={navItem}>{orderNumber >= 0? `${orderNumber}. `: ``}{title}</Link>
              ))
            }
          </div>
          <AboutSection>
            Translated by <a href="https://alexandrtovmach.com" target="_blank">Alexandr Tovmach</a>
          </AboutSection>
        </Sidebar>
      )
    }}
  />

)
