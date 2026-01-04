import { MapPin, PencilRuler, RotateCcw, Ruler } from "lucide-react";

interface MapToolsProps {
  onMeasurementClick?: () => void;
  onPOIClick?: () => void;
}
const MapTools = ({
  onMeasurementClick,
  onPOIClick,
}: MapToolsProps) => {
  return (
    <div className="whitespace-nowrap rounded-full">
      <div className="px-3 py-3.5">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => {
              onMeasurementClick?.();
            }}
            className="text-sm font-medium shadow-md flex flex-row px-2 py-2 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Ruler className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
              Measure
            </span>
          </button>

          <button
            onClick={() => {
              onPOIClick?.();
            }}
            className="text-sm font-medium shadow-md flex flex-row px-2 py-2 items-center gap-2 whitespace-nowrap rounded-full  bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
              My Places
            </span>
          </button>

          <button className="text-sm font-medium shadow-md flex flex-row px-2 py-2 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed">
            <PencilRuler className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
              Draw
            </span>
          </button>

          <button className="text-sm font-medium shadow-md flex flex-row px-2 py-2 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed">
            <RotateCcw className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
              Reset
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default MapTools;