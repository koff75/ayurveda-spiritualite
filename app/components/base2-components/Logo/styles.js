import styled from "styled-components/native"
// OK mais vérif à faire
export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background: #fff;
  height: 60px;
  /* haut | horizontal | bas */
  padding: 12px 16px 12px;
  border-radius: 10px;
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0 8px;
`
// OK
export const Image = styled.Image`
  width: 36px;
  height: 36px;
`

// OK
export const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`
