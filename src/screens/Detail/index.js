import React,{useEffect, useState} from 'react';
import {Container, 
  Headers,
  HeaderButton,
  Banner,
  Title,
  ButtonLink, 
  ContentArea, 

} from './styles'


import {Feather,Ionicons} from '@expo/vector-icons'
import api, {key} from '../../services/api'
import {useNavigation, useRoute} from '@react-navigation/native'    

export default function Detail() {
 
 const navigation = useNavigation();
 const route = useRoute();
 const [movie, setMovie]= useState({})

 useEffect(()=>{
   let isActive = true;
   
     async function getMovie(){
      const response = await api.get(`/movie/${route.params?.id}`,{
         params:{
            api_key:key,
            language:'pt-BR'
        }
       })
       
      .catch((err)=>{
      console.log(err)
      })

        if(isActive){
      setMovie(response.data)
      console.log(response.data)
 
      
    }
  }

      if(isActive){
        getMovie();
      }

     return ()=>{
       isActive = false
     }




 },[])

  return(
    <Container>
      <Headers>
        <HeaderButton 
        activeOpacity={0.6}
        onPress={()=> navigation.goBack()}>
          <Feather
          name="arrow-left"
          size={28}
          color="#fff"/>
        </HeaderButton>

        <HeaderButton>
          <Ionicons
          name="bookmark"
          size={28}
          color="#fff"/>
        </HeaderButton>
  
      
    
      </Headers> 
      <Banner
       resizeMethod="resize"
       source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`}}/>

       <ButtonLink>
         <Feather
         name="link"
         size={24}
        color="#fff"/>

       </ButtonLink>
        <Title numberOfLines={2}>{movie.title}</Title>
        
    </Container>

  )
}
