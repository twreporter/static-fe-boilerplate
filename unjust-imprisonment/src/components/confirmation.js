import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import screen from '../screen'
import theme from '../theme'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(115, 115, 115, 0.8);
`

const Dialog = styled.div`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 75px 60px 58px 60px;
  background-color: white;
  text-align: center;
  ${screen.mobileOnly`
    width: 100%;
    padding: 47px 17px 37px 17px;
  `}
`

const Content = styled.div`
  width: 100%;
  margin-bottom: 52px;
`

const FunctionButton = styled.button`
  cursor: pointer;
  font-weight: ${theme.typography.font.weight.bold};
  font-size: ${theme.typography.font.size.large};
  padding: 10px 50px;
  border-radius: 40px;
  background-color: white;
  ${screen.mobileOnly`
    font-size: ${theme.typography.font.size.medium};
  `}
`

const Cancel = FunctionButton.extend`
  border: solid 2px #4A4949;
  margin-right: 25px;
`

const Confirm = FunctionButton.extend`
  border: solid 2px #A67A44;
  color: #A67A44;
`
const Text = styled.span`
  letter-spacing: 2.6px;
  font-size: ${theme.typography.font.size.xlarge};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: 1.5;
  ${screen.mobileOnly`
    font-size: ${theme.typography.font.size.medium};
  `}
`

class Confirmation extends React.PureComponent {
  render() {
    const { contentText, cancelText, confirmText, onCancel, onConfirm } = this.props
    return (
      <Container>
        <Dialog>
          <Content>
            <Text>
              {contentText}
            </Text>
          </Content>
          <React.Fragment>
            {cancelText ?
              <Cancel onClick={onCancel}>
                {cancelText}
              </Cancel> : null
            }
            <Confirm onClick={onConfirm}>
              {confirmText}
            </Confirm>
          </React.Fragment>
        </Dialog>
      </Container>
    )
  }
}

Confirmation.defaultProps = {
  cancelText: '',
  confirmText: '是',
  contentText: '',
  onCancel: () => {},
}

Confirmation.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  contentText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
}
export default Confirmation
