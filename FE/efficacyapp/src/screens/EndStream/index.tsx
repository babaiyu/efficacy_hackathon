import {myColors} from 'constants/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Caption, Headline} from 'react-native-paper';
import {fonts} from 'constants/fonts';

function EndStream() {
  return (
    <View style={styles.container}>
      <Headline style={styles.textBold}>YOUR STREAM HAS ENDED</Headline>

      <View style={{width: '60%'}}>
        <Button
          style={styles.button}
          color={myColors.white}
          mode="contained"
          uppercase={false}>
          <Caption style={[styles.textDark, {fontSize: 12}]}>
            1.232 User has watch your stream
          </Caption>
        </Button>

        <Button
          style={styles.button}
          color={myColors.red}
          mode="contained"
          uppercase={false}
          onPress={() => {}}>
          Back Home
        </Button>
      </View>
    </View>
  );
}

export default EndStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textBold: {
    fontFamily: fonts.bold,
    color: myColors.white,
    fontSize: 50,
    textAlign: 'center',
    lineHeight: 75,
  },
  textDark: {
    color: myColors.dark,
  },
  formInput: {
    borderRadius: 20,
    backgroundColor: myColors.backgroundWhite,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
