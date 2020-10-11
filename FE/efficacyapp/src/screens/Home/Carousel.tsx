import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity as Touch,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ContentCarousel() {
  return (
    <Touch>
      <ImageBackground
        style={[styles.content, styles.column]}
        source={{
          uri:
            'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2019/10/How-to-organise-music-concert.jpg',
        }}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Icon
              name="circle"
              color={myColors.red}
              style={{marginBottom: 4}}
            />
            <Text style={styles.textLive}> LIVE</Text>
          </View>
          <View style={[styles.row, styles.viewer]}>
            <Text style={styles.textViewer}>1.2K</Text>
            <Icon name="remove-red-eye" style={{marginBottom: 4}} />
          </View>
        </View>
        <View>
          <Text style={styles.textLive}>Event Keren yang pernah ada</Text>
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            <Icon
              name="circle"
              color={myColors.gray}
              style={{marginBottom: 4}}
            />
            <Text>First Last</Text>
          </View>
        </View>
      </ImageBackground>
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
  viewer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: myColors.white,
  },
});