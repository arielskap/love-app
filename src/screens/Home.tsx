import React, {FC} from 'react';
import {Button, Link, Center, Image, VStack} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

const gifImageRandom = Math.floor(Math.random() * 4);
const gifImage = [
  require('../assets/images/gifs/cat_1.gif'),
  require('../assets/images/gifs/cat_2.gif'),
  require('../assets/images/gifs/cat_3.gif'),
  require('../assets/images/gifs/cat_4.gif'),
][gifImageRandom];

const Home: FC<Props> = ({navigation}) => {
  return (
    <Center bgColor="rose.100" h="100%">
      <VStack space={4} alignItems="center">
        <Link
          isUnderlined={false}
          bgColor="rose.400"
          rounded="md"
          p={2}
          w={190}
          _text={{color: 'white', fontWeight: 'bold'}}
          isExternal
          href="https://love-chi-six.vercel.app?user=sofikbm&pass=te%20amo%20un%20monton%20culona">
          Abrir nuestra pagina web
        </Link>
        <Button
          rounded="md"
          bgColor="rose.400"
          _text={{fontWeight: 'bold'}}
          w={190}
          py={2}
          onPress={() => {
            navigation.navigate('Gallery');
          }}>
          Galeria Sof-IA
        </Button>
        <Image size="2xl" rounded="md" source={gifImage} alt="Cursi cat" />
      </VStack>
    </Center>
  );
};

export default Home;
