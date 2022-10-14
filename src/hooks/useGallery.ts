import {useEffect, useState} from 'react';
import {IA_IMAGES} from '../helpers/contants';

let limit = 10;

interface Image {
  title: string;
  data: Array<string>;
}

const useGallery = () => {
  const [images, setImages] = useState<Array<Image>>([]);

  const loadImages = () => {
    let countImages = 0;
    let newImages: Array<Image> = [];
    for (let i = 1; i <= IA_IMAGES.length; i++) {
      const iaImage = IA_IMAGES[i - 1];
      const imagesSelected = [];
      for (let j = 1; j <= iaImage.data.length; j++) {
        const image = iaImage.data[j - 1];
        countImages += 1;
        if (countImages <= limit) {
          imagesSelected.push(image);
        }
      }
      imagesSelected.length &&
        newImages.push({
          title: iaImage.title,
          data: imagesSelected,
        });
    }
    setImages(newImages);
    limit += 10;
  };

  useEffect(() => {
    loadImages();
  }, []);

  return {
    images,
    loadImages,
  };
};

export default useGallery;
