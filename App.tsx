/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NativeModules, NativeEventEmitter} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [osInfo, setOsInfo] = useState('');
  const [messageText, setMessageText] = useState('');
  const [ready, setReady] = useState(false);
  const hoge = NativeModules.Hoge;

  const notification1 = () => {
    console.log('notification1');
    // if the native hoge module is set up, call native 'Notify' function
    if (ready) {
      hoge.notify('Hello, n1');
    }
  };

  const notification2 = () => {
    console.log('notification2');
    // if the native hoge module is set up, call native 'Notify' function
    if (ready) {
      hoge.notify('Bye, n2');
    }
  };

  const {Hoge} = NativeModules;
  let emitter = new NativeEventEmitter(Hoge);

  useEffect(() => {
    console.log('component mounted!');
    console.log('hoge: ', hoge);
    setReady(true);

    // call native 'getOSInfo' function
    hoge.getOSInfo((os, version) => {
      setOsInfo(`${os} ${version}`);
    });

    // register listener for 'NotificationFromiOS' native event
    // used in OnNotify() native function
    emitter.addListener('NotificationFromiOS', ({message}) => {
      console.log(`message received: ${message}`);
      setMessageText(`${message}`);
    });
  }, []); //notice the empty array here

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Native Function</Text>
            <View style={styles.sectionContainer}>
              <Text>OS Info: {osInfo}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Button title="Send Notification1" onPress={notification1} />
              <Button title="Send Notification2" onPress={notification2} />
            </View>
            <View style={styles.sectionContainer}>
              <Text>Result</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text>{messageText}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
