import React from 'react'
import { PlantData } from '../types/Flowers'
import { REACT_APP_API_KEY } from '@env';

export const GetFlowers = async (pageNr: number, searchQuery: string = '', filters: { [key: string]: boolean }) => {
  try {
  const getUrl = () => {
    let url = searchQuery !== '' 
      ? `https://trefle.io/api/v1/plants/search?token=${REACT_APP_API_KEY}&q=${encodeURIComponent(searchQuery)}&page=${pageNr}` // Added encodeURIComponent() function to encode searchQuery.
      : `https://trefle.io/api/v1/plants?token=${REACT_APP_API_KEY}&page=${pageNr}`;

    let filterKeys: string[] = [];
    let edible = '';

    Object.entries(filters).forEach(([filter, value]) => {
      if (value === true) {
        if (filter === 'edible') {
          edible = '&filter_not%5Bedible_part%5D=null';
        } else {
          filterKeys.push(filter);
        }
      }
    });

    if (filterKeys.length > 0 || edible !== '') {
      url += `&filter%5Bflower_color%5D=${filterKeys.join(',')}${edible}`;
    }

    console.log(url)
    return url;
  };

  const response = await fetch(getUrl());

    //if no filter is chosen use following url syntax and simply search
    //https://trefle.io/api/v1/plants/search?q=YOUR_SEARCH_VALUE&token=MY_API_TOKEN



    //check for spaces in the search query. if found, replace them with '%20'. see below example
    //https://trefle.io/api/v1/plants/search?q=FIRST_SEARCH_VALUE%20SECOND_SEARCH_VALUE&token=MY_API_TOKEN



    //if filter is chosen, first check search param and then filter based on the results. see below
    //https://trefle.io/api/v1/plants/search?q=SEARCH_VALUE&filter_not%5Bedible_part%5D=null&token=MY_API_TOKEN



    //if only filter is chosen, see below
    //https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k



    //shows only edible plants
   // https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k


   //shows only edible plants that match query
  // https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k&filter[common_name]=bean



  //searches for rose and then filters on color
  //https://trefle.io/api/v1/plants/search?q=prickly%20rose&filter%5Bflower_color%5D=red&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k



  //filter on edible and several colors
  // https://trefle.io/api/v1/plants?filter_not%5Bflower_color%5D=red,blue&filter_not%5Bedible_part%5D=null&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k




  //filter on edible and several colors, but not nessescarily all
  // https://trefle.io/api/v1/plants?filter%5Bflower_color%5D=red,blue&filter_not%5Bedible_part%5D=null&token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();


    if (!result.data || !Array.isArray(result.data)) {
      throw new Error(`Unexpected response format!`);
    }

    const flowers = result.data.map((data: PlantData) => {
      return {
        id: data.id,
        img: data.image_url,
        family: data.family,
        common_name: data.common_name,
        scientific_name: data.scientific_name,
        author: data.author,
        bibliography: data.bibliography,
        year: data.year,
        synonyms: data.synonyms[0],
      };
    });

    if (flowers.length === 0) {
  throw new Error('No flowers found.');
}

return flowers;

} catch (error) {
    console.error(error);
  }
};
