import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';
import { setToken } from './redux/slices/authSlice';
import RootNavigator from './navigation/RootNavigator';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        dispatch(setToken(token));
      }
    } catch (e) {
      console.error('Failed to restore token:', e);
    }
  };

  return <RootNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppContent />
      </SafeAreaView>
    </Provider>
  );
}
