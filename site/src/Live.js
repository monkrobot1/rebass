import React from 'react'
import styled from 'styled-components'
import { width } from 'styled-system'
import { connect } from 'refunk'
import {
  LiveProvider,
  LivePreview,
  LiveError,
  LiveEditor,
} from 'react-live'
import * as Rebass from 'rebass'
import {
  Flex,
  Box,
  Border,
  Relative,
  Absolute,
  theme
} from 'rebass'
import { photo } from './constants'

const { colors } = theme

const _scope = Object.assign({}, Rebass, { styled, photo })

const Editor = styled(LiveEditor)`
  font-family: 'SF Mono', 'Roboto Mono', Menlo, monospace;
  font-size: 13px;
  tab-size: 2;
  margin: 0;
  padding: 16px;
  color: ${colors.blue};
  outline: none;
  overflow: auto;
  max-height: 512px;
  ${width}
`

const Err = styled(LiveError)`
  font-family: 'SF Mono', Menlo, monospace;
  font-size: 13px;
  padding: 16px;
  color: white;
  background-color: red;
`

const toggle = key => state => ({
  [key]: !state[key]
})

const transform = src => `<React.Fragment>${src}</React.Fragment>`

const Live = props => {
  const {
    code,
    noInline
  } = props
  const scope = Object.assign({ toggle }, _scope, props)

  return (
    <LiveProvider
      code={code}
      noInline={noInline}
      scope={scope}
      transformCode={transform}
      mountStylesheet={false}>
      <Flex flexWrap='wrap'>
        <Border width={[ 1, null, 3/5 ]}>
          <Relative>
            <Box
              p={3}
              style={{ minHeight: 128 }}>
              <LivePreview />
            </Box>
            <Absolute top={0} left={0} right={0}>
              <Err />
            </Absolute>
          </Relative>
        </Border>
        <Editor
          width={[ 1, null, 2/5 ]}
        />
      </Flex>
    </LiveProvider>
  )
}

export default connect(Live)
