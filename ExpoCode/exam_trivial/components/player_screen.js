import { StyleSheet, TextInput, View, Text, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Copyright from './layout/copyright';

import { useRecoilState } from 'recoil';
import { nameState } from '../store';
import { ageGroupState } from '../store';

import { useQuery } from '@apollo/client';
import { GET_AGE_GROUPS } from '../gql/queries';

export default function PlayerScreen({ navigation }) {
  const {data, loading, error} = useQuery(GET_AGE_GROUPS);

  const [name, setName] = useRecoilState(nameState);
  const [ageGroup, setAgeGroup] = useRecoilState(ageGroupState);

  function handleStart() {
    navigation.navigate('SubjectScreen');
  }

  function handleAgeGroupChange(value) {
    const groupString = data.agegroups[value - 1].title + ' (' + data.agegroups[value - 1].ages + ')';
    setAgeGroup({id: value, groupString: groupString});
  }

  function handleNameChange(value) {
    setName(value);
  }

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        placeholder='Enter your name'
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
      />
      <Text style={styles.label}>Age group:</Text>
      <Picker
        selectedValue={ageGroup.id}
        onValueChange={(itemValue, itemIndex) => {
          handleAgeGroupChange(itemValue);
        }}
      >
        <Picker.Item label={data.agegroups[0].title + ' (' + data.agegroups[0].ages + ')'} value={data.agegroups[0].id}/>
        <Picker.Item label={data.agegroups[1].title + ' (' + data.agegroups[1].ages + ')'} value={data.agegroups[1].id}/>
        <Picker.Item label={data.agegroups[2].title + ' (' + data.agegroups[2].ages + ')'} value={data.agegroups[2].id}/>
        <Picker.Item label={data.agegroups[3].title + ' (' + data.agegroups[3].ages + ')'} value={data.agegroups[3].id}/>
      </Picker>
      <Pressable style={styles.button}>
        <Image source={require('../images/trivial.png')} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.buttontext} onPress={handleStart}>Start Quiz</Text>
        </View>
      </Pressable>
      <Copyright />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
  button: {
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    padding: 8,
    margin: 5,
    borderRadius: 15,
  },
  image: {
    width: 50,
    height: 50,
    margin: 10
  },
  column: {
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  }
});