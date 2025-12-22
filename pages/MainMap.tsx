'use client';

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const MapDetailsPanel = dynamic(() => import('../components/features/MapDetailsPanel'), { ssr: false });

const MainMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<GeoJSON.Feature | null>(null);
  
  const handleClearSelection = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Country Details Panel */}
      <MapDetailsPanel
        country={selectedCountry}
        onClose={handleClearSelection}
      />
    </div>
  );
};
export default MainMap;
