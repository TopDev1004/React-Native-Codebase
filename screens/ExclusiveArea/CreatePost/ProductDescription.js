import React from 'react';
import { connect } from 'react-redux';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as _ from 'lodash';

import { Colors, Metrics, Fonts } from '@constants';
import {
  BaseScreen,
  NavBar,
  CaptionText,
  PurpleTransparentButton,
  Avatar,
} from '@components';
import { setPostDetail } from '@actions';

const styles = {
  wrapper: {
    flex: 1,
    marginBottom: Metrics.Normal,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: Metrics.Normal,
  },
  bodyText: {
    marginBottom: Metrics.Large,
  },
  button: {
    height: 40,
  },
  highlight: {
    color: Colors.purple,
  },
  controlWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: Fonts.primary,
    fontSize: 16,
    lineHeight: 20,
    textAlignVertical: 'top',
    marginTop: Metrics.Smaller,
    marginLeft: Metrics.Small,
  }
}

class ProductDescription extends BaseScreen {
  state = {
    description: '',
    error: null,
  }

  componentDidCatch(err) {
    console.log({ err });
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  handleChange = (description) => {
    this.setState({ description });
  }

  handleNext = () => {
    const { description } = this.state;
    this.props.setPostDetail({ description });
    this.props.navigation.navigate('ProductDetails');
  }

  renderNavigation() {
    return (
      <NavBar left="back" onLeft={this.handleBack} />
    )
  }

  renderContent() {
    const { profileImage } = this.props;
    const { description } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView styles={styles.wrapper}>
          <View style={styles.content}>
            <Avatar uri={profileImage} />
            <TextInput
              style={styles.input}
              onChangeText={this.handleChange}
              multiline
              placeholder="Write a video description (and don’t forget to include #tags!)"
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.controlWrapper}>
          <CaptionText color={Colors.mediumGray}>{description.length}/250</CaptionText>
          <PurpleTransparentButton title="Next" height={Metrics.Bigger} onPress={this.handleNext} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  profileImage: _.get(state, 'userProfile.profileImage', null)
})

const mapDispatchToProps = { setPostDetail };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
