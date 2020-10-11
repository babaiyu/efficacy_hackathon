import {myColors} from 'constants/colors';
import React from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Button, Headline, IconButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {fonts} from 'constants/fonts';

const starList = () => [1, 2, 3, 4, 5];

function Feedback() {
  // Props
  const {control, handleSubmit, errors} = useForm();

  // State
  const [stared, setStared] = React.useState(5);

  const onStared = (txt: any) => {
    const id = parseInt(txt);
    setStared(id);
  };

  const onSubmit = (data: any) => {
    const payload = {
      star: stared,
      comment: data?.description,
    };
    Alert.alert('Alert', JSON.stringify(payload));
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.textBold}>Berikan penilaian kamu</Headline>
      <View style={styles.row}>
        {starList().map((i) => (
          <IconButton
            onPress={() => onStared(i)}
            icon={stared >= i ? 'star' : 'star-outline'}
            color={myColors.yellow}
            size={30}
            key={i}
          />
        ))}
      </View>

      <View style={{width: '75%'}}>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              style={styles.formInput}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
            />
          )}
        />
        <Button
          style={styles.button}
          color={myColors.red}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </View>
    </View>
  );
}

export default Feedback;

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
