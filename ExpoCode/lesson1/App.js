import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import LotsOfStyles from './components/lots_of_styles';
// import Buttons from './components/buttons';
import Images from './components/images';

export default function App() {
  return (
    <View style={styles.container}>
      <Images />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
