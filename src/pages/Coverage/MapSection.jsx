// MapSection.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

// Fix default marker icons
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToDistrict({coords}){
  const map = useMap()
  if(coords){
    map.flyTo(coords , 10 , {duration:1.5})
  }
  return null
}

const position = [23.8103, 90.4125];

export default function MapSection({ servicesCenter }) {
  const [serachDistricts, setSerachDistricts] = useState();
  const [activeCoords , setActiveCoords] = useState(null)
  const [activeDistricts , setActiveDistricts] = useState(null)
  const handleSearch =(e)=>{

   e.preventDefault()
  console.log(serachDistricts)

   const result = servicesCenter.find(d=>d.district.toLowerCase().includes(serachDistricts.toLowerCase()))
   console.log(result)
   if(result){
     setActiveCoords([result.latitude , result.longitude])
     setActiveDistricts(result.district)
   }
  }
  return (
    <div>
      {/* search bar */}
      <form onSubmit={handleSearch}  className="flex mb-10 justify-start items-center">
        <input
          type="text"
          placeholder="Search a district..."
          className="bg-white shadow my-3 py-2 px-6 outline-none  rounded-bl-full rounded-tl-full w-xl"
          value={serachDistricts}
          onChange={(e) => setSerachDistricts(e.target.value)}
        />
        <button type="submit" className="px-6 rounded-br-full shadow rounded-tr-full py-2 bg-[#CAEB66] font-medium">
          Search
        </button>
      </form>
{/* bangladsh map */}
      <div className="max-w-6xl mx-auto h-[800px] mt-6">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full rounded-lg shadow"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
              <FlyToDistrict coords={activeCoords} />
          {servicesCenter.map((center, i) => (
            <Marker
              key={i}
              position={[center.latitude, center.longitude]}
              icon={markerIcon}
            >
              <Popup autoOpen={center.district === activeDistricts }>
                <strong>{center.district}</strong><br />
                {center.covered_area.join(" ,")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
