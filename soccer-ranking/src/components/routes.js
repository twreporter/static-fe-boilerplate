import Home from './home'
import Result from './result'
import Selection from './selection'
import Manual from './manual'

const routes = {
  home: {
    path: '/home',
    Component: Home,
  },
  manual: {
    path: '/manual',
    Component: Manual,
  },
  selection: {
    path: '/selection',
    Component: Selection,
  },
  result: {
    path: '/result',
    Component: Result,
  },
}

export default routes
