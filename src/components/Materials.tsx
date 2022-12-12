import React from "react";
import Image from "next/image";
import type { Layers, Material } from "../utils/visualizer.interface";

interface MaterialsProps {
  handleMaterialClick: (layer: Layers | undefined) => void;
  data: Material;
}

const Materials = ({ handleMaterialClick, data }: MaterialsProps) => {
  const { layers, materialPreview, name, id } = data;
  return (
    <div
      key={id}
      className=" flex cursor-pointer flex-col items-center rounded-lg border bg-white py-0 px-2 shadow-md hover:bg-gray-100  md:max-w-xl md:flex-row"
      onClick={() => handleMaterialClick(layers)}
    >
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-600 ">
          {name}
        </h5>
      </div>
      <Image
        className="  rounded-lg object-cover  "
        src={materialPreview as string}
        alt={name as string}
        height={90}
        width={90}
      />
    </div>
  );
};

export default Materials;
