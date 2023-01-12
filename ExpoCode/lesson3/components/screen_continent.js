import { SectionList, Text } from 'react-native';

import Fetching from './message_fetching';
import Error from './message_error';
import Separator from './seperator';

import { useQuery } from '@apollo/client';
import { GET_CONTINENTS_COUNTRIES } from '../gql/queries';

import CountryItem from './item_country';
import ContinentHeader from './header_continent';
import { useEffect, useState } from 'react';

export default function ContinentScreen() {

  const { data, loading, error } = useQuery(GET_CONTINENTS_COUNTRIES);
  const [sectionInfo, setSectionInfo] = useState([])
  
  // if (!loading) {
  //   console.warn(data);
  // }
  if (loading) return <Fetching />
  if (error) return <Error error={error}/>

  useEffect(() => {
    var infoSect = []
    for (var i = 0; i < data.continents.length; i++) {
      const item = {
        title: data.continents[i].name,
        data: data.continents[i].countries
      }
      infoSect.push(item);
    }
    setSectionInfo(infoSect);
  }, [loading])

  return (
    <SectionList
        sections={sectionInfo}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <CountryItem country={item} />}
        ItemSeparatorComponent={Separator}
        renderSectionHeader={({ section }) => <ContinentHeader continent={section} /> }
      />
  
  );
}
