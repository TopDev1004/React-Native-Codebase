import React from 'react';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import { reduxForm, Field } from 'redux-form';

import {
  LightTextInput,
  H4Text,
  Body2Text,
  TransparentButton,
  KeyboardAvoidingView,
  NavBar,
  BaseScreen
} from "@components";
import { Colors, Metrics, Fonts } from "@constants";
import { Validators } from "@utils";
import { login, setAuthRedirect } from "@actions";

import { SignupIndicator } from './component';

class LoginScreen extends BaseScreen {
  goBack() {
    this.props.navigation.navigate('Discover');
  }
  submitEditing = async (form) => {
    const { redirect, login, setAuthRedirect, navigation } = this.props;
    const { email, password } = form;
    if (email && password) {
      try {
        await login(email, password);
        if (redirect) {
          navigation.navigate(redirect);
          setAuthRedirect(null);
        } else {
          navigation.navigate('Exclusive');
        }
      } catch(err) {
        Alert.alert(
          'Incorrect username or password',
          'Sorry, the username or password you entered is incorrect. Please try again.',
          [{ text: 'TRY AGAIN' }]
        );
      }
    } else {
      Alert.alert(
        'Incorrect username or password',
        'Sorry, the username or password you entered is incorrect. Please try again.',
        [{ text: 'TRY AGAIN' }]
      );
    }
  }

  handleForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  handleSignup = () => {
    const { navigation } = this.props;
    const navKey = navigation.state.key;
    navigation.navigate('Birthday', { navKey });
  }

  handleBack = () => {
    this.goBack();
  }

  dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <LinearGradient {...Colors.purpleGradient} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.content}>
              <SafeAreaView>
                <H4Text
                  color={Colors.white}
                  style={styles.title}
                  fontFamily={Fonts.primaryBold}
                >
                  Shopcam
                </H4Text>
                <Field
                  name="email"
                  component={LightTextInput}
                  required
                  validate={[Validators.required, Validators.email]}
                  style={{ marginBottom: Metrics.Smaller }}
                  props={{ placeholder: 'Email' }}
                />
                <Field
                  name="password"
                  component={LightTextInput}
                  required
                  validate={[Validators.required]}
                  props={{ secureTextEntry: true, placeholder: 'Password' }}
                  style={{ marginBottom: Metrics.Normal }}
                />
                <TransparentButton
                  height={40}
                  fullWidth
                  title="Log In"
                  onPress={this.props.handleSubmit(this.submitEditing)}
                />
                <TouchableWithoutFeedback onPress={this.handleForgotPassword}>
                  <Body2Text color={Colors.white} style={styles.link}>Forgot password?</Body2Text>
                </TouchableWithoutFeedback>
              </SafeAreaView>
            </View>
          </ScrollView>
          <SignupIndicator onPress={this.handleSignup} />
        </LinearGradient>
        <View style={{ position: 'absolute', top: 0 }}>
          <NavBar left="close" dark onLeft={this.handleBack} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  redirect: state.auth.redirect,
})

const mapDispatchToProps = { login, setAuthRedirect }

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'auth.login',
    enableReinitialize: true,
  })(LoginScreen)
);

const styles = {
  content: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: Metrics.Large,
    justifyContent: 'center',
  },
  title: {
    marginBottom: Metrics.Normal,
  },
  link: {
    textAlign: 'center',
    marginTop: Metrics.Big
  }
}