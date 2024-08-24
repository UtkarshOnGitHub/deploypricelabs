const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const axios = require('axios')

const env = require('./environmentVariables.json');
app.use(cors())



const apiUrl = env.API_URL;
const apiPayload = env.API_PAYLOAD;


const fetchData = async (address, count, lat, lon) => {
  try {
    apiPayload.variables.input.location.searchString = address;
    apiPayload.variables.input.location.latitude = lat || 41.8804017;
    apiPayload.variables.input.location.longitude = lon || -87.6302038;
    apiPayload.variables.input.pagination.rowsPerPage = count

    let apiResp = await axios({
      url: apiUrl,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:apiPayload
    });
    
    let apiRespo = apiResp?.data || [];
    return apiRespo
  } catch (err) {
    console.log(`Error while fetching data from API: ${err}`);
    return [];
  }
};

app.get('/fetch-data', async (req, res) => {
  const { address, count, lat, lon } = req.query;
  let parseNumber = parseInt(count)
  let lati = parseFloat(lat)
  let longi = parseFloat(lon)
  const data = await fetchData(address, parseNumber, lati, longi);
  res.json(data);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
