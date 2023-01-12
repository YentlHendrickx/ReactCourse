import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { RecoilRoot } from 'recoil';

import PlayerScreen from './components/player_screen';
import SubjectScreen from './components/subject_screen';
import QuestionScreen from './components/question_screen';
import HoorayScreen from './components/hooray_screen';

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import configData from "./config/graphql.json";

const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    'x-hasura-admin-secret': configData.qlkey
  },
  cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='PlayerScreen'>
            <Stack.Screen name="PlayerScreen" component={PlayerScreen} options={{title: "Player"}}/>
            <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{title: "Choose a Subject"}}/>
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{title: "Question"}}/>
            <Stack.Screen name="HoorayScreen" component={HoorayScreen} options={{title: "Hooray"}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </RecoilRoot>
  );
}