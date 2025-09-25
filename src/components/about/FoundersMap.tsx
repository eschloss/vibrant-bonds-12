import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { feature } from "topojson-client";
// Use local topojson to avoid external fetch issues
// @ts-ignore
import countries110m from "world-atlas/countries-110m.json";

type MapLocation = {
  key: string;
  name: string;
  longitude: number; // X
  latitude: number;  // Y
};

const locations: MapLocation[] = [
  { key: "us", name: "United States", longitude: -100, latitude: 40 },
  { key: "mx", name: "Mexico", longitude: -102, latitude: 23 },
  { key: "uk", name: "United Kingdom", longitude: -3, latitude: 55 },
  { key: "ie", name: "Ireland", longitude: -8, latitude: 53 },
  { key: "no", name: "Norway", longitude: 8, latitude: 61 },
  { key: "de", name: "Germany", longitude: 10, latitude: 51 },
  { key: "es", name: "Spain", longitude: -3, latitude: 40 },
  { key: "ae", name: "United Arab Emirates", longitude: 54, latitude: 24 },
  { key: "cn", name: "China", longitude: 104, latitude: 35 },
  { key: "in", name: "India", longitude: 78, latitude: 21 },
];

const topo: any = countries110m as any;
const geoData = feature(topo, topo.objects.countries);

const FoundersMap = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("about.map.title", "Where We've Lived")}
          </h2>
          <p className="text-lg text-gray-300 whitespace-pre-line">
            {t(
              "about.map.subtitle",
              "Between us, we've lived in 20+ countries across 5 continents — as an opera singer and a digital nomad — learning how friendships start and stick."
            )}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800/60 to-gray-900">
          <ComposableMap projectionConfig={{ scale: 155 }} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoData}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#5b6b83", outline: "none", stroke: "#94a3b8", strokeWidth: 0.25 },
                        hover: { fill: "#70839e", outline: "none", stroke: "#cbd5e1", strokeWidth: 0.25 },
                        pressed: { fill: "#8aa0be", outline: "none", stroke: "#e2e8f0", strokeWidth: 0.25 },
                      }}
                    />
                  ))}
                  {geographies.length === 0 && (
                    <text x={10} y={20} className="fill-gray-300 text-xs">{t("about.map.loading", "Loading map...")}</text>
                  )}
                </>
              )}
            </Geographies>

            {locations.map((loc, index) => (
              <Marker key={loc.key} coordinates={[loc.longitude, loc.latitude]}>
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <circle r={6} fill="rgba(255,38,136,0.25)" />
                  <circle r={2.5} fill="#FF2688" />
                </motion.g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          {t(
            "about.map.caption",
            "Highlighted: US, UK, Germany, Spain, Mexico, Norway, Ireland, UAE, China, India"
          )}
        </p>
      </div>
    </section>
  );
};

export default FoundersMap;


