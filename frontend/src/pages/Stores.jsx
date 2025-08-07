import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const StoreLocations = () => {
  // eslint-disable-next-line no-unused-vars
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Vendify Islamabad",
      address: "123 Shopping Lane, Islamabad, PK",
      phone: "+92-51-1234567",
      coordinates: [33.6844, 73.0479],
    },
    {
      id: 2,
      name: "Vendify Lahore",
      address: "456 Market Street, Lahore, PK",
      phone: "+92-42-7654321",
      coordinates: [31.5204, 74.3587],
    },
    {
      id: 3,
      name: "Vendify Karachi",
      address: "789 Trade Tower, Karachi, PK",
      phone: "+92-21-9876543",
      coordinates: [24.8607, 67.0011],
    },
  ]);

  const [selectedStore, setSelectedStore] = useState(null);
  const [mapCenter, setMapCenter] = useState([31.5204, 73.3587]);

  useEffect(() => {
    if (selectedStore) {
      setMapCenter(selectedStore.coordinates);
    }
  }, [selectedStore]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <IoArrowBack
        onClick={goBack}
        className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Store Locations</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find a Vendify store near you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Stores</h2>
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="mb-4 p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedStore(store)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
                  <p className="text-gray-600">{store.address}</p>
                  <p className="text-gray-600">Phone: {store.phone}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 h-[70vh] rounded-lg overflow-hidden shadow-md">
              <MapContainer
                center={mapCenter}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                className="z-10"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {stores.map((store) => (
                  <Marker
                    key={store.id}
                    position={store.coordinates}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedStore(store),
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{store.name}</h3>
                        <p>{store.address}</p>
                        <p>Phone: {store.phone}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <section className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visit Us</h2>
            <p className="text-gray-600 mb-4">
              Can’t find a store near you? Contact us for more information or to request a new location.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default StoreLocations;