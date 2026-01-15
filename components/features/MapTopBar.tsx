"use client";

import { memo } from "react";
import { Utensils, Hotel, Compass, Bus } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import MapTools from "./MapTools";
// import { UserInfo } from "./UserInfo";

const categories = [
  // { icon: Utensils, label: "Restaurants", id: "restaurants" },
  // { icon: Hotel, label: "Hotels", id: "hotels" },
  { icon: Compass, label: "Attractions", id: "attractions" },
  // { icon: Bus, label: "Transit", id: "transit" },
] as const;

interface MapTopBarProps {
  onCategoryClick?: (categoryId: string) => void;
  onMeasurementClick?: () => void;
  onPOIClick?: () => void;
}

/**
 * MapTopBar - Top navigation bar with category pills and user menu
 * Memoized to prevent unnecessary re-renders
 *
 * Features:
 * - Clickable category pills to filter POIs
 */

export const MapTopBar = memo(function MapTopBar({
  onCategoryClick,
  onMeasurementClick,
  onPOIClick,
}: MapTopBarProps) {
  return (
    <div className="absolute left-4 right-4 flex items-center gap-2 z-[1000] top-1">
      {/* Spacer for search bar */}
      <div className="w-[360px]" />

      {/* Category Pills */}
      <div className="hidden lg:flex items-center gap-2 overflow-x-auto pointer-events-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick?.(category.id)}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
          >
            <category.icon className="h-4 w-4" />
            {category.label}
          </button>
        ))}
        <MapTools onMeasurementClick={onMeasurementClick} onPOIClick={onPOIClick} />
      </div>

      {/* Right side icons */}
      <div className="hidden sm:flex ml-auto items-center gap-2 pointer-events-auto">
        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </div>
  );
});

MapTopBar.displayName = "MapTopBar";
