import React from 'react';
import { View, BackHandler } from 'react-native';

import { Colors, Metrics } from '@constants';

import KeyboardAvoidingView from '../KeyboardAvoidingView';

const styles = {
  wrapper: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: Metrics.Normal,
  }
}

export default class BaseScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBackPress);
  }

  handleHardwareBackPress = () => {
    if (this.props.navigation) {
      this.goBack();
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderNavigation() {
    return false;
  }

  renderContent() {
    return false;
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.renderNavigation()}
        <KeyboardAvoidingView>
          <View style={styles.content}>
            {this.renderContent()}
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
