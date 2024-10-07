import { useGLTF } from "@react-three/drei";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { Group } from "three";

export const GltfSceneClone = forwardRef(({
    url, children, ...props
}: GroupProps & {
    url: string,
}, ref: ForwardedRef<Group>) => {
    const gltf = useGLTF(url);
    const sceneClone = useMemo(() => gltf.scene.clone(), [gltf]);
    return <primitive ref={ref} object={sceneClone} {...props} />;
});
