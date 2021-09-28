import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import { Container,BannerItem, RateContainer,Rate, Title } from './styles';



export default function SliderItem(){
 

  return(
    <Container activeOpacity={0.6 }>
     <BannerItem
      source={{uri:'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
       />
     <Title numberOfLines={1}>Os Vingadores é a Era </Title>
     
     <RateContainer>
      <Ionicons name="md-star" size={12} color="#e7a74e"/>
      <Rate>9/10</Rate>
     </RateContainer>
    
    </Container>
  )
}

