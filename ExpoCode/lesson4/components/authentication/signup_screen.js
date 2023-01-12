import { useState } from 'react';

import '../../config/firebase';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth();

import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUpScreen() {
  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }


  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  return (
    <View style={styles.container}>
      {!!value.error && <Text style={styles.error}>{value.error}</Text>}

      <Input
        placeholder='Email'
        containerStyle={styles.control}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        leftIcon={<Icon
          name='envelope'
          size={16}
        />}
      />

      <Input
        placeholder='Password'
        containerStyle={styles.control}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16}
        />}
      />

      <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 300
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#C1023B',
    fontWeight: 'bold'
  }
});