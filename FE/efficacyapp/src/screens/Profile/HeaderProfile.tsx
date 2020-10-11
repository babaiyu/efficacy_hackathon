import {myColors} from 'constants/colors';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Caption, Card, IconButton, Text, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  onLogout: () => void;
  fullname: string;
};

function HeaderProfile(props: Props) {
  // Function
  const onLogout = () => {
    props.onLogout();
  };

  return (
    <View style={styles.content}>
      <Card style={{backgroundColor: myColors.white}}>
        <Card.Content>
          <View style={styles.row}>
            <View style={{marginRight: 10, alignItems: 'center'}}>
              <View style={styles.avatar}>
                <Image
                  source={require('assets/image/avatar.png')}
                  style={{width: '97%', height: '97%'}}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={{flex: 2}}>
              <Title style={styles.textDark}>{props.fullname}</Title>
              <Caption style={styles.textDark}>
                Anak baru kemarin sore, suka ngopi disenja hari didepan teras
                rumah ditemani rintik air kedamaian (deskripsi){' '}
              </Caption>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.row, {justifyContent: 'flex-start'}]}>
              <Icon name="coins" />
              <Text style={[styles.textDark, {marginLeft: 10}]}>175</Text>
            </View>
            <IconButton
              icon="logout"
              color={myColors.dark}
              onPress={onLogout}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default HeaderProfile;

const styles = StyleSheet.create({
  content: {
    width: '90%',
    marginTop: 20,
  },
  textDark: {
    color: myColors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: myColors.red,
    marginBottom: 10,
  },
});
