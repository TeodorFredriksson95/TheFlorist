

// export async function getFlowers() {
//     let _headers = { 'Accept': 'application/json' };
    
//     const response = await fetch( 'https://trefle.io/api/v1/plants?token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k' , {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//             img: data.image_url,
//             family: data.family,
//         }),
//     }).then(res => res.json());
    
//     // const flowers = response.data.map((data) => { return {img: data.image_url, family: data.family}});
//     return response;
// };

 const getFlowers = async () => {
    try {
    const response = await fetch('https://trefle.io/api/v1/plants?token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k',)
    const json = await response.json();

    console.log(json.data.map((data) => {return {img: data.image_url}}))

    return {img: json.img_url, family: json.family};
    } catch (error){
        console.error(error);
    }
 };

getFlowers();


