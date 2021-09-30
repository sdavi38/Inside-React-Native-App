  import React from 'react'
  import {MaterialCommunityIcons} from '@expo/vector-icons'
  import {createDrawerNavigator} from '@react-navigation/drawer'
  import Movies from '../screens/Movie'
  import Home from '../screens/Home'
  import StackRoutes from './stackRoutes';

 const Drawer = createDrawerNavigator();

 export default function Routes(){
   return(
     <Drawer.Navigator
     screenOptions={{
       headerShown:false,
       drawerStyle:{
         backgroundColor:"#090a0e",
         padding: 20,
       },
       drawerActiveBackgroundColor:"#e72f49",
       drawerActiveTintColor:'#fff',
       drawerInactiveTintColor:"#fff"

     }}>
       <Drawer.Screen 
        name="HomeDrawer" 
        component={StackRoutes} 
        options={{
          title:'Home',
          drawerIcon:({focused, size, color})=>(
            <MaterialCommunityIcons
            name={focused ? 'movie-open': 'movie-outline'}
            size={size}
            color={color}
          />
       
          ) 
        }}
        
        />
        
       <Drawer.Screen
        name="Movies"
       component={Movies}
       
       options={{
        title:'Meus Filmes',
        drawerIcon:({focused, size, color})=>(
          <MaterialCommunityIcons
          name={focused ? 'archive': 'archive-outline'}
          size={size}
          color={color}
        />
        
     
        ) 
      }}
       />

       
     </Drawer.Navigator>
     
   )
 }
