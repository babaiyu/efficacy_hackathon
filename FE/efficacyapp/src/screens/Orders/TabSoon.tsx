import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  data: Array<any>;
};
function TabSoon(props: Props) {
  const renderItem = ({item, index}: any) => (
    <View key={index} style={[styles.row, {marginBottom: 10}]}>
      <View style={styles.card}>
        <Text style={styles.textDark}>Thumbnail {index + 1}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button mode="contained" onPress={() => {}} color={myColors.red}>
          Detail
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            name="supervised-user-circle"
            color={myColors.white}
            size={20}
          />
          <Text>200</Text>
        </View>
        <Text style={{fontSize: 12}}>10/11/2020</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(_item, i) => i.toString()}
      contentContainerStyle={{paddingBottom: 100, marginTop: 10}}
    />
  );
}

export default TabSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textDark: {
    color: myColors.dark,
  },
  card: {
    width: '70%',
    height: 100,
    backgroundColor: myColors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    borderRadius: 25,
    backgroundColor: myColors.white,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    textAlign: 'left',
    paddingLeft: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
  },
});
