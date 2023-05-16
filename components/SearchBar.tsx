import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          placeholder="Search..."
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
            <Icon name="times-circle" size={20} color="#000" />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: '#ffe6e6'
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#ffcc00',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  clearIcon: {
    marginRight: 5,
  },
  buttonContainer: {
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0066',
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SearchBar;
