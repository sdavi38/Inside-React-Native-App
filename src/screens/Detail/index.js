import React,{useEffect, useState} from 'react';
import {Container, 
  Headers,
  HeaderButton,
  Banner,
  Title,
  ButtonLink, 
  ContentArea,
  Rate ,
  ListGenres,
  Description
} from './styles'
import Stars from 'react-native-stars'
import {ScrollView, Modal} from 'react-native'

import {Feather,Ionicons} from '@expo/vector-icons'
import api, {key} from '../../services/api'
import {useNavigation, useRoute} from '@react-navigation/native'    
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import {saveMovie, hasMovie, deleteMovie} from '../../utils/storage'


export default function Detail() {
 
 const navigation = useNavigation();
 const route = useRoute();
 const [movie, setMovie]= useState({})
 const [openLink, setOpenLink]=useState(false)
 const [favoriteMovie, setFavoriteMovie]= useState(false)

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
         const isFavorite = await hasMovie(response.data)   
         setFavoriteMovie(isFavorite);
     // console.log(response.data)
 
      
    }
  }

      if(isActive){
        getMovie();
      }

     return ()=>{
       isActive = false
     }




 },[])
 
  async function handleFavoriteMovie(movie){

    if(favoriteMovie){
      await deleteMovie(movie.id);
      setFavoriteMovie(false); 
      alert('filme removido da lista');
    }else{
      await saveMovie('@prime', movie)
      setFavoriteMovie(true)
      alert('filme salvo')
    }
  
 }

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

        <HeaderButton onPress={()=> handleFavoriteMovie(movie)}>
           {favoriteMovie ?(
             <Ionicons
             name="bookmark"
             size={28}
             color="#fff"/>
           ):(
            <Ionicons
            name="bookmark-outline"
            size={28}
            color="#fff"/>
           )}
         
        </HeaderButton>
  
      
    
      </Headers> 
      <Banner
       resizeMethod="resize"
       source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`}}/>

       <ButtonLink onPress={()=>setOpenLink(true)}>
         <Feather
         name="link"
         size={24}
        color="#fff"/>

       </ButtonLink>
        <Title numberOfLines={2}>{movie.title}</Title>

        <ContentArea>
          <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          startSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#e7a74e"/>}
          emptyStar={<Ionicons name="md-star-outline" size={24} color="#e7a74e"/>}
          halfStar={<Ionicons name="md-star" size={24} color="#e7a74e"/>}
          disable={true}         
         />
         <Rate>{movie.vote_average}/10</Rate>

        </ContentArea>
        <ListGenres
          data={movie?.genres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item)=>String (item.id)}
          renderItem={({item})=> <Genres data={item}/>}
        />

        <ScrollView
        showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
        </ScrollView>
        
        <Modal
         animationType="slide"
        visible={openLink}>
          <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={()=> setOpenLink(false)}
          />

        </Modal>
        
    </Container>

  )
}
