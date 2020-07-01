import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";

const Transition = Platform.select({ ios: TransitionPresets.ModalSlideFromBottomIOS, android: TransitionPresets.RevealFromBottomAndroid });

import LoginScreen from './LoginScreen';
import ForgotPassword from './ForgotPassword';
import SignupFlow from './SignUp';

export default createStackNavigator({
  Login: { screen: LoginScreen },
  ForgotPassword: { screen: ForgotPassword },
  ...SignupFlow,
}, {
  headerMode: 'none',
  mode: 'modal',
  ...Transition,
})