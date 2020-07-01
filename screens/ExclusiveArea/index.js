import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from 'firebase';

import { setAuthRedirect } from '@actions';

import CreatePostStack from './CreatePost';

const ExclusiveStack = createStackNavigator({
  CreatePost: { screen: CreatePostStack },
}, { headerMode: 'none' });

class ExclusiveWrapper extends React.Component {
  state = { authenticated: false }
  componentDidMount() {
    if (firebase.auth().currentUser) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  }
  handleFocus = () => {
    this.setState({ authenticated: false });
    if (firebase.auth().currentUser) {
      this.setState({ authenticated: true });
    } else {
      this.props.setAuthRedirect('Exclusive');
      this.props.navigation.navigate('Onboarding');
    }
  }
  render() {
    const { authenticated } = this.state;
    return (
      <>
        <NavigationEvents onWillFocus={this.handleFocus} />
        {authenticated && <ExclusiveStack navigation={this.props.navigation} />}
      </>
    )
  }
}

ExclusiveWrapper.router = ExclusiveStack.router;

const mapDispatchToProps = { setAuthRedirect };

export default connect(null, mapDispatchToProps)(ExclusiveWrapper);
