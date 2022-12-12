import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
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
    if (currentMaterials.length) setDisplayPoints(true);
  }, [currentMaterials]);

  const handlePointerClick = async (id: string) => setSelectedId(id);

  const filteredData = useMemo(() => {
    return selectedId
      ? currentMaterials.filter((el) => el.points?.indexOf(selectedId) !== -1)
      : [];
  }, [currentMaterials, selectedId]);

  return (
    <div className="flex min-h-[100vh] items-center justify-center ">
      <div className="">
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
        {}
      </div>
    </div>
  );
};

export default Visualizer;
