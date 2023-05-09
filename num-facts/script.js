"use strict"

const BASE_URL = 'http://numbersapi.com';

const $factContainer = $('.facts-container');
const $submitNum = $('#submit-num');
const $multipleFacts = $('#multiple-facts');


$submitNum.on('click', handleSubmitFavNum);
$multipleFacts.on('click', handleMultipleFacts);

////////////////////////////////////////////////////////////////////////////////
// FAVORITE NUMBER FUNCTIONS

/** handle submission for number entered into form field */

function handleSubmitFavNum(evt) {

    const $favoriteNum = $('#favorite-num').val();

    evt.preventDefault();

    $factContainer.empty();

    // getFavoriteNumInfo($favoriteNum);
    getFourFacts($favoriteNum);
}


/** make get request to retrieve fact on num */

async function getFavoriteNumInfo(favNum) {

    const response = await axios.get(
        `${BASE_URL}/${favNum}`,
        {params:{
            json:""
        }
    });
    //move to function later
    $factContainer.append(`<h2>${response.data.text}</h2>`);
}


////////////////////////////////////////////////////////////////////////////////
// FACTS FOR MULTIPLE NUMBERS FUNCTIONS

/** handle click on "Random!" button  */

function handleMultipleFacts(evt) {

    evt.preventDefault();

    $factContainer.empty();

    getMultipleNumInfo();
}


/** append each fact inside facts object to container */

function listFacts(facts) {

    for (let fact in facts) {
        $factContainer.append(`<h2>${facts[fact]}</h2>`);
    }
}


/** make get request to retrieve facts for numbers 1-4 */

async function getMultipleNumInfo() {

    const response = await axios.get(
        `${BASE_URL}/1..4`
    )

    listFacts(response.data);
}


////////////////////////////////////////////////////////////////////////////////
// GET 4 FACTS FOR SAME NUMBER

/** request 4 facts for num in form field, append to fact-container once
 * all promises are fulfilled
 */

async function getFourFacts(favNum) {

    const r1 = axios({ url: `${BASE_URL}/${favNum}` });
    const r2 = axios({ url: `${BASE_URL}/${favNum}` });
    const r3 = axios({ url: `${BASE_URL}/${favNum}` });
    const r4 = axios({ url: `${BASE_URL}/${favNum}` });

    const results = await Promise.all([r1, r2, r3, r4]);

    //put in separate function
    for (let result of results) {
        $factContainer.append(`<h2>${result.data}</h2>`);
    }
}

//TODO: copy/paste to see results for .allSettled, for try/catch with .all