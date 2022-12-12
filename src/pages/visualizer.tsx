import Image from "next/image";
import React, { useEffect, useState } from "react";

import { app, db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import FingerPrint from "../components/FingerPrint";

interface PointsInterface {
  id: string;
  data: {
    coordX: number;
    coordY: number;
    name: string;
  };
}

const Visualizer = (): JSX.Element => {
  const [displayPoints, setDisplayPoints] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<PointsInterface[]>([]);

  useEffect(() => {
    const initializePoints = async () => {
      const querySnapshot = await getDocs(collection(db, "points"));

      const points: PointsInterface[] = [];

      querySnapshot.forEach((doc) => {
        points.push({
          id: doc.id,
          data: {
            coordX: doc.data().coordX,
            coordY: doc.data().coordY,
            name: doc.data().name,
          },
        });
      });

      setCurrentPoints(points);
    };
    initializePoints();
  }, []);

  useEffect(() => {
    if (currentPoints.length) setDisplayPoints(true);
  }, [currentPoints]);

  const handlePointerClick = () => {
    // alert("clicked");
  };

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
                data={el.data}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Visualizer;
