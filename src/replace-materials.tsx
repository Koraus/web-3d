import { Object3D, Material, Mesh } from "three";
import { isMesh } from "./three-guards";

export const replaceMaterials = (root: Object3D, replacer: (material: Material, mesh: Mesh, replacementRoot: Object3D) => Material | undefined | void) => {
  root.traverse((obj) => {
    if (!isMesh(obj)) { return; }
    if (Array.isArray(obj.material)) {
      for (let i = 0; i < obj.material.length; i++) {
        obj.material[i] = replacer(obj.material[i], obj, root) ?? obj.material[i];
      }
    } else {
      obj.material = replacer(obj.material, obj, root) ?? obj.material;
    }
  });
};
