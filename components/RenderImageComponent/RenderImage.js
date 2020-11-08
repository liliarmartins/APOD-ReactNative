import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

const APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

const formatApiUrl = (date) => {
  let url = APOD_URL;
  try {
    Date.parse(date);
    if (date) {
      url += '&date=' + (new Date(date).toISOString().split('T')[0]);
      console.log(url);
    }
  } catch (err) {
    console.log('Invalid date format: ', date);
  }
  return url;
};

function useApodAPI(date) {
  const [imageDate, setImageDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      //const url = formatApiUrl(date);
      const url = 'http://localhost:3001/';
      const result = await axios.get(url)
        .then(async (result) => {
          await setImageDate(result.data.date);
          await setImageUrl(result.data.url);
          await setImageTitle(result.data.title);
        })
        .catch(error => console.log(error));
    };

    fetchData();
  }, []);

  return { imageDate, imageUrl, imageTitle };

};

export default function RenderImageWithDate(props) {
  const [showMore, setShowMore] = useState(false);
  const [textFits, setTextFits] = useState(false);
  const imageData = useApodAPI(props.date);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const onTextLayout = useCallback(e => {
    setTextFits(e.nativeEvent.lines.length <= 4);
    // console.log(e.nativeEvent);
  }, []);


  const explanation = "As telescopes around planet Earth watch, Mars is growing brighter in night skies, approaching its 2020 opposition on October 13. Mars looks like it's watching too in this view of the Red Planet from September 22. Mars' disk is already near its maximum apparent size for earthbound telescopes, less than 1/80th the apparent diameter of a Full Moon. The seasonally shrinking south polar cap is at the bottom and hazy northern clouds are at the top. A circular, dark albedo feature, Solis Lacus (Lake of the Sun), is just below and left of disk center. Surrounded by a light area south of Valles Marineris, Solis Lacus looks like a planet-sized pupil, famously known as The Eye of Mars . Near the turn of the 20th century, astronomer and avid Mars watcher Percival Lowell associated the Eye of Mars with a conjunction of canals he charted in his drawings of the Red Planet. Broad, visible changes in the size and shape of the Eye of Mars are now understood from high resolution surface images to be due to dust transported by winds in the thin Martian atmosphere.";
  formatApiUrl(props.date);
  //console.log(imageData.imageUrl);
  return (
    <View>
      <View>
         <Text style={styles.heading}>Nasa API - Astronomy Picture of the Day (APOD)</Text>
      </View>
      <ScrollView>
        <Text style={styles.imageTitle}>{'Title: ' + 'Solis Lacus: The Eye of Mars'}</Text>
        <Text style={styles.imageDate}>{'Picture of the day: ' + '2020-03-03'}</Text>
        <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/types-of-flowers-1579719085.jpg' }} style={styles.imageContainer} />
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={showMore ? undefined : 4}
          style={styles.imageExplanation}>{'Explanation: ' + explanation}
        </Text>
        {!textFits &&
          <Text
            onPress={toggleShowMore}
            style={styles.showMoreText}>{showMore ? 'Read less...' : 'Read more...'}</Text>
        }
      </ScrollView>
    </View>
  );
};
