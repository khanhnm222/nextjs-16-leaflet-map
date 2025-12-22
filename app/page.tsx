import { MapProvider } from "@/contexts/MapContext";
import MainMap from "@/pages/MainMap";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <MapProvider>
        <MainMap />
      </MapProvider>
    </main>
  );
}
