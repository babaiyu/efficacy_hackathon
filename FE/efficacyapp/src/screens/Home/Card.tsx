import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity as Touch,
  Image,
} from 'react-native';
import {Text, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function ContentCarousel() {
  return (
    <Touch style={styles.card}>
      <View style={[styles.row, {justifyContent: 'flex-start'}]}>
        <Icon name="circle" color={myColors.gray} />
        <Text style={styles.textDark}>Judul</Text>
      </View>
      <Image
        source={{
          uri:
            'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2019/10/How-to-organise-music-concert.jpg',
        }}
        style={{width: 150, height: 100, borderRadius: 10, alignSelf: 'center'}}
      />
      <Title style={styles.textDark}>Title</Title>
      <Caption numberOfLines={3} style={styles.textDark}>
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black, and the stars had ceased to twinkle.
      </Caption>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View style={[styles.row, {marginRight: 10}]}>
          <Text style={[styles.textDark, styles.textThin]}>Free</Text>
          <FontAwesomeIcon name="ticket" size={20} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.textDark, styles.textThin]}>59</Text>
          <FontAwesomeIcon name="heart" size={20} color={myColors.red} />
        </View>
      </View>
    </Touch>
  );
}

function CarouselHome() {
  // State
  const [data, setData] = React.useState([1, 2, 3, 4, 5]);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data.map((i) => (
        <ContentCarousel key={i} />
      ))}
    </ScrollView>
  );
}

export default CarouselHome;

const styles = StyleSheet.create({
  content: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    justifyContent: 'space-between',
  },
  card: {
    width: 200,
    backgroundColor: myColors.white,
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 10,
  },
  textLive: {
    fontFamily: fonts.bold,
  },
  textViewer: {
    fontSize: 12,
    color: myColors.dark,
  },
  textDark: {
    color: myColors.dark,
  },
  textThin: {
    fontSize: 12,
  },
  viewer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: myColors.white,
  },
});
