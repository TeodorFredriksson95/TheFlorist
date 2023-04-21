export type FlowerProps = {
  item: FetchFlowers
}

export type FetchFlowers = {
    img: string;
    family: string;
    common_name: string;
    scientific_name: string;
    synonyms: string;
    id: string;
}

export type PlantData = {
  image_url: string;
  family: string;
  common_name: string;
  scientific_name: string;
  synonyms: string[];
  id: string;
};