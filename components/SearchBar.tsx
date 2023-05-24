import React, { useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Filters } from '../types/Filters';


interface SearchBarProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: Filters) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFiltersChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    red: false,
    green: false,
    blue: false,
    yellow: false,
    purple: false,
    white: false,
    edible: false,
  });

  const filterKeys: (keyof typeof filters)[] = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'edible'];

  const filterHeight = useRef(new Animated.Value(0)).current;

  const handleFilterButtonClick = () => {
    setFilterVisible(!filterVisible);
    Animated.timing(filterHeight, {
      toValue: filterVisible ? 0 : 150, // Choose the appropriate height here
      duration: 300,
      useNativeDriver: false, // Height cannot be animated using native driver
    }).start();
  };
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };

const toggleFilter = (color: keyof typeof filters) => {
    const newFilters = { ...filters, [color]: !filters[color] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
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
       <TouchableOpacity style={styles.filterButtonContainer} onPress={handleFilterButtonClick}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>
      <Animated.View style={{...styles.filterContainer, height: filterHeight}}>
        {filterVisible && filterKeys.map((filterKey) => (
          <View style={styles.checkboxContainer} key={filterKey}>
            <Checkbox
              status={filters[filterKey] ? 'checked' : 'unchecked'}
              onPress={() => toggleFilter(filterKey)}
            />
            <Text>{filterKey}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: '#ffe6e6'
  },
    searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    filterButtonContainer: {
      width: 50,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffcc66',
      borderRadius: 10,
      marginRight: 10,
      marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#ffcc66',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },  
  checkboxContainer: {
    width: '33%',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
});

export default SearchBar;
