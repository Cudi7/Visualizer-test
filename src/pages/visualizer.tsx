import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import type { InferGetStaticPropsType, NextPage } from "next";

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
import AppBar from "../components/AppBar";

export async function getStaticProps() {
  const points: PointsInterface[] = await initializePoints();
  const materials: Material[] = await initializeMaterials();

  return {
    props: { points, materials },
  };
}

const Visualizer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  points,
  materials,
}) => {
  const [displayPoints, setDisplayPoints] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<PointsInterface[]>([]);
  const [currentMaterials, setCurrentMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedLayerImage, setSelectedLayerImage] = useState<string[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      setCurrentPoints(points);
      setCurrentMaterials(materials);
    };
    initializeData();
  }, [materials, points]);

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
    <>
      <AppBar />
      <div className="mt-10 flex min-h-[100vh] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 ">
        <div className="group relative transition">
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
        <div
          className={`${
            filteredData.length ? "flex" : "hidden"
          } ml-2   w-[15rem] flex-col gap-5`}
        >
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
    </>
  );
};

export default Visualizer;
