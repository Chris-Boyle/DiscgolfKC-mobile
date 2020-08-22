/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from 'components/header';
import Footer from 'components/footer';
import Headerstyle from 'styles/Headerstyle';

const App = () => {
  const headerStyle = Platform.select({
    ios: Headerstyle.iOSHeader,
    android: Headerstyle.header,
  });
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header headerStyle={headerStyle} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          contentContainerStyle={{paddingTop: 30}}>
          <View>
            <Text>Discgolf KC</Text>
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    backgroundColor: '#F5F5F5',
  },
  content: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
