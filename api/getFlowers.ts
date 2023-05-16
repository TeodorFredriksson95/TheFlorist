import React from 'react'
import { PlantData } from '../types/Flowers'
import { REACT_APP_API_KEY } from '@env';
export const GetFlowers = async (pageNr: number, searchQuery: string = '') => {
  try {
    let url = '';

    // If a search query is provided, use the search endpoint
    if (searchQuery !== '') {
      // Replace spaces with '%20' in the search query
      const encodedQuery = searchQuery.replace(/ /g, '%20');
      url = `https://trefle.io/api/v1/plants/search?token=${REACT_APP_API_KEY}&q=${encodedQuery}&page=${pageNr}`;
    } else {
      // Otherwise, use the general endpoint
      url = `https://trefle.io/api/v1/plants?token=${REACT_APP_API_KEY}&page=${pageNr}`;
    }


    //let user choose between filters, for example
    //color [values]
    //edible [values] (or maybe restrict to 1 simple value?)
    //some other filter, for funsies?

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


    const response = await fetch(url);

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

    return flowers;
  } catch (error) {
    console.error(error);
  }
};
