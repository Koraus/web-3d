import type * as THREE from "three";


const ctorNames = [
    "Vector2",
    "Vector3",
    "Color",


    "Object3D",
    "Group",

    "OrthographicCamera",
    "PerspectiveCamera",

    "Light",
    "AmbientLight",
    "DirectionalLight",
    "SpotLight",
    "PointLight",


    "Mesh",

    "BufferGeometry",

    "Material",
    "MeshBasicMaterial",
    "MeshLambertMaterial",
    "MeshPhongMaterial",
    "MeshToonMaterial",
    "MeshNormalMaterial",
    "MeshDepthMaterial",
    "ShaderMaterial",
] as const;

const _isThree = <CtorName extends typeof ctorNames[number]>(ctorName: CtorName, x: any): x is InstanceType<typeof THREE[CtorName]> => x[`is${ctorName}`];
export const isThree = Object.assign(_isThree, Object.fromEntries(ctorNames.map(n => [n, x => _isThree(n, x)])) as { [CtorName in typeof ctorNames[number]]: (x: any) => x is InstanceType<typeof THREE[CtorName]>; });


export const isVector2 = isThree.Vector2;
export const isVector3 = isThree.Vector3;
export const isColor = isThree.Color;
export const isObject3D = isThree.Object3D;
export const isGroup = isThree.Group;
export const isOrthographicCamera = isThree.OrthographicCamera;
export const isPerspectiveCamera = isThree.PerspectiveCamera;
export const isLight = isThree.Light;
export const isAmbientLight = isThree.AmbientLight;
export const isDirectionalLight = isThree.DirectionalLight;
export const isSpotLight = isThree.SpotLight;
export const isPointLight = isThree.PointLight;
export const isMesh = isThree.Mesh;
export const isBufferGeometry = isThree.BufferGeometry;
export const isMaterial = isThree.Material;
export const isMeshBasicMaterial = isThree.MeshBasicMaterial;
export const isMeshLambertMaterial = isThree.MeshLambertMaterial;
export const isMeshPhongMaterial = isThree.MeshPhongMaterial;
export const isMeshToonMaterial = isThree.MeshToonMaterial;
export const isMeshNormalMaterial = isThree.MeshNormalMaterial;
export const isMeshDepthMaterial = isThree.MeshDepthMaterial;
export const isShaderMaterial = isThree.ShaderMaterial;

