export type FlowerProps = {
  item: FetchFlowers
}

export type FetchFlowers = {
    img: string;
    family: string;
    common_name: string;
    scientific_name: string;
    family_common_name: string;
    author: string;
    bibliography: string;
    year: number;
    synonyms: string;
    id: string;
}

export type PlantData = {
  id: string;
  image_url: string;
  
  family: string;
  common_name: string;
  scientific_name: string;
  family_common_name: string;
  author: string;
  bibliography: string;
  year: number;

  synonyms: string[];
};

export type SpecificFlowerData = {
  mainSpecies: MainSpecies;
  categoryImages: CategoryImages;
  commonNamesTranslated: CommonNamesTranslated;
}

export type CategoryImages = {
  [category: string]: string[];
}

export type MainSpecies = {
  id: number;
  common_name: string;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  family_common_name: string | null;
  genus_id: number;
  observations: string;
  vegetable: boolean;
  image_url: string;
  genus: string;
  family: string;
  duration: string | null;
  edible_part: string | null;
  edible: boolean;
  images: {
    [category: string]: {
      id: number;
      image_url: string;
      copyright: string;
    }[];
  };
 common_names: CommonNamesTranslated
}

export type CommonNamesTranslated = {
    [language: string]: string[];
}
