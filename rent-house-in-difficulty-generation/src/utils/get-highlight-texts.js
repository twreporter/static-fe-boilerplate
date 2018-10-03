import React from 'react'
 
export default function highlight(texts) {
  const reg = /(\*\*.*?\*\*)/
  if(!texts) return 
  const highlightedTexts = (texts.indexOf('**') > -1) ? texts.split(reg) : texts
  if (Array.isArray(highlightedTexts) && highlightedTexts.length > 0) {
    return highlightedTexts.map((segment, textIndex) => {
      if (segment.indexOf('**') > -1) {
        return <span key = {
          `highlight-${textIndex}`
        } > {
          segment.slice(2, -2)
        } </span>
      }
      return segment
    })
  }
  return highlightedTexts
}
