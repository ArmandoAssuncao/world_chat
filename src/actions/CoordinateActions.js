import { LOAD_COORDINATE, LOAD_COORDINATE_ERROR } from './actionTypes';

export const saveCoordinate = (coordinate) => (dispatch) => {
  console.warn('11', coordinate);
  let coord = null;
  if(typeof coordinate === 'object' && typeof coordinate.lat === 'number' && typeof coordinate.lon === 'number') {
    coord = coordinate;
  }
  dispatch( {type: LOAD_COORDINATE, payload: coord} );
};