import React, {useEffect, useState}from 'react';
import { ScrollView, ActivityIndicator} from 'react-native';
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
import api, { key } from '../../services/api';
import {getListMovies, randoBanner} from '../../utils/movie'
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [nowMovies, setNowMovies] =useState([]);
  const [popularMovies, setPopularMovies] =useState([]);
  const [topMovies, setTopMovies] =useState([]);
  const [bannerMoveis, setBannerMovies]= useState({})
  const [input, setInput]=useState('') //text vazio


  useEffect(()=>{
    let isActive =true;
    const ac = new AbortController();

    async function getMovies(){
      const [nowData,popularData, topData] = await Promise.all([
        
        api.get('/movie/now_playing',{
          params:{
            api_key: key,
            language:'pt-BR',
            page:1,
          }
        }),
        api.get('/movie/popular',{
          params:{
            api_key: key,
            language:'pt-BR',
            page:1,
          }
        }),
        api.get('/movie/top_rated',{
          params:{
            api_key: key,
            language:'pt-BR',
            page:1,
          }
        }),
      ])
      
     //console.log(popularData.data.results)

      if(isActive){
        const nowList =getListMovies(15, nowData.data.results);
        const popularList =getListMovies(7, popularData.data.results)
        const topList =getListMovies(5, topData.data.results)
       
        //listar no banner um filme aleatorio
        setBannerMovies(nowData.data.results[randoBanner(nowData.data.results)])
        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);
        setLoading(false);
      }
     
      
            
    }
    getMovies();
    
    return()=>{
        isActive = false;
        ac.abort()
    }
  
  },[])
   
   function navigationDetailsPage(item){
    //console.log(item.id)
    navigation.navigate('Detail',{id:item.id})
   }  

   if(loading){
     return(
       <Container>
         <ActivityIndicator size="large" color="#fff"/>
       </Container>
     )
   }
   function handleSearchMovie(){
     // Se não digitar
     if(input === '') return;

     navigation.navigate('Search', {name:input})
      //limpando os valores
     setInput('')
   }

  return(
    <Container>
    <Header title="React Prime" />
   <SearchContainer>
     <Input
     placeholder="Buscar..."
     placeholderTextColor="#ddd"
     value={input}
     onChangeText={(textDigitado)=>setInput(textDigitado)}
     />
     <SearchButton onPress={handleSearchMovie}>
      <Feather name="search" size={30} color="#fff"/>
     </SearchButton>
   </SearchContainer>

   <ScrollView showsVerticalScrollIndicator={false}>
     <Title>Em Cartaz</Title>
     <BannerButton activeOpacity={0.6}
     onPress={()=> navigationDetailsPage(bannerMoveis)}>
       <Banner
       resizeMethod="resize"
       source={{uri: `https://image.tmdb.org/t/p/original/${bannerMoveis.poster_path}`}}/>
     </BannerButton>
     <SliderMovie
      horizontal={true}
      showsHorizontalScrollIndocator={false}
      data={nowMovies}
      renderItem={({item})=><SliderItem data={item} navigatePage={() => navigationDetailsPage(item)}/>}
      keyExtractor={(item)=> String(item.id)}
     />
     <Title>Populares</Title>
     <SliderMovie
      horizontal={true}
      showsHorizontalScrollIndocator={false}
      data={popularMovies}
      renderItem={({item})=><SliderItem data={item} navigatePage={() => navigationDetailsPage(item)}/>}
      keyExtractor={(item)=> String(item.id)}
     />

    <Title>Mais Votados</Title>
     <SliderMovie
      horizontal={true}
      showsHorizontalScrollIndocator={false}
      data={topMovies}
      renderItem={({item})=><SliderItem data={item} navigatePage={()=> navigationDetailsPage(item)}/>}
      keyExtractor={(item)=> String(item.id)}
     />
   </ScrollView>
    
    </Container>

  )
}
