import React from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-root-toast';

import {
  NavBar,
  NavButton,
  CircleCheckButton,
  H6Text,
} from '@components';
import { Metrics, Colors, VideoConfig } from '@constants';
import {
  uploadVideo
} from '@actions';

const styles = {
  wrapper: {
    position: 'relative',
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoPlayer: {
    position: 'absolute',
    height: VideoConfig.Height,
    width: VideoConfig.Width,
    left: -VideoConfig.Offset,
    alignItems: 'center',
  },
  controlWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingBottom: Metrics.Normal,
  },
  checkButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.Normal,
    alignItems: 'center',
  },
  popupWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: 320,
    height: 178,
    padding: Metrics.Big,
    backgroundColor: 'white',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(34, 34, 34, 0.7)',
    width: 150,
    bottom: 50,
  },
}

class CheckVideoScreen extends React.Component {
  state = { loading: false, visible: false }

  componentDidMount() {
    MediaLibrary.requestPermissionsAsync();
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  handleSave = async () => {
    const { tempVideoUri } = this.props;
    try {
      await MediaLibrary.saveToLibraryAsync(tempVideoUri);
      this.showToast();
    } catch (e) {
      console.log(e);
      Alert.alert('Video Save failed', 'There was an issue saving your video. Please try again.')
    }
  }

  handleCheck = async () => {
    const { tempVideoUri } = this.props;
    this.setState({ loading: true });
    try{
      await this.props.uploadVideo(tempVideoUri);
      this.props.navigation.navigate('ProductDescription');
    } catch(e) {
      Alert.alert('Video upload failed', 'There was an issue uploading your video. Please try again.');
    } finally {
      this.setState({ loading: false });
    }
  }

  showToast = () => {
    const toastOption = { containerStyle: styles.toast, shadow: false };
    Toast.show('Saved to Gallery!', toastOption);
  }

  render() {
    const { tempVideoUri } = this.props;
    const { loading } = this.state;
    return (
      <View style={styles.wrapper}>
        <Video
          source={{ uri: tempVideoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.videoPlayer}
        />
        <View style={styles.controlWrapper}>
          <NavBar
            dark
            left="back"
            textAlign="left"
            title="How's it going?"
            onLeft={this.handleBack}
            titleStyle={{ marginLeft: Metrics.Small }}
          />
          <View style={styles.checkButtonWrapper}>
            <NavButton dark type="download" onPress={this.handleSave} />
            <CircleCheckButton onPress={this.handleCheck} />
          </View>
        </View>
        {loading && (
          <View style={styles.popupWrapper}>
            <View style={styles.popup}>
              <H6Text>Uploading video...</H6Text>
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.purple} />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ createPost }) => ({ tempVideoUri: createPost.tempVideoUri, docId: createPost.postDetails.id });

const mapDispatchToProps = {
  uploadVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckVideoScreen);
