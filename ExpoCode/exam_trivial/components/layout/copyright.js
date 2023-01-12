import { Text, StyleSheet } from 'react-native';

export default function Copyright() {
  return (
    <Text style={styles.name}>{'\u00A9'} Yentl Hendrickx - r0842908</Text>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});