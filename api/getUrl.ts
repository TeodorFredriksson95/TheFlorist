  import { REACT_APP_API_KEY } from '@env';
  
  export const getUrl = async (pageNr: number, searchQuery: string = '', filters: { [key: string]: boolean }) => {
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

    return url;
  };