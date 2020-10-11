import {myColors} from 'constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Text, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Activity() {
  return (
    <View style={[styles.row, styles.card]}>
      <Icon name="circle" size={30} color={myColors.gray} style={{flex: 0.25}} />
      <Text style={[styles.textDark, {flex: 2}]}>Watching Event A</Text>
      <Caption style={styles.textGray}>1 hour ago</Caption>
    </View>
  );
}

function LastActivityProfile() {
  const [data, setData] = React.useState([1, 2, 3, 4]);
  return (
    <View style={styles.content}>
      <Title>Last Activities</Title>
      {data.map((i) => (
        <Activity key={i} />
      ))}
    </View>
  );
}

export default LastActivityProfile;

const styles = StyleSheet.create({
  content: {
    width: '90%',
    marginTop: 10,
  },
  textDark: {
    color: myColors.dark,
  },
  textGray: {
    color: myColors.gray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: myColors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 2.5
  },
});
