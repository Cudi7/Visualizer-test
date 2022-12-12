import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import FingerPrint from "../components/FingerPrint";
import type {
  Material,
  PointsInterface,
  Layers,
} from "../utils/visualizer.interface";
import {
  initializeMaterials,
  initializePoints,
} from "../utils/visualizer.init";
import Materials from "../components/Materials";

const Visualizer = (): JSX.Element => {
  const [displayPoints, setDisplayPoints] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<PointsInterface[]>([]);
  const [currentMaterials, setCurrentMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedLayerImage, setSelectedLayerImage] = useState<string[]>([]);

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

  const handleMaterialClick = (layer: Layers | undefined) => {
    if (!layer) return;

    const layerImage = Object.values(layer)[0];

    if (layerImage) setSelectedLayerImage([...selectedLayerImage, layerImage]);
  };

  const filteredData = useMemo(() => {
    return selectedId
      ? currentMaterials.filter((el) => el.points?.indexOf(selectedId) !== -1)
      : [];
  }, [currentMaterials, selectedId]);

  const layerImage = useMemo(() => selectedLayerImage, [selectedLayerImage]);

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 ">
      <div className="relative">
        <Image
          width={1240}
          height={843}
          src={"/base.jpeg"}
          alt="base image"
          priority={true}
          className="h-auto w-auto"
        />

        {layerImage.length
          ? layerImage.map((el) => (
              <Image
                key={el}
                width={1240}
                height={843}
                src={el}
                alt="base image"
                priority={true}
                className="absolute top-0 left-0 z-10 h-auto w-auto"
              />
            ))
          : null}

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
              <Materials
                key={el.id}
                data={el}
                handleMaterialClick={handleMaterialClick}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Visualizer;
