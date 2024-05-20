export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export const INITIAL_LOCATION = {
  latitude: 53.3418237,
  longitude: -6.2870543,
  zoom: 15,
}

export const INITIAL_VIEWSTATE = {
  longitude: INITIAL_LOCATION.longitude,
  latitude: INITIAL_LOCATION.latitude,
  zoom: INITIAL_LOCATION.zoom,
  bearing: 0,
  pitch: 0,
  // Disable all interactions
  scrollZoom: false,
  boxZoom: false,
  dragRotate: false,
  dragPan: false,
  keyboard: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  touchPitch: false,
}
