import { Dimensions } from 'react-native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

export const VideoConfig = {
  Ratio: '4:3',
  Width: ScreenHeight * 3 / 4,
  Height: ScreenHeight,
  Offset: (ScreenHeight * 3 / 4 - ScreenWidth) / 2 ,
  MaxFileSize: 100000000,
  MaxDuration: 15,
}