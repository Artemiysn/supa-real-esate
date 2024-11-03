"use client";

import { PostWithUsers } from "@/lib/data";
import { LatLngExpression, latLngBounds } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { isGPSCoordinate } from "@/lib/utils";
import { useEffect } from "react";

type MapWithIconsProps = {
  posts: PostWithUsers[];
};

type CoordsType = {
  title: string;
  locationGPS: LatLngExpression;
}[];

const MapWithIcons: React.FC<MapWithIconsProps> = ({ posts }) => {
  let coords: CoordsType = [];

  posts.forEach((post) => {
    if (isGPSCoordinate(post.lat, post.lon)) {
      coords.push({
        title: post.title,
        locationGPS: [Number(post.lat), Number(post.lon)],
      });
    }
  });

  if (!coords.length) return null;

  return (
    <MapContainer
      center={coords[0].locationGPS}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full min-w-[400px] min-h-[400px]"
    >
      <TileLayer
        attribution={"Open Street Map"}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapLoaded coords={coords} />
    </MapContainer>
  );
};

const MapLoaded: React.FC<{ coords: CoordsType }> = ({ coords }) => {
  const locations = coords.map((c) => c.locationGPS);
  const bounds = latLngBounds([]);
  locations.forEach((location) => bounds.extend(location));
  const map = useMap();
  useEffect(()=> {
    map.fitBounds(bounds);
  }, [coords]);
  return (
    <>
      {coords.map((c) => (
        <Marker key={c.title} position={c.locationGPS}>
          <Popup>{c.title}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapWithIcons;
