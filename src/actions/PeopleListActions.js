import { LOAD_PEOPLE_LIST, LOAD_PEOPLE_LIST_ERROR } from './actionTypes';
import { generateRandomInt } from './../utils/utils';

export const loadPeopleList = () => (dispatch) => {

  // Emulate response data of a Request
  let response = [];
  for(let i = 0; i < 20; i++) {
    response.push(generatePerson());
  }

  dispatch( {type: LOAD_PEOPLE_LIST, payload: response} );
};

const generatePerson = () => {
  const sizeImg = generateRandomInt(10, 40);
  return {
    name: 'Clark Kent',
    age: generateRandomInt(20, 50),
    gender: 'Male',
    description: 'This is a description',
    picture_url: `http://pipsum.com/${sizeImg}x${sizeImg}.jpg`,
    latlng: {
      latitude: generateRandomInt(-90, 90),
      longitude: generateRandomInt(-180, 180),
    },
  };
};