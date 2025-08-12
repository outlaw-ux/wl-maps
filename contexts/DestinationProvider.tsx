import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Filters } from '../types';

interface IDestinationContextType {
  destination: L.LatLng | null;
  setDestination: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
  sidepanelOpen: boolean;
  setSidepanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentFilter: Filters | null;
  setCurrentFilter: React.Dispatch<React.SetStateAction<Filters | null>>;
  destinationTitle: string;
  setDestinationTitle: React.Dispatch<React.SetStateAction<string>>;
}

const DestinationContext = createContext<IDestinationContextType | undefined>(
  undefined
);

export const DestinationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sidepanelOpen, setSidepanelOpen] = useState(false);
  const [destination, setDestination] = useState<L.LatLng>(null);
  const [destinationTitle, setDestinationTitle] = useState<string>('');
  const [currentFilter, setCurrentFilter] = React.useState<Filters | null>(
    null
  );

  return (
    <DestinationContext.Provider
      value={{
        destination,
        setDestination,
        sidepanelOpen,
        setSidepanelOpen,
        currentFilter,
        setCurrentFilter,
        destinationTitle,
        setDestinationTitle,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinationContext = () => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error(
      'useDestinationContext must be used within a DestinationContextProvider'
    );
  }
  return context;
};
