import React from 'react'
import routes from './routes'
import styled, { css, injectGlobal } from 'styled-components'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'
// import { containerMaxWidth } from '../constants/style'

const fontWeightRenderingFix = `
  text-rendering: optimizeLegibility;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    ${fontWeightRenderingFix}
    width: 100%;
    margin: 0;
    background: #58882d;
    color: #f1f1f1;
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`

const pageTransDuration = 500

const transitionStyles = {
  default: css`
    opacity: 0;
  `,
  entering: css`
    opacity: 0;
  `,
  entered: css`
    opacity: 1;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #58882d;
  position: relative;
`

const Page = styled.div`
  position: absolute;
  width: 100%;
  transition: opacity ${pageTransDuration}ms ease-out;
  ${props => (!props.status ? transitionStyles.default : transitionStyles[props.status])}
`

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: routes.home.path,
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.page !== prevState.page) {
      if (typeof window !== 'undefined') {
        const scrollTo = window.scroll || window.scrollTo
        setTimeout(() => scrollTo(0, 0), pageTransDuration)
      }
    }
  }

  _selectPage(propsKey = 'home', pageProps) {
    const matchedRoute = routes[propsKey]
    const PageContent = matchedRoute.Component
    return (
      <Transition key={propsKey} timeout={pageTransDuration} component={null}>
        {status => (
          <Page status={status}>
            <PageContent {...pageProps} goTo={this.goTo} />
          </Page>
        )}
      </Transition>
    )
  }
  goTo = (page, pageProps, pagePropsKey = '') => {
    const propsKey = page.replace('/', '')
    if (pageProps) {
      return this.setState({
        page,
        [pagePropsKey || propsKey]: pageProps,
      })
    }
    return this.setState({
      page,
    })
  }
  render() {
    const { page } = this.state
    const propsKey = page.replace('/', '')
    const pageProps = this.state[propsKey]
    return (
      <Container>
        <TransitionGroup componet={null}>
          {this._selectPage(propsKey, pageProps)}
        </TransitionGroup>
      </Container>
    )
  }
}
