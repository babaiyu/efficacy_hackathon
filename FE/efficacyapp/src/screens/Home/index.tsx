import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import {Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CardHome from './Card';
import CarouselHome from './Carousel';
import SearchHome from './Search';
import PromoHome from './Promo';
import {AppState} from 'storage/reducers';
import {apiGetAllConcert, apiStartLive, apiStartVideo} from 'api';
import {useNavigation} from '@react-navigation/native';

function Home() {
  // Props
  const userRedux = useSelector((state: AppState) => state.user);
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  // State
  const [dataConcert, setDataConcert] = React.useState([]);
  const [loadFirst, setLoadFirst] = React.useState(true);

  // Function
  const getAllConcert = () => {
    setLoading(true);
    const token = userRedux?.dataUser?.token;
    console.log('TOKEN', token);
    if (token !== undefined) {
      apiGetAllConcert(token)
        .then((res) => {
          console.log('RESPONSE', res);
          setLoadFirst(false);
          if (!res.success) {
            Alert.alert('Alert', res?.message);
            setLoading(false);
          } else {
            setDataConcert(res?.concerts);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('ERR', err);
          Alert.alert('Alert', err.message);
          setLoading(false);
          setLoadFirst(false);
        });
    }
  };

  const onNavigateConcert = (data: any) => {
    navigation.navigate('ConcertScreen', data);
  };

  const getPlaybackID = (token: any, id: any) => {
    apiStartVideo(token, id)
      .then((res) => {
        console.log('RESVIDEO', res);
        if (res.success) {
          navigation.navigate('LiveStreamScreen', {id: res?.concert?.playback_id});
          console.log('RES', res);
        }
      })
      .catch((err) => {
        Alert.alert('ERR', err.message);
      });
  };

  const getStreamKey = (token: any, id: any) => {
    apiStartLive(token, id)
      .then((res) => {
        console.log('RESVIDEO', res);
        if (res.success) {
          navigation.navigate('LiveStreamScreen', {id: res?.data.stream_key});
          console.log('RES', res);
        }
      })
      .catch((err) => {
        Alert.alert('ERR', err.message);
      });
  };

  const onNavigateLive = (id: number) => {
    // const role = userRedux?.dataUser?.data?.role_id;
    // const token = userRedux?.dataUser?.token;
    // Alert.alert('ROle', JSON.stringify(role));
    // if (role === 1) {
    //   getPlaybackID(token, id);
    // } else {
    //   getStreamKey(token, id)
    // }
    navigation.navigate('LiveStreamScreen', {id});
  };

  // Life Cycle
  React.useEffect(() => {
    if (loadFirst) {
      getAllConcert();
    }
  });

  // Render
  return (
    <ScrollView
      style={{paddingBottom: 100}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getAllConcert} />
      }>
      <View style={styles.container}>
        <SearchHome />
        <CarouselHome data={dataConcert} onPress={(id) => onNavigateLive(id)} />
        <View style={styles.content}>
          <Title>Whats happen?</Title>
        </View>
        <CardHome
          dataConcert={dataConcert}
          onPress={(data) => onNavigateConcert(data)}
        />

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
