"use client";

import { LatLngExpression, latLngBounds } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { isGPSCoordinate } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";
import { PostWithUsers } from "@/lib/dbTypes";

type MapWithIconsProps = {
  posts: PostWithUsers[];
  hideOnSmallScreens: boolean;
};

type CoordsType = {
  title: string;
  locationGPS: LatLngExpression;
}[];

const MapWithIcons: React.FC<MapWithIconsProps> = ({ posts, hideOnSmallScreens }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  let coords: CoordsType = [];

  posts.forEach((post) => {
    if (isGPSCoordinate(post.lat, post.lon)) {
      coords.push({
        title: post.title,
        locationGPS: [Number(post.lat), Number(post.lon)],
      });
    }
  });

  if (!coords.length || (!isDesktop && hideOnSmallScreens)) return null;

  return (
    <div id="map-block" className="lg:min-w-[400px] lg:mr-0 sm:mr-8 mr-0 sm:px-4 px-2 pb-4">
      <h4 className="scroll-m-20 text-xl font-bold pb-4 ">Location</h4>
      <MapContainer
        center={coords[0].locationGPS}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full min-h-[400px]"
      >
        <TileLayer
          attribution={"Open Street Map"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapLoaded coords={coords} />
      </MapContainer>
    </div>
  );
};

const MapLoaded: React.FC<{ coords: CoordsType }> = ({ coords }) => {
  const locations = coords.map((c) => c.locationGPS);
  const bounds = latLngBounds([]);
  locations.forEach((location) => bounds.extend(location));
  const map = useMap();
  useEffect(() => {
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
