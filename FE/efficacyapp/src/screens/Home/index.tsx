import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Title} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actionIsLogout} from 'storage/user/action';
import CardHome from './Card';
import CarouselHome from './Carousel';
import SearchHome from './Search';
import PromoHome from './Promo';
import {AppState} from 'storage/reducers';
import {apiGetAllConcert} from 'api';

function Home() {
  // Props
  const dispatch = useDispatch();
  const userRedux = useSelector((state: AppState) => state.user);
  const [loading, setLoading] = React.useState(false);

  // Function
  const getAllConcert = () => {
    const token = userRedux?.dataUser?.token;
    Alert.alert('Alert', token);
    if (token !== undefined) {
      apiGetAllConcert(token)
        .then((res) => {
          if (!res.success) {
            Alert.alert('Alert', res?.message);
          } else {
            Alert.alert('Alert', 'Success Get Data');
          }
        })
        .catch((err) => Alert.alert('Alert', err.message));
    }
  };
  const onLogout = () => {
    dispatch(actionIsLogout());
  };

  // Life Cycle
  React.useEffect(() => {
    getAllConcert();
  });

  // Render
  return (
    <ScrollView style={{paddingBottom: 100}}>
      <View style={styles.container}>
        <SearchHome />
        <CarouselHome />
        <View style={styles.content}>
          <Title>Whats happen?</Title>
        </View>
        <CardHome />

        <View style={styles.content}>
          <Title>Promo</Title>
        </View>
        <PromoHome />
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 10},
});
