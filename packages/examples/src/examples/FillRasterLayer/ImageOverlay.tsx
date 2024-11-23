import MapLibreGL from "@maplibre/maplibre-react-native";
import React, { useEffect, useState } from "react";

import radar0 from "../../assets/images/radar0.png";
import radar1 from "../../assets/images/radar1.png";
import radar2 from "../../assets/images/radar2.png";
import Page from "../../components/Page";
import sheet from "../../styles/sheet";

const styles = {
  rasterLayer: { rasterOpacity: 0.6 },
  bubble: { bottom: 100 },
};

const FRAMES = [radar0, radar1, radar2];

const COORDINATES: [
  GeoJSON.Position,
  GeoJSON.Position,
  GeoJSON.Position,
  GeoJSON.Position,
] = [
  [-80.425, 46.437], // top left
  [-71.516, 46.437], // top right
  [-71.516, 37.936], // bottom right
  [-80.425, 37.936], // bottom left
];

export default function ImageOverlay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const loop = () => {
      requestAnimationFrame(() => {
        setIndex((prevState) => (prevState + 1) % 3);

        timeout = setTimeout(() => loop(), 1000);
      });
    };
    loop();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <Page>
      <MapLibreGL.MapView style={sheet.matchParent}>
        <MapLibreGL.Camera centerCoordinate={[-75, 41]} zoomLevel={4} />

        <MapLibreGL.ImageSource
          id="image-source"
          coordinates={COORDINATES}
          url={FRAMES[index]}
        >
          <MapLibreGL.RasterLayer
            id="raster-layer"
            style={styles.rasterLayer}
          />
        </MapLibreGL.ImageSource>
      </MapLibreGL.MapView>
    </Page>
  );
}