import {myColors} from 'constants/colors';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Text,
  Title,
  Headline,
  Subheading,
  Caption,
  IconButton,
} from 'react-native-paper';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fonts} from 'constants/fonts';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Controller, useForm} from 'react-hook-form';
import FloatingHearts from 'react-native-floating-hearts';

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
        contentContainerStyle={{height: 200, justifyContent: 'flex-end'}}
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

function LiveStream() {
  // State
  const [comment, setComment] = React.useState([]);
  const [heart, setHeart] = React.useState(0);

  const onComment = (data: any) => {
    const payload: any = [...comment, data];
    setComment(payload);
  };

  const onLike = () => {
    setHeart(heart + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TitleBar />
        <View style={{marginHorizontal: 20, width: '95%'}}>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', alignItems: 'flex-end'},
            ]}>
            <ListComment data={comment} />
            <View style={{flexDirection: 'column'}}>
              <FloatingHearts count={heart} />
              <IconButton
                animated
                rippleColor={myColors.white}
                icon="heart"
                color={myColors.red}
                style={{backgroundColor: myColors.white}}
                onPress={onLike}
              />
            </View>
          </View>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', alignItems: 'center'},
            ]}>
            <Comment onComment={(data: any) => onComment(data)} />
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
      <Video
        source={require('assets/video/livestream.mp4')}
        onError={(err) => Alert.alert('Alert', err.error.errorString)}
        style={styles.backgroundVideo}
        fullscreen={true}
        resizeMode="cover"
        playInBackground={true}
      />
    </View>
  );
}

export default LiveStream;

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