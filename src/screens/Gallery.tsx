import {
  Button,
  AspectRatio,
  SectionList,
  Image,
  Center,
  Box,
  Heading,
  View,
} from 'native-base';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import useGallery from '../hooks/useGallery';
import useDownloadImage from '../hooks/useDownloadImage';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Gallery'> {}

const GalleryScreen: FC<Props> = () => {
  const {loadImages, images} = useGallery();
  const {checkPermissionAndDownload} = useDownloadImage();

  return (
    <Center bgColor="rose.100">
      <SectionList
        w={{base: '100%', md: '80%'}}
        sections={images}
        onEndReached={loadImages}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({section: {title}}) => (
          <Center bgColor="rose.200" mx={2} mb={2} mt={8} rounded="md">
            <Heading fontSize="xl" py={2}>
              {title}
            </Heading>
          </Center>
        )}
        renderItem={({item}) => (
          <Box p={1}>
            <AspectRatio ratio={1}>
              <Image
                key={`gallery-image-${item}`}
                roundedTop="md"
                resizeMode="contain"
                source={{uri: item}}
                alt="Image IA"
                w="100%"
              />
            </AspectRatio>
            <Button
              p={2}
              bgColor="rose.300"
              roundedTop="none"
              roundedBottom="md"
              onPress={() => checkPermissionAndDownload(item)}
              _text={{
                fontWeight: 'bold',
                fontSize: 'md',
              }}>
              Guardar
            </Button>
          </Box>
        )}
      />
    </Center>
  );
};

export default GalleryScreen;
