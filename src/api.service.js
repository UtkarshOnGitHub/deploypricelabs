import env from "../environmentVariables.json";

const apiUrl = env.API_URL;
const apiPayload = env.API_PAYLOAD;

const fetchData = async (address, count,lat,lon) => {
  try {
    apiPayload.variables.input.location.searchString = address;
    apiPayload.variables.input.location.latitude = lat || 41.8804017;
    apiPayload.variables.input.location.longitude = lon ||  -87.6302038;
    apiPayload.variables.input.pagination.rowsPerPage = count;

    let apiResp = await fetch(
      // apiUrl,
      `https://cors-anywhere.herokuapp.com/${apiUrl}`,
      {
        method: "POST",
        body: JSON.stringify(apiPayload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    apiResp = await apiResp.json();
    return apiResp?.data?.searchQueries?.search?.results || [];
  } catch (err) {
    console.log(`Error while fetching data from api : ${err}`);
    return [];
  }
};

export default fetchData;
