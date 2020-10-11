import { myColors } from 'constants/colors';
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

type Props = {
  value: string;
  onBlur: () => void;
  onChangeText: (txt: string) => void;
  style: any;
  placeholder: string;
};
function TextInputPassword(props: Props) {
  // State
  const [show, setShow] = React.useState(true);

  // Function
  const onChangeText = (txt: string) => {
    props.onChangeText(txt);
  };

  const onShowPassword = () => {
    const value = !show;
    setShow(value);
  };

  return (
    <View style={styles.row}>
      <View style={{flex: 4}}>
        <TextInput
          onChangeText={(value) => onChangeText(value)}
          onBlur={props.onBlur}
          value={props.value}
          secureTextEntry={show}
          autoCapitalize="none"
          style={props.style}
          placeholder={props.placeholder}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 10,
          width: 35,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton onPress={onShowPassword} icon={!show ? 'eye' : 'eye-off'} color={myColors.gray} />
      </View>
    </View>
  );
}

export default TextInputPassword;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
