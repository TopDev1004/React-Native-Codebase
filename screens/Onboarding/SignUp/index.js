import { TransitionPresets } from "react-navigation-stack";

import BirthdayScreen from './Birthday';
import SignupScreen from './Signup';

const Transition = Platform.select({ ios: TransitionPresets.ModalSlideFromBottomIOS, android: TransitionPresets.RevealFromBottomAndroid });

export default ({
  Birthday: {
    screen: BirthdayScreen,
    navigationOptions: {
      ...Transition
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      ...TransitionPresets.SlideFromRightIOS
    }
  },
});
