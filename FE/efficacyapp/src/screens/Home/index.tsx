import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import {Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CardHome from './Card';
import CarouselHome from './Carousel';
import SearchHome from './Search';
import PromoHome from './Promo';
import {AppState} from 'storage/reducers';
import {apiGetAllConcert} from 'api';

function Home() {
  // Props
  const userRedux = useSelector((state: AppState) => state.user);
  const [loading, setLoading] = React.useState(false);

  // State
  const [dataConcert, setDataConcert] = React.useState([]);

  // Function
  const getAllConcert = () => {
    setLoading(true);
    const token = userRedux?.dataUser?.token;
    if (token !== undefined) {
      apiGetAllConcert(token)
        .then((res) => {
          if (!res.success) {
            Alert.alert('Alert', res?.message);
            setLoading(false);
          } else {
            setDataConcert(res?.concerts);
            setLoading(false);
          }
        })
        .catch((err) => {
          Alert.alert('Alert', err.message);
          setLoading(false);
        });
    }
  };

  // Life Cycle
  React.useEffect(() => {
    if (dataConcert.length === 0) {
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
        <CarouselHome />
        <View style={styles.content}>
          <Title>Whats happen?</Title>
        </View>
        <CardHome dataConcert={dataConcert} />

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
