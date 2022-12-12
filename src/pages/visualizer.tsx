import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import FingerPrint from "../components/FingerPrint";
import type { Material, PointsInterface } from "../utils/visualizer.interface";
import {
  initializeMaterials,
  initializePoints,
} from "../utils/visualizer.init";

const Visualizer = (): JSX.Element => {
  const [displayPoints, setDisplayPoints] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<PointsInterface[]>([]);
  const [currentMaterials, setCurrentMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      setCurrentPoints(await initializePoints());
      setCurrentMaterials(await initializeMaterials());
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (currentMaterials.length && currentPoints.length) setDisplayPoints(true);
  }, [currentMaterials, currentPoints.length]);

  const handlePointerClick = (id: string) => setSelectedId(id);

  const filteredData = useMemo(() => {
    return selectedId
      ? currentMaterials.filter((el) => el.points?.indexOf(selectedId) !== -1)
      : [];
  }, [currentMaterials, selectedId]);

  return (
    <div className="flex min-h-[100vh] items-center justify-center ">
      <div className="relative ">
        <Image
          width={1240}
          height={843}
          src={"/base.jpeg"}
          alt="base image"
          priority={true}
          className="h-auto w-auto"
        />
        {displayPoints
          ? currentPoints.map((el) => (
              <FingerPrint
                key={el.id}
                handleClick={handlePointerClick}
                data={el}
              />
            ))
          : null}
      </div>
      <div className="ml-2 flex flex-col gap-5">
        {filteredData.length
          ? filteredData.map((el) => (
              <div
                key={el.id}
                className=" flex flex-col items-center rounded-lg border bg-white py-0 px-2 shadow-md hover:bg-gray-100  md:max-w-xl md:flex-row"
              >
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-600 ">
                    {el.name}
                  </h5>
                </div>
                <Image
                  className="  rounded-lg object-cover  "
                  src={el.materialPreview}
                  alt={el.name}
                  height={90}
                  width={90}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Visualizer;
