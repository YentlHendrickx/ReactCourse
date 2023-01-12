import { View, StyleSheet, Text, Image } from 'react-native'

import Copyright from './layout/copyright';

import { useRecoilValue } from 'recoil';
import { nameState } from '../store';
import { ageGroupState } from '../store';

export default function HoorayScreen() {

  const playerName = useRecoilValue(nameState);
  const playerGroup = useRecoilValue(ageGroupState);

  return (
    <View style={styles.container}>
      <Text style={styles.big}>Well done, {playerName}!</Text>
      <Image source={require('../images/crown.png')} style={styles.image} />
      <Text style={styles.big}>{playerGroup.groupString}</Text>
      <Copyright />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  big: {
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200,
    margin: 10
  }
});