export interface Place {
  id?: string;
  name: string;
  address: string;
  px?: number;
  py?: number;
}

export interface EventNameInputProps {
  value: string;
  onChange: (name: string) => void;
  className?: string;
  selectedLocation?: string;
}

export interface LocationState {
  center: {
    latitude: number;
    longitude: number;
  };
  moveToLocation: (latitude: number, longitude: number) => void;
}

export interface LocationInputProps {
  className?: string;
  value: string;
  onSelect: (place: Place) => void;
}

export interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
}

export interface SearchResultsProps {
  results: Place[];
  searchTerm: string;
  onSelect: (place: Place) => void;
}

export interface SearchResultItemProps {
  place: Place;
  searchTerm: string;
  onClick: () => void;
}
