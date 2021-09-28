import React from 'react';
import{useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import { Container, MenuButton, Title } from './styles';

type Props = {
  title: string;

  }

export default function Header({title}:Props  ){
  //navegação 
const navigation = useNavigation()
  return(
    <Container>
     <MenuButton onPress={()=>navigation.openDrawer()}>
       <Feather name="menu"
       size={36}
       color="#fff"
       />
      <Title>{title}</Title>
     </MenuButton>
    </Container>
  )
}

