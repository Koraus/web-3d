import letter_D_Url from "./models-3d/D.glb?url";
import letter_m_Url from "./models-3d/m.glb?url";
import letter_y_Url from "./models-3d/y.glb?url";
import letter_t_Url from "./models-3d/t.glb?url";
import letter_r_Url from "./models-3d/r.glb?url";
import letter_o_Url from "./models-3d/o.glb?url";
import letter_K_Url from "./models-3d/K.glb?url";
import letter_a_Url from "./models-3d/a.glb?url";
import letter_s_Url from "./models-3d/s.glb?url";
import letter_h_Url from "./models-3d/h.glb?url";
import letter_c_Url from "./models-3d/c.glb?url";
import letter_h_2_Url from "./models-3d/h.glb?url";
import letter_n_Url from "./models-3d/n.glb?url";
import letter_e_Url from "./models-3d/e.glb?url";

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Mesh, Vector3 } from "three";


export const Word = () => {
    return (
        <group position={[0, 0, 0]}>
            <DynamicLetter url={letter_D_Url} />
            <DynamicLetter url={letter_m_Url} />
            <DynamicLetter url={letter_y_Url} />
            <DynamicLetter url={letter_t_Url} />
            <DynamicLetter url={letter_r_Url} />
            <DynamicLetter url={letter_o_Url} />
            <DynamicLetter url={letter_K_Url} />
            <DynamicLetter url={letter_a_Url} />
            <DynamicLetter url={letter_s_Url} />
            <DynamicLetter url={letter_h_Url} />
            <DynamicLetter url={letter_c_Url} />
            <DynamicLetter url={letter_h_2_Url} position={[2, 0, 0]} />
            <DynamicLetter url={letter_y_Url} position={[9.66, 0, 0]} />
            <DynamicLetter url={letter_n_Url} />
            <DynamicLetter url={letter_t_Url} position={[11.71, 0, 0]} />
            <DynamicLetter url={letter_e_Url} />
            <DynamicLetter url={letter_s_Url} position={[7.5, 0, 0]} />
        </group>
    )
}

useGLTF.preload(letter_D_Url);
useGLTF.preload(letter_m_Url);
useGLTF.preload(letter_y_Url);
useGLTF.preload(letter_t_Url);
useGLTF.preload(letter_r_Url);
useGLTF.preload(letter_o_Url);
useGLTF.preload(letter_K_Url);
useGLTF.preload(letter_a_Url);
useGLTF.preload(letter_s_Url);
useGLTF.preload(letter_h_Url);
useGLTF.preload(letter_c_Url);



export const twistGeometry = ({
    baseGeometry,
    targetGeometry,
    angle,
    axis,
}: {
    baseGeometry: BufferGeometry;
    targetGeometry: BufferGeometry;
    angle: number;
    axis: "x" | "y" | "z"; // Ось для скручування
}) => {

    const targetPositionAttribute = targetGeometry.attributes.position;
    const basePositionAttribute = baseGeometry.attributes.position;

    // Перевіряємо, чи кількість вершин збігається
    if (targetPositionAttribute.count !== basePositionAttribute.count) {
        console.error("Base and target geometries do not have the same vertex count.");
        return;
    }

    const vector = new Vector3();

    // Пройтись по всіх вершинах і застосувати обертання
    for (let i = 0; i < basePositionAttribute.count; i++) {
        // Отримуємо позицію кожної вершини з базової геометрії
        vector.fromBufferAttribute(basePositionAttribute, i);

        // Обчислюємо кут скручування
        let twistAngle = 0;
        switch (axis) {
            case "x":
                twistAngle = angle * vector.x;
                break;
            case "y":
                twistAngle = angle * vector.y;
                break;
            case "z":
                twistAngle = angle * vector.z;
                break;
        }

        // Застосовуємо обертання залежно від осі
        const sin = Math.sin(twistAngle);
        const cos = Math.cos(twistAngle);

        if (axis === "x") {
            const y = vector.y;
            const z = vector.z;
            vector.y = cos * y - sin * z;
            vector.z = sin * y + cos * z;
        } else if (axis === "y") {
            const x = vector.x;
            const z = vector.z;
            vector.x = cos * x - sin * z;
            vector.z = sin * x + cos * z;
        } else if (axis === "z") {
            const x = vector.x;
            const y = vector.y;
            vector.x = cos * x - sin * y;
            vector.y = sin * x + cos * y;
        }

        // Оновлюємо позицію у цільовій геометрії
        targetPositionAttribute.setXYZ(i, vector.x, vector.y, vector.z);
    }

    // Оновлюємо атрибути геометрії
    targetPositionAttribute.needsUpdate = true;

    // Перераховуємо нормалі для правильного освітлення
    targetGeometry.computeVertexNormals();
};

export function DynamicLetter({ url, ...props
}: JSX.IntrinsicElements["group"] & {
    url: string;
}) {
    console.log('DynamicLetter rendered')

    const [twistDirection, setTwistDirection] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null); //animation time start
    const [isAnimating, setIsAnimating] = useState(false);
    const gltf = useGLTF(url);

    const sceneClone = useMemo(() => {
        const sceneClone = gltf.scene.clone();
        const mesh = sceneClone.children[0] as Mesh;
        mesh.geometry = mesh.geometry.clone();
        return sceneClone;
    }, [gltf]);

    const baseMesh = sceneClone.children[0] as Mesh; // Базова геометрія
    const baseGeometry = useMemo(() => baseMesh.geometry.clone(), [baseMesh]) as BufferGeometry; // Базова геометрія

    const targetMeshRef = useRef<Mesh>(null);
    useFrame(() => {

        if (!isAnimating) return;
        if (!startTime) return;

        const elapsedTime = (performance.now() - startTime) / 1000; // Час в секундах
        const duration = 0.9; // Тривалість анімації

        const axis = "y"; // Ось обертання
        const t = elapsedTime / duration; // Прогрес анімації 
        const crtAngle = Math.sin(2 * Math.PI * t) * - twistDirection * (1 - t ** 15 * (1 - t) * 60) * 1.6

        if (elapsedTime >= duration) {
            setIsAnimating(false);
        }

        if (!targetMeshRef.current) return;

        const targetMesh = targetMeshRef.current.children[0] as Mesh;
        const targetGeometry = targetMesh.geometry as BufferGeometry;

        twistGeometry({
            baseGeometry,
            targetGeometry,
            angle: t >= 1 ? 0 : crtAngle,
            axis,
        })
    });

    return <primitive
        object={sceneClone}
        url={url}
        onPointerOver={
            (e: PointerEvent) => {
                if (isAnimating) return;
                setTwistDirection(e.movementX > 0 ? 1 : -1)
                setIsAnimating(true); // Запускаємо анімацію
                setStartTime(performance.now()); // Фіксуємо час старту
            }
        }
        ref={targetMeshRef}
        {...props}

    />
}
