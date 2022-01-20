import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ButtonBack } from '@components/ButtonBack';
import { InputPrice } from '@components/InputPrice';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';

import { 
    Container, 
    Header, 
    Title, 
    DeleteLabel,
    Upload, 
    PickImageButton,
    Form,
    Label,
    InputGroup,
    InputGroupHeader,
    MaxChacacters 
} from './styles';

export function Product() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    async function handlePickerImage(){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if(!result.cancelled){
                setImage(result.uri);
            } 
        }
    }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Header>
                    <ButtonBack />

                    <Title>Cadastrar</Title>
                    
                    <TouchableOpacity>
                        <DeleteLabel>Deletar</DeleteLabel>
                    </TouchableOpacity>
                </Header>

                <Upload>
                    <Photo uri={image} />
                    <PickImageButton 
                        title="Carregar" 
                        type="secondary"
                        onPress={handlePickerImage}
                    />
                </Upload>

                <Form>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input 
                            onChangeText={setName} 
                            value={name} 
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxChacacters>0 de 60 caracteres</MaxChacacters>
                        </InputGroupHeader>

                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription} 
                            value={description}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e preços</Label>

                        <InputPrice size="P"
                            onChangeText={setPriceSizeP} 
                            value={priceSizeP}
                        />
                        <InputPrice size="M"
                            onChangeText={setPriceSizeM} 
                            value={priceSizeM}
                        />
                        <InputPrice size="G"
                            onChangeText={setPriceSizeG} 
                            value={priceSizeG}
                        />
                    </InputGroup>

                    <Button title="Cadastrar pizza" />
                </Form>
            </ScrollView>
        </Container>
    )
}