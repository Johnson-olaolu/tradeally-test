import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IShippingTrackingInformation } from "./types";
import SingleSearchResult from "./components/SingleSearchResult";
import { generateContainerSize, generateShipmentId } from "./utils";

function App() {
  const [activeMenu, setActiveMenu] = useState<"Shipment" | "Document">("Shipment");
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<IShippingTrackingInformation[]>([]);
  const [shippingInfos, setShippingInfos] = useState<IShippingTrackingInformation[]>([]);

  const onCLickAddToTrackingList = () => {
    const newShippingTrackingInfo: IShippingTrackingInformation = {
      bol: search,
      shipmentId: generateShipmentId(),
      containerSize: `${generateContainerSize()}ft`,
      currentLocation: "Lagos Nigeria",
      origin: "Lagos Nigeria",
      containerType: "FCL",
      destination: "Barcelona Spain",
    };

    setShippingInfos([...shippingInfos, newShippingTrackingInfo]);
    setRecentSearches((formerSearches) => {
      if (formerSearches.length === 5) {
        formerSearches.pop();
      }
      return [...formerSearches, newShippingTrackingInfo];
    });

    setSearch("");
  };

  const searchResults = useMemo(() => {
    return shippingInfos.filter((info) => info.bol.includes(search));
  }, [search, shippingInfos]);

  return (
    <main className=" max-w-4xl mx-auto">
      <nav className="">
        <ul className=" flex  gap-4 px-2 border-b border-gray-400">
          <li
            role="button"
            onClick={() => setActiveMenu("Shipment")}
            className={` py-4 text-sm ${activeMenu == "Shipment" ? " text-gray-800 border-b border-gray-800" : " text-gray-400"}`}
          >
            Track Shipment
          </li>
          <li
            role="button"
            onClick={() => setActiveMenu("Document")}
            className={` py-4 text-sm ${activeMenu == "Document" ? " text-gray-800 border-b border-gray-800" : " text-gray-400"}`}
          >
            Track With Document
          </li>
        </ul>
      </nav>
      {activeMenu === "Shipment" ? (
        <div className="">
          <div className=" flex items-center w-full px-2 py-4 gap-4 border-b border-gray-400">
            <FiSearch className=" flex-shrink-0 text-gray-400 " size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className=" flex-grow focus-visible:outline-none"
              placeholder="Enter bill of landing no E.g MSC17392833"
            />
            <button className="flex-shrink-0 text-xs font-bold text-gray-400" onClick={() => setSearch("")}>
              ESC
            </button>
          </div>
          <div className=" p-2">
            {recentSearches && recentSearches.length > 0 && search == "" ? (
              <div className=" space-y-4">
                <p className="">Recent Searches</p>
                <div className="space-y-4">
                  {recentSearches.map((recentSearch) => (
                    <SingleSearchResult shippingTrackingInformation={recentSearch} key={recentSearch.shipmentId} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {search !== "" && searchResults.length == 0 && (
            <button onClick={() => onCLickAddToTrackingList()} className=" inline-flex items-center gap-4">
              <span className="p-3 rounded-full bg-gray-200">
                <FiPlus />
              </span>
              <span className="">Add "{search}" to tracking list</span>
            </button>
          )}
          {search !== "" && searchResults.length > 0 && (
            <div className="space-y-4 p-2">
              <p className="">Search Results</p>
              <div className=" space-y-4">
                {searchResults.map((result) => (
                  <SingleSearchResult shippingTrackingInformation={result} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
}

export default App;
