const cors = require('cors');
const express = require('express');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const inmemoryDB = {}; //this is essentially a global object for storing our data
//when creating new property in object. it must be in a string

app.get('/music', async (request, response) => {
    const artist = request.query.artist; //when user puts in artist request, it is automatically a string value
    const URL = `https://musicbrainz.org/ws/2/artist?query=${artist}&limit=1`;
    if(inmemoryDB[artist] !== undefined){ //if this doesn't exist, do this
        console.log('getting info from DB', artist);
        response.status(200).send(inmemoryDB[artist]); //returns array just fetched
    } else {
        console.log('i do not have this...fetching data')
        try{
            let res = await axios.get(URL);
                const artistArr = res.data.artists.map(artist => new Artist(artist)); //takes new artist and creates a new object
                inmemoryDB[artist] = artistArr; 
                response.status(200).send(artistArr)

        } catch(error){
            console.log(error);
        } finally {
            console.log(inmemoryDB);
        }  
    }}); //url is using search url seen on website
    //in html url request% is used in place of a space 
    


//model for artist return
class Artist {
    constructor(artist){
        this.name = artist.name;
        this.location = artist.country;
    }
} //artist is an array that can be mapped through

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))