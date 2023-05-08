"use strict"

const BASE_URL = 'http://numbersapi.com';

const $submitNum = $('#submit-num');

function handleSubmit(evt) {
    evt.preventDefault();
    const $favoriteNum = $('#favorite-num').val();

    getFavoriteNumInfo($favoriteNum);
}

async function getFavoriteNumInfo(favNum) {

    const response = await axios.get(
        `${BASE_URL}/${favNum}`, 
        {params:{
            "Content-Type":"json"
        }
    });
    
    console.log(response.data);
    // return response
}

$submitNum.on('click', handleSubmit);


