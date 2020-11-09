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
  const [imageExplanation, setImageExplanation] = useState('');
  const [imageCopyright, setImageCopyright] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      //const url = formatApiUrl(date);
      const url = 'http://192.168.0.11:3001/';
      const result = await axios.get(url)
        .then(async (result) => {
          await setImageDate(result.data.date);
          await setImageUrl(result.data.url);
          await setImageTitle(result.data.title);
          await setImageExplanation(result.data.explanation);
          await setImageCopyright(result.data.copyright);
        })
        .catch(error => console.log(error));
    };

    fetchData();
  }, []);

  return { imageDate, imageUrl, imageTitle, imageExplanation, imageCopyright };

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
  }, []);

  let url = imageData.imageUrl;
  if (url === '')
    url = 'https://media.tenor.com/images/0aa52fcc80b91529b747493f9fc2a978/tenor.gif';

  return (
    <View>
      <View>
        <Text style={styles.heading}>Nasa API - Astronomy Picture of the Day (APOD)</Text>
      </View>
      <ScrollView>
        <Text style={styles.imageTitle}>{'Title: ' + imageData.imageTitle}</Text>
        <Text style={styles.imageDate}>{'Picture of the day: ' + imageData.imageDate}</Text>
        <Image source={{ uri: url }} style={styles.imageContainer} />
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={showMore ? undefined : 4}
          style={styles.imageExplanation}>{'Explanation: ' + imageData.imageExplanation}
        </Text>
        {!textFits &&
          <Text
            onPress={toggleShowMore}
            style={styles.showMoreText}>{showMore ? 'Read less...' : 'Read more...'}</Text>
        }
      </ScrollView>
      <View>
      <Text style={styles.imageCopyright}>{'Copyright: ' + imageData.imageCopyright}</Text>
      </View>
    </View>
  );
};
