import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const StyledText = styled.Text`
    font-size: 24px;
    color: #333;
`
const Homescreen = () => {
  return (
    <Container>
      <StyledText>Homescreen</StyledText>
    </Container>
  )
}

export default Homescreen