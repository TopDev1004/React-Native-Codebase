import React from 'react';
import { View, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Colors, Metrics, } from '@constants'
import { NavTitle } from '../Texts';
import NavButton from './NavButton';

const NavBar = ({ dark, left, right, title, textAlign = 'center', titleStyle = {}, onLeft, onRight }) => (
  <View style={styles.wrapper}>
    {left && <NavButton type={left} dark={dark} onPress={onLeft} />}
    <View style={styles.center}>
      {title && <NavTitle dark={dark} style={{ textAlign, ...titleStyle }}>{title}</NavTitle>}
    </View>
    {right && <NavButton type={right} dark={dark} onPress={onRight} />}
  </View>
);

const styles = {
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    height: (Platform.OS === 'ios' ? Metrics.Bigger : Metrics.Large )+ getStatusBarHeight(true),
    alignItems: 'center',
    paddingTop: getStatusBarHeight(true),
    paddingHorizontal: Metrics.Normal,
    backgroundColor: Colors.transparent,
  },
  center: {
    flex: 1,
  }
}

NavBar.displayName = 'NavBar';

export default NavBar;