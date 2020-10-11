import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import {AppState} from 'storage/reducers';
import {actionIsLogout} from 'storage/user/action';
import HeaderProfile from './HeaderProfile';
import LastActivityProfile from './LastActivityProfile';

function Profile() {
  // Props
  const dispatch = useDispatch();
  const userRedux = useSelector((state: AppState) => state.user);

  // Function
  const onLogout = () => {
    dispatch(actionIsLogout());
  };

  return (
    <View style={styles.container}>
      <HeaderProfile
        fullname={userRedux?.dataUser?.data?.name}
        onLogout={onLogout}
      />
      {userRedux?.dataUser?.data?.role_id === 1 ? (
        <LastActivityProfile />
      ) : (
        <Text>Ini EO</Text>
      )}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
