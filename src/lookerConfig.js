export const lookerConfig = {
  // Embed configuration
  host: process.env.REACT_APP_LOOKER_HOST || 'example.looker.com',
  exploreId: process.env.REACT_APP_LOOKER_EXPLORE,
  tab1DashboardId: process.env.REACT_APP_LOOKER_DASHBOARD_TAB_1,
  tab2DashboardId: process.env.REACT_APP_LOOKER_DASHBOARD_TAB_2,
  tab1LookId: process.env.REACT_APP_LOOKER_LOOKS_TAB_1,
  tab2LookId: process.env.REACT_APP_LOOKER_LOOKS_TAB_2,
  singleCards: process.env.REACT_APP_SINGLE_CARDS,
  timeSeries: process.env.REACT_APP_TIMESERIES,

  // SDK configuration
  baseUrl:
    process.env.REACT_APP_LOOKER_API_URL ||
    'https://self-signed.looker.com:19999',
  proxyUrl: process.env.REACT_APP_LOOKER_PROXY_URL,
}
