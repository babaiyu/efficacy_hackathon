import {myColors} from 'constants/colors';
import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Text, Caption, IconButton, Button} from 'react-native-paper';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fonts} from 'constants/fonts';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Controller, useForm} from 'react-hook-form';
import {AppState} from 'storage/reducers';
import {connect} from 'react-redux';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {apiStartLive, apiStartVideo} from 'api';

const settings = {
  camera: {cameraId: 1, cameraFrontMirror: true},
  audio: {bitrate: 32000, profile: 1, samplerate: 44100},
  video: {
    preset: 24,
    bitrate: 400000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
};

function TitleBar() {
  return (
    <View style={[styles.row, styles.titleBar]}>
      <Icon
        name="circle"
        color={myColors.gray}
        size={50}
        style={{marginRight: 10}}
      />
      <View>
        <Text style={styles.textBold}>Event Terkeren</Text>
        <Caption style={styles.textDark}>Subjudul event</Caption>
      </View>
    </View>
  );
}

function ListComment({data}: {data: Array<any>}) {
  const renderItem = ({item, index}: any) => (
    <View
      key={index}
      style={[
        styles.row,
        {
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 20,
          padding: 5,
          width: '100%',
          marginVertical: 3,
        },
      ]}>
      <Icon
        name="circle"
        color={myColors.gray}
        size={50}
        style={{marginRight: 10}}
      />
      <View>
        <Text>{item?.title}</Text>
        <Caption>{item?.comment}</Caption>
      </View>
    </View>
  );

  return (
    <View style={styles.listComment}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_item, i) => i.toString()}
        contentContainerStyle={{justifyContent: 'flex-end'}}
        showsVerticalScrollIndicator={false}
        style={{height: 200}}
      />
    </View>
  );
}

function Comment({onComment}: {onComment: (txt: any) => void}) {
  // Props
  const {control, handleSubmit, errors, setValue} = useForm();

  const onSubmit = (data: any) => {
    const payload = {
      id: 1,
      title: 'First Last',
      comment: data?.comment,
    };
    onComment(payload);
    setValue('comment', '');
  };

  return (
    <View style={{width: '80%'}}>
      <Controller
        control={control}
        name="comment"
        rules={{required: true}}
        defaultValue=""
        render={({onChange, onBlur, value}) => (
          <TextInput
            onChangeText={(value) => onChange(value)}
            value={value}
            onBlur={onBlur}
            autoCapitalize="none"
            style={[styles.formInput, errors.identifier && styles.formError]}
            placeholder="Say hello..."
          />
        )}
      />
      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 10,
          width: 35,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton
          onPress={handleSubmit(onSubmit)}
          icon="send"
          color={myColors.white}
          style={{backgroundColor: myColors.red}}
        />
      </View>
    </View>
  );
}

type Props = {
  userRedux: any;
};

type State = {
  comment: Array<any>;
  hasPermission: boolean;
  isPublish: boolean;
  streamKey: string;
  playbackID: string;
  paused: boolean;
};

class LiveStream extends React.Component<Props, State> {
  vb: any;
  constructor(props: any) {
    super(props);
    this.state = {
      comment: [],
      hasPermission: false,
      isPublish: false,
      streamKey: '',
      playbackID: '',
      paused: true,
    };
  }

  onComment = (data: any) => {
    const payload: any = [...this.state.comment, data];
    this.setState({comment: payload});
  };

  checkPermissions = async () => {
    console.log('Checking Permissions Android');
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      let hasAllPermissions = true;
      Object.keys(granted).forEach((key) => {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        if (granted[key] !== 'granted') {
          console.log('Does not have permission for: ', granted[key]);
          hasAllPermissions = false;
        }
      });
      console.log('hasAllPermissions: ', hasAllPermissions);
      this.setState({hasPermission: hasAllPermissions});
    } catch (err) {
      console.warn(err);
    }
  };

  onPressPublishBtn = async () => {
    const {isPublish: publishingState, hasPermission} = this.state;
    if (Platform.OS === 'android') {
      if (!hasPermission) {
        this.checkPermissions();
        return;
      }
    }

    if (publishingState) {
      this.vb.stop();
    } else {
      this.vb.start();
    }

    this.setState({isPublish: !publishingState});
  };

  onPressPlayBtn = () => {
    const {paused: pausedState} = this.state;
    this.setState({paused: !pausedState});
  };

  onCheckStartVideo = () => {
    const token = this.props.userRedux?.dataUser?.token;
    const id = this.props.route.params.id;
    apiStartVideo(token, id)
      .then((res) => {
        console.log('RESVIDEO', res);
        if (res.success) {
          this.setState({playbackID: res?.concert?.playback_id});
          console.log('RES', res);
        }
      })
      .catch((err) => {
        Alert.alert('ERR', err.message);
      });
  };

  onCheckStartLive = () => {
    const token = this.props.userRedux?.dataUser?.token;
    const id = this.props.route.params.id;
    apiStartLive(token, this.props.route.params.id)
      .then((res) => {
        console.log('RES', res);
        if (res.success) {
          this.setState({streamKey: res?.data.stream_key});
        } else {
          Alert.alert('Alert', 'Failed to Start');
        }
      })
      .catch((err) => {
        console.log('ERR', err);
      });
  };

  componentDidMount() {
    this.checkPermissions();
    // this.onCheckStartLive();
    // this.onCheckStartVideo();
    if (this.props.userRedux?.dataUser?.data?.role_id === 1) {
      this.onCheckStartVideo();
    } else {
      this.onCheckStartLive();
    }
  }

  render() {
    const {comment, isPublish, streamKey, playbackID, paused} = this.state;
    const source = {
      uri: `https://stream.mux.com/${playbackID}.m3u8`,
    };
    console.log('LIVE', `rtmp://live.mux.com/app/${streamKey}`);
    console.log("VIDEO", source);
    // const source=require('assets/video/konser.m4v')
    return (
      <View style={styles.container}>
        {this.props.userRedux?.dataUser?.data?.role_id === 1 ? (
          <Video
            source={{uri: `https://stream.mux.com/${streamKey}.m3u8`}}
            onError={(err) => console.log('ERROR Video', err)}
            onBuffer={(buff) => console.log('BUFFER', buff)}
            style={styles.backgroundVideo}
            resizeMode="cover"
            paused={paused}
          />
        ) : (
          <NodeCameraView
            style={styles.backgroundVideo}
            ref={(vb: any) => {
              this.vb = vb;
            }}
            outputUrl={`rtmp://live.mux.com/app/${streamKey}`}
            camera={settings.camera}
            audio={settings.audio}
            video={settings.video}
            autopreview
          />
        )}
        <View style={styles.content}>
          <View>
            <TitleBar />
            {this.props.userRedux?.dataUser?.data?.role_id === 2 && (
              <Button onPress={this.onPressPublishBtn}>
                {isPublish ? 'End Live' : 'Go Live'}
              </Button>
            )}
            {this.props.userRedux?.dataUser?.data?.role_id === 1 && (
              <Button onPress={this.onPressPlayBtn}>
                {!paused ? 'Stop Video' : 'Start Video'}
              </Button>
            )}
          </View>
          <View style={{marginHorizontal: 20, width: '95%'}}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'flex-end'},
              ]}>
              <ListComment data={comment} />
              <View style={{flexDirection: 'column'}}>
                <IconButton
                  animated
                  rippleColor={myColors.white}
                  icon="heart"
                  color={myColors.red}
                  style={{backgroundColor: myColors.white}}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <Comment onComment={(data: any) => this.onComment(data)} />
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor: myColors.white,
                    borderRadius: 30,
                    paddingVertical: 5,
                    paddingHorizontal: 7,
                  },
                ]}>
                <Caption style={styles.textDark}>1.2K</Caption>
                <Icon name="remove-red-eye" size={20} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(LiveStream);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    zIndex: 99,
    width: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listComment: {
    alignSelf: 'flex-start',
    width: '80%',
  },
  titleBar: {
    backgroundColor: myColors.backgroundWhite,
    padding: 5,
    borderRadius: 25,
    width: '90%',
    marginTop: 5,
    alignSelf: 'center',
  },
  textDark: {
    color: myColors.dark,
  },
  textBold: {
    fontFamily: fonts.bold,
    color: myColors.dark,
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: myColors.white,
  },
  formInput: {
    borderRadius: 20,
    backgroundColor: myColors.white,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    paddingLeft: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
  },
  formError: {
    borderWidth: 1,
    borderColor: myColors.red,
  },
});
