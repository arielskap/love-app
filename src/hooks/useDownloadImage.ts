import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert} from 'react-native';

const useDownloadImage = () => {
  const getExtension = (filename: string) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadImage = (imagePath: string) => {
    let date = new Date();
    let image_URL = imagePath;
    const ext = getExtension(image_URL) as RegExpExecArray;
    const extString = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          extString,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res: any) => {
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('Image Downloaded Successfully.');
      });
  };

  const checkPermissionAndDownload = async (imagePath: string) => {
    if (Platform.OS === 'ios') {
      downloadImage(imagePath);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Image Download Permission',
            message:
              'Your permission is required to save images to your device',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.info('Storage Permission Granted.');
          downloadImage(imagePath);
        } else {
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return {
    checkPermissionAndDownload,
  };
};

export default useDownloadImage;
