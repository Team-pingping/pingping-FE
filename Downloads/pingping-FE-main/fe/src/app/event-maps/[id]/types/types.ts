export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationState {
  center: {
    latitude: number;
    longitude: number;
  };
  moveToLocation: (latitude: number, longitude: number) => void;
}

export interface MapComponentProps {
  mapInstance: React.MutableRefObject<naver.maps.Map>;
}

export interface UserProps {
  id: number;
  label: string;
  selectedButton: number;
  handleButtonClick: (id: number) => void;
}
