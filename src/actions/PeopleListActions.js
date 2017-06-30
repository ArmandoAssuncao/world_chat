import { LOAD_PEOPLE_LIST, LOAD_PEOPLE_LIST_ERROR } from './actionTypes';
import { generateRandomInt } from './../utils/utils';

export const loadPeopleList = () => (dispatch) => {
  // Emulate response data of a Request
  let response = [];
  for(let i = 0; i < 50; i++) {
    response.push(generateLeague());
  }

  dispatch( {type: LOAD_PEOPLE_LIST, payload: response} );
};

// To test
const generatePerson = () => {
  const sizeImg = generateRandomInt(10, 40);
  return {
    id: generateRandomInt(1, 50000).toString(),
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

// To test
const generateLeague = () => {
  const names = ['batman', 'Hawkwoman', 'Superman', 'Black Canary', 'Flash', 'Wonder Woman'];
  const descriptions = [
    'Morcegos me assustam. Está na hora de meus inimigos compartilharem desse terror',
    'Quem na vida prefere seguir por atalhos jamais aproveita bem o caminho.',
    'Sinto como se vivesse em um mundo feito de papelão',
    'Aproveite o dia de hoje e nada espere do dia seguinte.',
    'O raio não me deu apenas velocidade, também me deu amigos.',
    'É o nosso dever sagrado defender o mundo e é isso que eu vou fazer.'
  ];
  const images_url = [
    require('./../imgs/picture_1.jpg'),
    require('./../imgs/picture_2.jpg'),
    require('./../imgs/picture_3.jpg'),
    require('./../imgs/picture_4.jpg'),
    require('./../imgs/picture_5.jpg'),
    require('./../imgs/picture_6.jpg'),
  ];
  const id = generateRandomInt(0, 6);

  return {
    id: id.toString(),
    name: names[id],
    age: generateRandomInt(20, 50),
    gender: id%2 === 0 ? 'Male' : 'Female',
    description: descriptions[id],
    picture_url: images_url[id].toString(),
    latlng: {
      latitude: generateRandomInt(-90, 90),
      longitude: generateRandomInt(-180, 180),
    },
  };
};