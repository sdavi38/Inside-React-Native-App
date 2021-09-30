import styled from 'styled-components/native'

export const Container = styled.View `
background-color:#141a29;
flex: 1;
`
export const Headers = styled.View `
display: flex;
flex-direction: row;
justify-content: space-between;

width: 100%;
top: 35px;
padding:  0 14px;
position: absolute;
z-index: 99;

`

export const HeaderButton = styled.TouchableOpacity `
background-color:#141a29;
width: 46px;
height: 46px;
background-color: rgba(25,26,48, 0.8);
border-radius: 23px;
align-items: center;
justify-content: center;

`
export const Banner = styled.Image `
width: 100%;
height: 350px;

`
export const ButtonLink = styled.TouchableOpacity `
background-color: #e72f49;
width: 63px;
height: 63px;
border-radius: 35px;
position: absolute;
top: 300px;
right: 15px;
justify-content: center;
align-items: center;
z-index: 99;
`
export const Title = styled.Text`
color: #fff;
font-weight: bold;
padding: 8px 14px;
font-size: 22px;
margin-top: 8px;
`