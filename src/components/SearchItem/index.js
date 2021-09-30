import React from 'react';
import { Container,Banner, Title, RateContainer,Rate} from './styles';
import {Ionicons} from '@expo/vector-icons'

export default function SearchItem({data, navigatePage}){
 
  function detailMovie(){
    if(data.release_date === ''){
      alert('Filme ainda sem data')
      return;
    }
    navigatePage(data)

  }
  return(
    <Container activeOpacity={0.6} onPress={detailMovie}>
   
   {data?.poster_path ?(
 <Banner
 resizeMethod="resize"
 source={{uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}/>

   ):
   <Banner
   resizeMethod="resize"
   source={require('../../assets/semfoto.png')}/>
 
   }
    <Title>{data?.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e"/>
        <Rate>{data?.vote_overage}/10</Rate>
      </RateContainer>
     
    </Container>
  
  ) 

}

