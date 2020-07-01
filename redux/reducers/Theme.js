import { THEMES } from '../../themes/index';

const initialState = {
  themeData: THEMES.primary
};

const Theme = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      switch (action.payload.name) {
        case 'primary':
          return { themeData: THEMES.primary }
        case 'secondary':
          return { themeData: THEMES.secondary }
        default:
          return { themeData: THEMES.primary }
      }
    default:
        return state;
  }
};

export default Theme;