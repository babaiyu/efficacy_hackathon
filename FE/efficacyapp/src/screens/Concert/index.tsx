import {useNavigation, useRoute} from '@react-navigation/native';
import {apiGetConcertID} from 'api';
import {myColors} from 'constants/colors';
import dayjs from 'dayjs';
import React from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Card, Title, Text, Caption, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppState} from 'storage/reducers';

const dummy = {
  id: null,
  title: '',
  description: '',
  date: '',
  price: '',
  min_age: 0,
  registred: '',
};

function Concert() {
  // Props
  const userRedux = useSelector((state: AppState) => state.user);
  const navigation = useNavigation();
  const route = useRoute();

  // State
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(dummy);

  // Function
  const onGetConcert = () => {
    setLoading(true);
    const token = userRedux?.dataUser?.token;
    const dataParam: any = route.params;
    apiGetConcertID(dataParam?.id, token)
      .then((res) => {
        if (!res.success) {
          Alert.alert('Alert', res.message);
          setLoading(false);
        } else {
          setData(res.concert);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('Alert', 'Internal Server Error');
        setLoading(false);
      });
  };

  // Life Cycle
  React.useEffect(() => {
    if (data.id === null) {
      onGetConcert();
    }
  });

  // Render
  return (
    <ScrollView
      style={{paddingBottom: 100}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onGetConcert} />
      }>
      <View style={styles.container}>
        <Card style={styles.content}>
          <Card.Content>
            <Image
              source={{
                uri:
                  'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2019/10/How-to-organise-music-concert.jpg',
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
            <Title style={styles.textDark}>{data?.title}</Title>
            <Text style={styles.textDark}>
              {dayjs(data?.date).format('DD MMM YYYY, HH:m')}
            </Text>
            <Caption style={styles.textDark}>{data?.description}</Caption>
            <Caption style={styles.textDark}>Price: Rp. {data?.price}</Caption>
            <Caption style={styles.textDark}>
              Minimum Age: {data?.min_age}
            </Caption>
            <Button
              mode="contained"
              color={myColors.red}
              style={styles.button}
              disabled={data?.min_age > userRedux?.dataUser?.data?.age}
              onPress={() => {}}>
              ORDER
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export default Concert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '90%',
    marginVertical: 20,
    backgroundColor: myColors.backgroundWhite,
  },
  textDark: {
    color: myColors.dark,
  },
  button: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
