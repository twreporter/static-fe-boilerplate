import styled from 'styled-components'
import theme from '../utils/theme'

const StyledLink = styled.a`
  display: inline;
  text-decoration: none;
  border-bottom: 1px solid ${theme.colors.primary};
  transition: color .3s ease-in-out;
  color: ${theme.colors.text.paragraph};
  &:hover {
    color: ${theme.colors.primary}
  }
`


export default StyledLink
