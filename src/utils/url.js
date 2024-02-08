export const BASE_DJANGO_URL = "http://localhost:8000/";
export const GET_TOKEN_URL = BASE_DJANGO_URL + "accounts/token/";
export const REFRESH_TOKEN_URL = BASE_DJANGO_URL + "accounts/token/refresh/";
export const SIGNUP_URL = BASE_DJANGO_URL + "accounts/signup/";
export const CLUELESS_URL = BASE_DJANGO_URL + "clueless/";
export const USERS_URL = BASE_DJANGO_URL + "accounts/users/";
export const PROFILE_URL = BASE_DJANGO_URL + "accounts/profile/";
export const DEACTIVATION_URL =
  BASE_DJANGO_URL + "accounts/profile/deactivate/";

export const ACTIVATE_URL = BASE_DJANGO_URL + "accounts/profile/activate/";

export const GET_WEATHER_WIDGETS_URL = BASE_DJANGO_URL + "weather/get_weather/";

export const ADD_WEATHER_WIDGET_URL = BASE_DJANGO_URL + "weather/add_widget/";

export const VERIFY_LOCATION_URL = BASE_DJANGO_URL + "weather/verify_location/";

export const REMOVE_WEATHER_WIDGET_URL =
  BASE_DJANGO_URL + "weather/remove_widget/";
