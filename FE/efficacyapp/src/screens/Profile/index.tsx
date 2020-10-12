import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import {AppState} from 'storage/reducers';
import {actionIsLogout} from 'storage/user/action';
import HeaderProfile from './HeaderProfile';
import LastActivityProfile from './LastActivityProfile';
import PostEO from './PostEO';
import {ScrollView} from 'react-native-gesture-handler';
import {apiPostConcert} from 'api';
import {Button} from 'react-native-paper';
import {myColors} from 'constants/colors';
import {useNavigation} from '@react-navigation/native';

function Profile() {
  // Props
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userRedux = useSelector((state: AppState) => state.user);

  // Function
  const onLogout = () => {
    dispatch(actionIsLogout());
  };

  const onPost = (data: any) => {
    const token = userRedux?.dataUser?.token;
    apiPostConcert(data, token)
      .then((res) => {
        if (!res?.success) {
          Alert.alert('Alert', res.message);
        } else {
          Alert.alert('Alert', 'Success post the event');
        }
      })
      .catch((err) => {
        Alert.alert('Alert', 'Internal Server Error');
      });
  };

  const onNavigateLive = () => {
    navigation.navigate('LiveStreamScreen');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderProfile
          fullname={userRedux?.dataUser?.data?.name}
          age={userRedux?.dataUser?.data?.age}
          role={
            userRedux?.dataUser?.data?.role_id === 1
              ? 'Viewer'
              : 'Event Organizer'
          }
          onLogout={onLogout}
        />
        {userRedux?.dataUser?.data?.role_id === 1 ? (
          <LastActivityProfile />
        ) : (
          <>
            <PostEO onLive={onNavigateLive} sendData={(data) => onPost(data)} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
