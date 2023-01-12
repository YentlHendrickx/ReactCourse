import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import UsaDB from '../usa_db';

export default function DetailsPresident({route, navigation}) {
  const [president, setPresident] = useState({id: 0, name: '', term: ''});
  const { id } = route.params;

  useEffect(() => {
    if (id !== 0) {
      getPresidentById(id);
    }
  }, [])

  async function getPresidentById(id) {
    const result = await UsaDB.getPresidentById(id);
    setPresident(result);
  }

  async function updatePresident(president) {
    await UsaDB.updatePresident(president);
  }

  async function deletePresident(id) {
    await UsaDB.deletePresident(id);
  }

  async function insertPresident(president) {
    await UsaDB.insertPresident(president);
  }


  function handleChangeName(value) {
    setPresident({ ...president, name: value });
  }

  function handleChangeTerm(value) {
    setPresident({ ...president, term: value });
  }
  
  function handleOnPress() {
    updatePresident(president);
    navigation.goBack();
  }

  function handleDelete() {
    deletePresident(president.id);
    navigation.goBack();
  }

  function handleInsert() {
    insertPresident(president);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChangeName}
        style={styles.input}
        value={president.name}
      />
      <TextInput
        onChangeText={handleChangeTerm}
        style={styles.input}
        value={president.term}
        keyboardType='numeric'
      />

      {id !== 0 &&
      <>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.name}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.name}>Delete</Text>
      </TouchableOpacity>
      </>
      }

      {id == 0 &&
      <>
      <TouchableOpacity style={styles.button} onPress={handleInsert}>
        <Text style={styles.name}>Insert</Text>
      </TouchableOpacity>
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  button: {
    backgroundColor: '#cceeff',
    padding: 20,
    marginBottom: 10
  },
  name: {
    fontSize: 20,
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
});