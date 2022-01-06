import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchProps {
  placeholder: string;
  onSubmit: (text: string) => void;
}

export default function SearchInput({ placeholder, onSubmit }: SearchProps) {
  const [location, setLocation] = useState('');

  const handleChangeText = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleSubmitEditing = () => {
    if (!location) return;

    onSubmit(location);
    setLocation('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={location}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
