import React from "react";
import { IShippingTrackingInformation } from "../types";

interface ISingleSearchResult {
  shippingTrackingInformation?: IShippingTrackingInformation;
}

const SingleSearchResult: React.FC<ISingleSearchResult> = (props) => {
  const { shippingTrackingInformation } = props;
  return (
    <div className=" space-y-2">
      <div className="">
        <span className="">{shippingTrackingInformation?.shipmentId}</span> . <span className="">{shippingTrackingInformation?.containerType}</span> .{" "}
        <span className="">{shippingTrackingInformation?.containerSize.toUpperCase()} Container</span> .{" "}
        <span className="">Current Location: {shippingTrackingInformation?.currentLocation}</span>
      </div>
      <div className=" h-1 w-full bg-gray-400"></div>
      <div className="flex items-start justify-between">
        <div className="">
          <p className="">{shippingTrackingInformation?.origin}</p>
          <p className=" text-sm text-gray-400">ETD: Oct 25, 2022 </p>
        </div>
        <div className="">
          <p className="">{shippingTrackingInformation?.destination}</p>
          <p className="text-sm text-gray-400">ETD: Oct 25, 2022 </p>
        </div>
      </div>
    </div>
  );
};

export default SingleSearchResult;
