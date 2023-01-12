import { View, StyleSheet, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import UsaDB from '../usa_db';
import { useFocusEffect } from '@react-navigation/native';

import { FAB } from 'react-native-elements';

export default function ListPresidents({navigation}) {
  const [data, setData] = useState([]);


  function handleInsert() {
    navigation.navigate('Details', {id: 0});
  }

  function handleOnPress(id) {
    navigation.navigate('Details', {id: id});
  }

  async function getPresidents() {
    const result = await UsaDB.getPresidents();
    setData(result);
  }
  
  useFocusEffect(() => {
    getPresidents();
    console.log(data);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleOnPress(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.term}>{item.term} {item.party}</Text>
          </TouchableOpacity>
        )}
      />
      <FAB
        icon={{name: 'add', color: 'white'}}
        size="large"
        placement='right'
        color="#206587"
        onPress={handleInsert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#cceeff',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 20,
  },
  term: {
    fontSize: 10,
  },
});