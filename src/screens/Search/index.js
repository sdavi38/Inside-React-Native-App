import React,{useEffect,useState}from "react"
import {Container,ListMovie,Name} from './styles'
import { ScrollView, ActivityIndicator} from 'react-native';
import api, { key } from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchItem from "../../components/SearchItem";



export default function Search(){

  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie]= useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    let isActive =true;

    async function getSearchMovies(){
      const response = await api.get('/search/movie',{
        params:{
          query:route.params.name,
          api_key:key,
          language:'pr-BR',
          page:1,
        }
      })

      if(isActive){
        setMovie(response.data.results);
     //   console.log(response.data.results)
        setLoading(false)
      }
    }
     if(isActive){
       getSearchMovies()
     }

     return()=>{
       isActive = false;
     }

  },[])

  if(loading){
     return(
       <Container>
         <ActivityIndicator size="large" color="#fff"/>
       </Container>
     )
   }
   function navigationDetailsPage(item){
    //console.log(item.id)
    navigation.navigate('Detail',{id:item.id})
   }  

  return(
    <Container>
    <ListMovie
   
    showsHorizontalScrollIndocator={false}
    data={movie}
    renderItem={({item})=><SearchItem data={item} navigatePage={() => navigationDetailsPage(item)}/>}
    keyExtractor={(item)=> String(item.id)}
    
    
    />
    </Container>
  
  )
}