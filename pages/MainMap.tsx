'use client';

import { LeafletTileLayer } from "@/components/features";
import { LeafletMap } from "@/components/features/LeafletMap";
import { MapTileSwitcher } from "@/components/features/MapTileSwitcher";
import { MapTopBar } from "@/components/features/MapTopBar";
import { useMapTileProvider } from "@/hooks/useMapTileProvider";
import { POICategory } from "@/types/poi";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

const MapDetailsPanel = dynamic(() => import('../components/features/MapDetailsPanel'), { ssr: false });
const MapControls = dynamic(() => import('../components/features/MapControls'), { ssr: false });

const MainMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<GeoJSON.Feature | null>(null);
  const [isSelectingPOILocation, setIsSelectingPOILocation] = useState(false);
  const [poiFilterCategory, setPOIFilterCategory] =
    useState<POICategory | null>(null);
  const [poiPanelMode, setPOIPanelMode] = useState<"list" | "add">("list");
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

  const handleOpenPOIPanel = useCallback((category?: POICategory) => {
    setPOIFilterCategory(category || null);
    setPOIInitialCoords(null);
    setPOIPanelMode("list");
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      // Map category IDs to POI categories
      const categoryMapping: Record<string, POICategory> = {
        restaurants: "food-drink",
        hotels: "lodging",
        attractions: "tourism",
        transit: "transport",
      };

      const poiCategory = categoryMapping[categoryId.toLowerCase()];
      if (poiCategory) {
        handleOpenPOIPanel(poiCategory);
      }
    },
    [handleOpenPOIPanel]
  );

  const tileLayerProps = useMemo(() => ({
    url: tileProvider.url,
    attribution: tileProvider.attribution,
    maxZoom: tileProvider.maxZoom,
  }), [tileProvider]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <MapTopBar onCategoryClick={handleCategoryClick} />
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

      <MapTileSwitcher
        selectedProviderId={currentProviderId}
        onProviderChange={setProviderId}
      />

      <MapControls />

      {/* Country Details Panel */}
      <MapDetailsPanel
        country={selectedCountry}
        onClose={handleClearSelection}
      />
    </div>
  );
};
export default MainMap;
