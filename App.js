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
import Headerstyle from 'styles/HeaderStyle';
import {getSortedCoursesData} from './lib/courses';

const App = () => {
  const headerStyle = Platform.select({
    ios: Headerstyle.iOSHeader,
    android: Headerstyle.header,
  });

  const courses = getSortedCoursesData();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Header headerStyle={headerStyle} />
        <ScrollView>
          {courses.map(({id, date, title}) => (
            <View>
              <Text>{title}</Text>
            </View>
          ))}
        </ScrollView>
        <Footer footerStyle={Headerstyle.footer} />
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
    flex: 1,
  },
  content: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
