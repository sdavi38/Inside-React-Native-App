import React from 'react';
import { ScrollView} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {Container,
        SearchContainer,
        SearchButton,
        Input, 
        Title,
        BannerButton,
        Banner, 
        SliderMovie
      } from'./styles'
import SliderItem from '../../components/SliderItem';      
import Header from '../../components/Header';


export default function Home() {
  return(
    <Container>
    <Header title="React Prime" />
   <SearchContainer>
     <Input
     placeholder="Buscar..."
     placeholderTextColor="#ddd"
     />
     <SearchButton>
      <Feather name="search" size={30} color="#fff"/>
     </SearchButton>
   </SearchContainer>

   <ScrollView showsVerticalScrollIndicator={false  }>
     <Title>Em Cartaz</Title>
     <BannerButton activeOpacity={0.9} onPress={()=>alert('alert')}>
       <Banner
       resizeMethod="resize"
       source={{uri:'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
       />
     </BannerButton>
     <SliderMovie
      horizontal={true}
      showsHorizontalScrollIndocator={false}
      data={[1,2,3,5]}
      renderItem={({item})=><SliderItem/>}
     />
     <Title>Populares</Title>
   </ScrollView>
 
    </Container>

  )
}
