import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

import Copyright from './layout/copyright';

import { useRecoilValue } from 'recoil';
import { chosenSubjectState } from '../store';

import { icons } from '../images/icons';
import { useRecoilState } from 'recoil';
import { correctAnswers } from '../store';

export default function QuestionScreen({ route, navigation }) {

  const subject = useRecoilValue(chosenSubjectState);
  const questions = subject.questions[0];

  const [correctAnswer, setCorrectAnswer] = useRecoilState(correctAnswers);

  function handlePress(answer) {
    if (answer === questions.correct) {
      const correct = [
        ...correctAnswer,
        subject.id
      ]

      setCorrectAnswer(correct);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{questions.question}</Text>
      <Pressable style={[styles.button, styles.color(subject.color)]} onPress={() => handlePress(1)}>
      <Image style={styles.image} source={icons[icons.findIndex(i => i.color === subject.color )].image}/>
        <View style={styles.column}>
          <Text style={styles.buttontext}>{questions.answer1}</Text>
        </View>
      </Pressable>
      <Pressable style={[styles.button, styles.color(subject.color)]} onPress={() => handlePress(2)}>
      <Image style={styles.image} source={icons[icons.findIndex(i => i.color === subject.color )].image}/>
        <View style={styles.column}>
          <Text style={styles.buttontext}>{questions.answer2}</Text>
        </View>
      </Pressable>
      <Pressable style={[styles.button, styles.color(subject.color)]} onPress={() => handlePress(3)}>
      <Image style={styles.image} source={icons[icons.findIndex(i => i.color === subject.color )].image}/>
        <View style={styles.column}>
          <Text style={styles.buttontext}>{questions.answer3}</Text>
        </View>
      </Pressable>
      <Copyright />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start'
  },
  color: bgColor => ({
    backgroundColor: bgColor
  }),
  label: {
    marginBottom: 15,
    padding: 5,
    fontSize: 20,
  },
  button: {
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
    color: 'white',
    marginLeft: 10
  }
});