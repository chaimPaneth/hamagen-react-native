import _ from 'lodash';
import { ExposuresReducer, ReducerAction } from '../types';
import {
  DISMISS_EXPOSURE,
  REMOVE_VALID_EXPOSURE,
  RESET_EXPOSURES,
  SET_VALID_EXPOSURE,
  UPDATE_EXPOSURES,
  UPDATE_PAST_EXPOSURES,
  UPDATE_FIRST_POINT,
  REPLACE_EXPOSURES,
  REPLACE_PAST_EXPOSURES
} from '../constants/ActionTypes';

const INITIAL_STATE = {
  exposures: [],
  pastExposures: [],
  validExposure: undefined,
  firstPoint: undefined
};


export default (state: ExposuresReducer = INITIAL_STATE, action: ReducerAction) => {

  switch (action.type) {
    case UPDATE_EXPOSURES: {
      const { exposures } = action.payload;

      return { ...state, exposures: _.sortBy([...state.exposures, ...exposures], exposure => exposure.properties.fromTime).reverse() };
    }

    case SET_VALID_EXPOSURE: {
      const { validExposure } = action.payload;
      return { ...state, validExposure };
    }

    case REMOVE_VALID_EXPOSURE: {
      return { ...state, validExposure: undefined };
    }

    case UPDATE_PAST_EXPOSURES: {
      const { pastExposures } = action.payload;
      return {
        ...state, pastExposures:
          _.sortBy([...state.pastExposures, ...pastExposures], exposure => exposure.properties.fromTime).reverse()
      };
    }

    case DISMISS_EXPOSURE: {
      const { exposureId } = action.payload;
      return { ...state, exposures: state.exposures.filter(exposure => exposure.properties.OBJECTID !== exposureId) };
    }

    case RESET_EXPOSURES: {
      return { ...state, exposures: [], pastExposures: [] };
    }

    case UPDATE_FIRST_POINT: {
      return { ...state, firstPoint: action.payload };
    }

    case REPLACE_EXPOSURES: {
      const { exposures } = action.payload;
      return { ...state, exposures }
    }

    case REPLACE_PAST_EXPOSURES: {
      return {
        ...state, pastExposures:
          _.sortBy([...action.payload], exposure => exposure.properties.fromTime).reverse()
      };
    }

    default:
      return state;
  }
};
