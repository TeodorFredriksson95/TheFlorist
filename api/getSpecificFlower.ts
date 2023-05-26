import React from 'react'
import { PlantData } from '../types/Flowers'
import { REACT_APP_API_KEY } from '@env';
import { MainSpecies, CategoryImages, SpecificFlowerData, CommonNamesTranslated } from '../types/Flowers';

type ImageData = { image_url: string }[];

export const getSpecificFlowerData = async (id: number): Promise<SpecificFlowerData | null> => {
  try {
    const response = await fetch(`https://trefle.io/api/v1/plants/${id}?token=${REACT_APP_API_KEY}`);
    const result = await response.json();
    const { main_species: mainSpecies } = result.data as { main_species: MainSpecies };
    const { images, common_names } = mainSpecies;

    const imageUrlsByCategory: CategoryImages = {};

    // Iterate over the images object
    for (const category in images) {
      const categoryImages: ImageData = images[category];
      const imageUrls = categoryImages.map(image => image.image_url);
      imageUrlsByCategory[category] = imageUrls;
    }

    const commonNamesTranslated: CommonNamesTranslated = {};

    // Iterate over the common_names object
    for (const language in common_names) {
      const commonNames = common_names[language];
      commonNamesTranslated[language] = commonNames;
    }

    return {
      mainSpecies: mainSpecies,
      categoryImages: imageUrlsByCategory,
      commonNamesTranslated: commonNamesTranslated
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
