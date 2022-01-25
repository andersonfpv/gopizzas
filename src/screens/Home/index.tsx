import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

import happyEmoji from '@assets/happy.png';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import { 
    Container, 
    Header, 
    Greeting,
    GreetingEmoji,
    GreetingText,
    Title, 
    MenuHeader,
    MenuItemsNumber
 } from './styles';

export function Home(){

    const { COLORS } = useTheme();

    function fetchPizzas(value: string) {
        const formattedValue = value.toLocaleLowerCase().trim();

        firestore()
          .collection("pizzas")
          .orderBy("name_insensitive")
          .startAt(formattedValue)
          .endAt(`${formattedValue}\uf8ff`)
          .get()
          .then(response => {
              const data = response.docs.map(doc => {
                  return {
                      id: doc.id,
                      ...doc.data(),
                  }
              }) as ProductProps[];

              console.log(data);
          })
          .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'));
    }

    useEffect(() => {
        fetchPizzas('');
    }, [])

    return(
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>

                <TouchableOpacity>
                    <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>

            <Search onSearch={() => { }} onClear={() => { }} />

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>10 pizzas</MenuItemsNumber>
            </MenuHeader>

            <ProductCard data={{ 
                id: '1', 
                name: 'Pizza', 
                description: 'Queijo, tomate, oregano', 
                photo_url: 'https://github.com/andersonfpv.png' 
            }} 
            />
        </Container>
    );
}