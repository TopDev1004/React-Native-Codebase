import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";

const Transition = Platform.select({ ios: TransitionPresets.ModalSlideFromBottomIOS, android: TransitionPresets.RevealFromBottomAndroid });

import VideoRecorderScreen from './VideoRecorder';
import CheckVideo from './CheckVideo';
import ProductDescription from './ProductDescription';
import ProductDetails from './ProductDetails';

export default createStackNavigator({
  VideoRecorder: { screen: VideoRecorderScreen },
  CheckVideo: { screen: CheckVideo },
  ProductDescription: { screen: ProductDescription },
  ProductDetails: { screen: ProductDetails },
}, {
  headerMode: 'none',
  mode: 'modal',
  ...Transition,
});
