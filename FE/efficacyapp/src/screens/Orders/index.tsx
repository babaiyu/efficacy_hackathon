import {Tabs} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabFinish from './TabFinish';
import TabSoon from './TabSoon';

function Orders() {
  // State
  const [dataSoon] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <View style={styles.container}>
      <Tabs>
        <TabSoon title="Soon" data={dataSoon} />
        <TabFinish title="Finish" data={dataSoon} />
      </Tabs>
    </View>
  );
}

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
