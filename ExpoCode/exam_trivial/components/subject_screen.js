import { View, StyleSheet, FlatList } from 'react-native'

import SubjectItem from './subject_item';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Copyright from './layout/copyright';

import { useQuery } from '@apollo/client';
import { GET_SUBJECTS_AND_QUESTIONS } from '../gql/queries';
import Separator from '../components/layout/seperator'
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { correctAnswers, subjectsState } from '../store';
import { chosenSubjectState } from '../store';

import { useRecoilValue } from 'recoil';

export default function SubjectScreen({ navigation }) {
  
  const { data, loading, error} = useQuery(GET_SUBJECTS_AND_QUESTIONS);
  const [chosenSubject, setChosenSubject] = useRecoilState(chosenSubjectState);
  const correctAnswerArray = useRecoilValue(correctAnswers);

  useEffect(() => {
    if (data) {
      for (var i = 0; i < data.subjects.length; i++) {
        if (correctAnswerArray.find(a => a === data.subjects[i].id) === undefined) {
          // console.warn("NOT ALL COMPLETED");
          return;
        }
      }
      navigation.navigate('HoorayScreen');
    }
  }, [correctAnswerArray])

  if (loading) return <Fetching />
  if (error) return <Error error={error}/>

  function handleSubject(subject) {
    setChosenSubject(subject);
    navigation.navigate('QuestionScreen');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.subjects}
        renderItem={({item}) => <SubjectItem subject={item} onPress={handleSubject} />}
        keyExtractor={(item, index) => index}
        ItemSeperatorComponent={Separator}
      />
      <Copyright />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
});