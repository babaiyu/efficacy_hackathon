import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {actionIsLogout} from 'storage/user/action';
import CardHome from './Card';
import CarouselHome from './Carousel';
import SearchHome from './Search';
import PromoHome from './Promo';

function Home() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actionIsLogout());
  };
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
