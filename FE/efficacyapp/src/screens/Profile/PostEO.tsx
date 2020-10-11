import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Divider} from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

type Props = {
  sendData: (data: any) => void;
};

function PostEO(props: Props) {
  // Props
  const {control, handleSubmit, errors} = useForm();

  // State
  const [showDate, setShowDate] = React.useState(false);

  // Function
  const onShowDate = () => {
    setShowDate(!showDate);
  };

  const onPostEvent = (data: any) => {
    const payload = {
      title: data.title,
      description: data.description,
      date: dayjs(data.date),
      price: parseInt(data.price),
      min_age: parseInt(data.min_age),
    };
    props.sendData(payload);
  };

  return (
    <View style={styles.content}>
      <Card style={{backgroundColor: myColors.white}}>
        <Card.Content>
          <Controller
            control={control}
            name="title"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                style={[styles.formInput, errors.title && styles.formError]}
                placeholder="Title"
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="description"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                style={[
                  styles.formInput,
                  errors.description && styles.formError,
                ]}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="price"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                keyboardType="number-pad"
                style={[styles.formInput, errors.price && styles.formError]}
                placeholder="Price (IDR)"
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="min_age"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                keyboardType="number-pad"
                style={[styles.formInput, errors.min_age && styles.formError]}
                placeholder="Minimum Age"
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="date"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <>
                <Button onPress={onShowDate}>
                  {value
                    ? dayjs(value).format('YYYY-MM-DD, HH:m').toString()
                    : 'Select Date'}
                </Button>
                {showDate && (
                  <DatePicker
                    value={value || new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={(value) => {
                      onChange(value.nativeEvent.timestamp);
                      setShowDate(false);
                    }}
                  />
                )}
              </>
            )}
          />
          <Divider />

          <Button
            mode="contained"
            style={styles.button}
            color={myColors.red}
            onPress={handleSubmit(onPostEvent)}>
            Post Event
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

export default PostEO;

const styles = StyleSheet.create({
  content: {
    width: '90%',
    marginVertical: 20,
  },
  textDark: {
    color: myColors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
  formInput: {
    borderRadius: 20,
    backgroundColor: myColors.backgroundWhite,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
  },
  formError: {
    borderWidth: 1,
    borderColor: myColors.red,
  },
});
