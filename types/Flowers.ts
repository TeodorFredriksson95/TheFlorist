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