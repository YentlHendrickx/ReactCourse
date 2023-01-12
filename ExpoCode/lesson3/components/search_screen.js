import { TextInput, View, StyleSheet, FlatList } from 'react-native';

import { useEffect, useState } from 'react';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_FILTERED_COUNTRIES } from '../gql/queries';
import Separator from './seperator';
import Fetching from './message_fetching';
import Error from './message_error';
import CountryItem from './item_country';

export default function SearchScreen() {
  const [searchFilter, setSearchFilter] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [findCountries, { data, loading, error }] = useLazyQuery(GET_FILTERED_COUNTRIES, {variables: {filter: searchFilter}});

  useEffect(() => {
    const result = findCountries({variables: {name: searchFilter}})
    setCountryList(result);
  }, [searchFilter])

  
  function handleChangeFilter(value) {
    setSearchFilter(value);
  }
  
  return (
    <View>
      <TextInput
        placeholder='-- enter some letters --'
        onChangeText={handleChangeFilter}
        style={styles.input}
        value={searchFilter}
      />

    {loading && 
      <Fetching />
    }
    {error && 
      <Error error={error}/>
    }
    {!loading && !error && 
      <FlatList
      data={countryList}
      renderItem={({ item }) => <CountryItem country={item} />}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={Separator}
      />
    }
  
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
  },
});