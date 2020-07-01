import React from 'react';
import { View, SafeAreaView, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import {
  NavBar,
  NavButton,
  RecordButton
} from '@components';
import { Metrics, Colors, VideoConfig } from '@constants';
import {
  setPostCreationStatus,
  createPost,
  resumeCreation,
  cancelPostCreation,
  setTempVideo,
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
  outerCamera: {
    position: 'absolute',
    height: VideoConfig.Height,
    width: VideoConfig.Width,
    left: -VideoConfig.Offset,
    alignItems: 'center',
  },
  innerCamera: {
    flex: 1,
    width: Metrics.ScreenWidth,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  flipCameraButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.Bigger,
    paddingBottom: Metrics.Normal,
  },
  controlButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.Bigger,
    paddingBottom: Metrics.Normal,
  },
  progressWrapper: {
    backgroundColor: Colors.white,
    height: Metrics.Small,
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 0 : Metrics.Big,
  },
  progressBar: (duration) => ({
    height: Metrics.Small,
    width: `${(duration / 15 * 100).toFixed(2)}%`,
  })
}

class VideoRecorderScreen extends React.Component {
  state = {
    camType: Camera.Constants.Type.back,
    recording: false,
    duration: 0,
    timerId: null,
    videoUri: '',
    recorded: false,
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    await ImagePicker.requestCameraRollPermissionsAsync();
  }

  setCamRef = (ref) => {
    this.camRef = ref;
  }

  handleBack = () => {
    this.props.cancelPostCreation();
    this.props.navigation.navigate('Discover');
  }

  handleFocus = () => {
    const { creatingPost, setPostCreationStatus, createPost, } = this.props;
    if (creatingPost) {
      resumeCreation();
    } else {
      setPostCreationStatus(true);
      createPost();
    }
  }

  handleRevertCam = () => {
    const { camType } = this.state;
    this.setState({
      camType: camType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    })
  }

  handleRecord = () => {
    const { recording } = this.state;
    if (recording) {
      this.camRef.stopRecording();
      this.setState({ recording: false });
    } else {
      const timerId = setInterval(this.updateDuration, 1000);
      this.setState({ recording: true, duration: 0, timerId });
      this.recordVideo();
    }
  }

  recordVideo = async () => {
    try {
      const videoUri = await this.camRef.recordAsync({
        maxDuration: VideoConfig.MaxDuration,
        maxFileSize: VideoConfig.MaxFileSize,
      });
      this.setState({ videoUri: videoUri.uri, recorded: true });
      const { timerId } = this.state;
      clearInterval(timerId);
      this.setState({ recording: false, timerId: null });
    } catch (e) {
      const { timerId } = this.state;
      clearInterval(timerId);
      this.setState({ recording: false, duration: 0, timerId: null });
    }
  }

  checkVideo = () => {
    this.props.setTempVideo(this.state.videoUri);
    this.props.navigation.navigate({
      routeName: 'CheckVideo',
      params: {
        recorded: this.state.recorded
      }
    });
  }

  selectVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      const { duration, uri } = result;
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
      const ext = uri.substr(uri.lastIndexOf('.') + 1).toLowerCase();
      if (fileInfo.size > VideoConfig.MaxFileSize || duration > VideoConfig.MaxDuration * 1000) {
        Alert.alert(
          'Video too large',
          `Your video must be less than ${VideoConfig.MaxDuration} seconds and under ${VideoConfig.MaxFileSize / 1000000}MB. Please decrease the size and try again.`);
      } else if(ext !== 'mov' && ext !== 'mp4') {
        Alert.alert(
          'Wrong format',
          'Your video must be a MP4 or MOV file. Please change the file type and try again.',
        );
      } else {
        this.setState({ videoUri: uri, recorded: false });
      }
    } catch(e) {
      console.log({ e });
    }
  }

  updateDuration = () => {
    const { duration } = this.state;
    this.setState({ duration: duration + 1 });
  }

  render() {
    const { camType, recording, duration, videoUri } = this.state;
    return (
      <View style={styles.wrapper}>
        <NavigationEvents onWillFocus={this.handleFocus} />
        <Camera style={styles.outerCamera} type={camType} ratio={VideoConfig.VideoRatio} ref={this.setCamRef}>
          <SafeAreaView style={styles.innerCamera}>
            <View style={styles.flipCameraButtonWrapper}>
              <NavButton type="refresh" size={32} dark onPress={this.handleRevertCam} />
            </View>
            <View style={styles.controlButtonWrapper}>
              <NavButton type="film" size={32} dark onPress={this.selectVideo} />
              <RecordButton recording={recording} onPress={this.handleRecord} />
              <NavButton type="forward" size={32} dark disabled={videoUri === ''} onPress={this.checkVideo} />
            </View>
            <View style={styles.progressWrapper}>
              <LinearGradient
                {...Colors.purpleGradient}
                style={styles.progressBar(duration)}
              />
            </View>
          </SafeAreaView>
        </Camera>
        <View>
          <NavBar dark left="close" onLeft={this.handleBack} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ appState }) => ({ creatingPost: appState.creatingPost });

const mapDispatchToProps = {
  setPostCreationStatus,
  createPost,
  resumeCreation,
  cancelPostCreation,
  setTempVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoRecorderScreen);
