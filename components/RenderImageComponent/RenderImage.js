/** 
 * @component RenderImage
 * @author Lilia Ramalho Martins <rama0072@algonquinlive.com>
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

//NASA APOD API base URL
const APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

/**
* Add the date parameter to the base url string.
* @param {date} date - date to be appended to the base url string.
* @return {string} formated url string to get the image of the given date.
*/
const formatApiUrl = (date) => {
  let url = APOD_URL;
  try {
    //Check if date is in a valid format.
    Date.parse(date);
    if (date) {
      //Append date parameter in yyyy-mm-dd format.
      url += '&date=' + (new Date(date).toISOString().split('T')[0]);
    }
  } catch (err) {
    console.log('Invalid date format: ', date);
  }
  //If given date is invalid, base url will be returned.
  return url;
};

/**
* Custom hook function to fetch (and return) data from the NASA API.
* @param {date} date - date of the image to be fetched.
* @return {object} object with the relevant fields from API's returned json.
*/
function useApodAPI(date) {
  const [imageDate, setImageDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageExplanation, setImageExplanation] = useState('');
  const [imageCopyright, setImageCopyright] = useState('');

  //useEffect hook to async fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      const url = formatApiUrl(date);
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

/**
* Functional component to Render Image data.
* @param {object} props - props from parent Component with date parameter.
*/
export default function RenderImageWithDate(props) {
  //showMore and textFits useState hooks are used to handle explanation text collapsing.
  const [showMore, setShowMore] = useState(false);
  const [textFits, setTextFits] = useState(false);

  //call useApodAPI to get image data
  const imageData = useApodAPI(props.date);

  //togle show more/less explanation text
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  //checks if explanation text is bigger than 4 lines and sets textFits state hook
  const onTextLayout = useCallback(e => {
    setTextFits(e.nativeEvent.lines.length <= 4);
  }, []);

  return (
    <View>
      <View>
        <Text style={styles.heading}>Nasa API - Astronomy Picture of the Day (APOD)</Text>
      </View>
      <ScrollView>
        <Text style={styles.imageTitle}>{imageData.imageTitle ? 'Title: ' + imageData.imageTitle : null}</Text>
        <Text style={styles.imageDate}>{imageData.imageDate ? 'Picture of the day: ' + imageData.imageDate : null}</Text>
        <Image source={imageData.imageUrl ? { uri: imageData.imageUrl } : null} style={styles.imageContainer} />
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={showMore ? undefined : 4}
          style={styles.imageExplanation}>{imageData.imageExplanation ? 'Explanation: ' + imageData.imageExplanation : null}
        </Text>
        {!textFits &&
          <Text
            onPress={toggleShowMore}
            style={styles.showMoreText}>{showMore ? 'Read less...' : 'Read more...'}</Text>
        }
      </ScrollView>
      <View>
      <Text style={styles.imageCopyright}>{imageData.imageCopyright ? 'Copyright: ' + imageData.imageCopyright : null}</Text>
      </View>
    </View>
  );
};
