import React, { useState } from 'react'
import { PlantData } from '../types/Flowers'

export const GetFlowers = async (pageNr: number) => {

      try {
      const response = await fetch('https://trefle.io/api/v1/plants?token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k&page=' + pageNr);

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

      return flowers
    }
    catch (error) {
      console.error(error)
    }     
};