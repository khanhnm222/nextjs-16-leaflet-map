'use client';

import { LeafletTileLayer } from "@/components/features";
import { LeafletMap } from "@/components/features/LeafletMap";
import { useMapTileProvider } from "@/hooks/useMapTileProvider";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

const MapDetailsPanel = dynamic(() => import('../components/features/MapDetailsPanel'), { ssr: false });

const MainMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<GeoJSON.Feature | null>(null);
  const [isSelectingPOILocation, setIsSelectingPOILocation] = useState(false);
  const [cursorCoords, setCursorCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [poiInitialCoords, setPOIInitialCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Use custom hook for theme-aware tile provider management
  const { tileProvider, currentProviderId, setProviderId } =
    useMapTileProvider();

  // Handle map click for POI location selection
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      console.log("Map clicked at:", lat, lng);
      // Logic to handle map click for POI location selection
      if (isSelectingPOILocation) {
        setPOIInitialCoords({ lat, lng });
        setIsSelectingPOILocation(false);
        setCursorCoords(null);
      }
    },
    []
  );
  // Handle map mouse move for cursor tracking
  const handleMapMouseMove = useCallback(
    (lat: number, lng: number) => {
      // Logic to handle map mouse move for cursor tracking
      if (isSelectingPOILocation) {
        setCursorCoords({ lat, lng });
      }
    },
    []
  );
  const handleClearSelection = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const tileLayerProps = useMemo(() => ({
    url: tileProvider.url,
    attribution: tileProvider.attribution,
    maxZoom: tileProvider.maxZoom,
  }), [tileProvider]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <LeafletMap
        className="w-full h-full"
        onClick={handleMapClick}
        onMouseMove={handleMapMouseMove}
        cursorStyle={isSelectingPOILocation ? "crosshair" : "grab"}
      >
        <LeafletTileLayer
          url={tileLayerProps.url}
          attribution={tileLayerProps.attribution}
          maxZoom={tileLayerProps.maxZoom}
        />
      </LeafletMap>
      {/* Country Details Panel */}
      <MapDetailsPanel
        country={selectedCountry}
        onClose={handleClearSelection}
      />
    </div>
  );
};
export default MainMap;
