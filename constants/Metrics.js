import { Dimensions } from 'react-native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

export const Metrics = {
  XL: 64,
  Larger: 56,
  Large: 48,
  Bigger: 32,
  Big: 24,
  Normal: 16,
  Small: 12,
  Smaller: 8,
  Tiny: 4,
  ScreenWidth,
  ScreenHeight
}