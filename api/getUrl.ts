import React from 'react'
import { PlantData } from '../types/Flowers'
import { REACT_APP_API_KEY } from '@env';


export const GetFlowers = async (pageNr: number, searchQuery: string = '', filters: { [key: string]: boolean }) => {
  try {
    // Code to build URL with filters (same as in your original function)
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

    // Handle the response (same as in your original function)

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




export const SearchFlowers = async (pageNr: number, searchQuery: string = '', filters: { [key: string]: boolean }) => {
  try {
    // Code to build URL with filters (same as in your original function)
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

    // Handle the response (same as in your original function)

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
