import React from 'react'
import { PlantData } from '../types/Flowers'
import { REACT_APP_API_KEY } from '@env';
export const GetFlowers = async (pageNr: number, searchQuery: string = '') => {
  try {
    console.log('GetFlowers is being called');

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
    console.log('URL:', url); // Log the constructed URL

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
