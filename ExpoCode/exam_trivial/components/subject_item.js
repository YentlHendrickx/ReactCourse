import { Image, View, Text, Pressable, StyleSheet } from 'react-native';
import { icons } from '../images/icons';

import { useRecoilValue } from 'recoil';
import { correctAnswers } from '../store';
import { useEffect, useState } from 'react';

export default function SubjectItem({ subject, onPress, navigation }) {

  const answerCorrect = useRecoilValue(correctAnswers);
  const [color, setColor] = useState(subject.color);

  useEffect(() => {
    if (answerCorrect.find(a => a === subject.id)) {
      setColor("silver");
    }
  }, [answerCorrect])


  return (
    <Pressable style={[styles.button, styles.color(color)]} onPress={() => onPress(subject)} >
      <Image style={styles.image} source={icons[icons.findIndex(i => i.color === subject.color )].image}/>
      <View style={styles.column}>
        <Text style={styles.buttontext}>{subject.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 8,
    margin: 5,
    borderRadius: 15,
  },
  color: bgColor => ({
    backgroundColor: bgColor
  }),
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
    marginLeft: 10
  }
});