import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useState } from 'react';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

export default function App() {
  const [{ loading, error, location, temperature, weather }, setState] =
    useState({
      loading: false,
      error: false,
      location: 'San Francisco',
      temperature: 0,
      weather: '',
    });

  const handleUpdateLocation = async (city: string) => {
    if (!city) return;

    setState({
      loading: true,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    });

    try {
      const locationID = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationID);
      setState({
        loading: false,
        error: false,
        location,
        temperature,
        weather,
      });
    } catch (e) {
      setState({
        loading: false,
        error: true,
        location: '',
        temperature: 0,
        weather: '',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text
                    style={[styles.largeText, styles.textStyle]}
                  >{`${Math.round(temperature)}°`}</Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
});
