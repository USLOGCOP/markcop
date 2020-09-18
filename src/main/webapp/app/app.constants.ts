// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

// For Leaflet map page
export const BASE_NOMINATIM_URL = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

// Set the default search area to Hawaii
export const DEFAULT_LATITUDE = 21.315603;
export const DEFAULT_LONGITUDE = -157.858093;
