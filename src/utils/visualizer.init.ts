import type { Material, PointsInterface } from "./visualizer.interface";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const initializePoints = async (): Promise<PointsInterface[]> => {
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

  return points;
};

export const initializeMaterials = async () => {
  const materials: Material[] = [];

  const querySnapshot = await getDocs(collection(db, "materials"));
  querySnapshot.forEach((doc) => {
    materials.push({ id: doc.id, ...doc.data() });
  });

  return materials;
};
