import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SidebarButton from "./sidebar-button"
import { colors, queryPoints } from "../utils/vars"

const Sidebar = styled.section`
  position: fixed;
  left: 0;
  width: 16.8rem;
  height: 100%;
  padding-top: 5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.second};
  color: ${colors.textMain};
  border-right: 0.05em solid ${colors.main25};
  transition: 0.5s;
  overflow: auto;

  @media screen and (max-width: ${queryPoints.pc}) {
    width: 14rem;
  }
  @media screen and (max-width: ${queryPoints.mid}) {
    width: 100%;
    left: -100%;
  }
  @media screen and (max-width: ${queryPoints.small}) {
    padding-top: 7em;
  }
`

const navItem = `
  display: flex;
  align-items: center;
  margin-left: 2em;
  padding: 0.5em 1em 0.5em 0;
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

  @media screen and (max-width: ${queryPoints.mid}) {
    margin-left: 0;
    padding-left: 1em;
    &:before {
      display: block;
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
  width: 100%;
  font-size: 70%;
  padding: 1em 2.5em;

  a {
    color: inherit;
    margin-left: 0.3em;
  }

  @media screen and (max-width: ${queryPoints.mid}) {
    margin-left: 0;
    padding-left: 1em;
  }
`

const buttonStyle = `
  position: fixed;
  z-index: 20;
  bottom: 1em;
  right: 1em;
  display: none;


  @media screen and (max-width: ${queryPoints.mid}) {
    display: flex;
  }
`

const activeButtonStyle = `
  >img:nth-child(1) {
    transform: translateY(70%) rotateZ(180deg);
  }
  >img:nth-child(2) {
    transform: translateY(-70%);
  }
`

const showSidebar = `
  @media screen and (max-width: ${queryPoints.mid}) {
    left: 0;
  }
`

class SidebarComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      active: false
    };
  }

  render() {
    const {
      data: {
        allContentfulArticle: {
          edges
        },
        allFile: {
          edges: files
        }
      },
      locale
    } = this.props;
    const { active } = this.state;
    const fileMap = files.reduce((prev, {node:{name, publicURL}}) => ({...prev, [name]: publicURL}), {});
    return (
      <Sidebar css={active && showSidebar}>
        <SidebarButton
          styles={[buttonStyle, active && activeButtonStyle]}
          onClick={() => this.setState({ active: !active })}
        />
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
              <Link activeStyle={{ color: colors.main, fontWeight: 800 }} to={`${locale}${link}`} key={link} css={navItem}>{orderNumber >= 0? `${orderNumber}. `: ``}{title}</Link>
            ))
          }
        </div>
        <AboutSection>
          <div>This project on <a href="https://github.com/alexandrtovmach/gatsby-tutorial" target="_blank" rel="noopener noreferrer">GitHub</a></div>
          Translated by <a href="https://alexandrtovmach.com" target="_blank" rel="noopener noreferrer">Alexandr Tovmach</a>
        </AboutSection>
      </Sidebar>
    )
  }
}

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
    render={(data) => <SidebarComponent locale={locale} data={data} />}
  />

)
