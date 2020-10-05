import styled from "styled-components/native"

// OK
export const Container = styled.View`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`

export const Bubble = styled.View`
  width: 16px;
  height: 16px;
  background: #3c4560;
  position: absolute;
  top: 0px;
  right: 5px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid white; // solid est pas trouvé mais j'ai mis borderWidth à 1px à voir...
`

export const Text = styled.Text`
  color: white;
  font-size: 12px; // j'ai mis Header, mais on aura du bold.. à vérif
  font-weight: 700;
`
