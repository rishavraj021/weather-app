import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '3fbe0d055ddcea5c2b3294c7ced58506'; // Replace with your actual API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        placeholderTextColor="gray"  // Set the placeholder text color
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={getWeather} />

      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <ScrollView style={styles.result}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.details}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.details}>Weather: {weatherData.weather[0].description}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
    color: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    color: 'white',
  },
  result: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    color: 'white',
  },
  details: {
    color: 'white',
    textTransform: 'capitalize',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  error: {
    color: 'red',
  },
});

export default App;