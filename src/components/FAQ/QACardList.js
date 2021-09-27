import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import QACard from './QACard'

const QACardList = ({}) => {
  const cards = useStaticQuery(query)
    .qaCards.edges.slice()
    .sort((a, b) => (a.order > b.order ? -1 : 1))
  return (
    <div css={QACardListContainer}>
      {cards.map(edge => (
        <QACard
          key={edge.node.frontmatter.order}
          question={edge.node.frontmatter.question}
          answer={edge.node.frontmatter.answer}
        />
      ))}
    </div>
  )
}

const QACardListContainer = css`
  display: flex;
  flex-wrap: wrap;
`

export default QACardList

export const query = graphql`
  query QACardQuery {
    qaCards: allMarkdownRemark(
      filter: { 
        fileAbsolutePath: { regex: "/qa-/" },
        frontmatter:{
          question: {
            ne:null
          }
        }
     }
    ) {
      edges {
        node {
          frontmatter {
            question
            answer
            order
          }
        }
      }
    }
  }
`
