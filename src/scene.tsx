import { Canvas } from "@react-three/fiber";
import { Word } from "./word";

export const Scene = () => {

    return <div style={{ width: "100%", height: "40vh" }}>
        <Canvas
            orthographic
            camera={{ zoom: 50, position: [0, 0, 100] }}
            onCreated={({ gl }) => { gl.setClearColor('#000000'); }}
        >
            <color attach="background" args={['white']} />
            <ambientLight intensity={0.2} />
            <directionalLight castShadow position={[2.5, 12, 12]} intensity={4} />
            <directionalLight position={[0, 0, 0]} intensity={1} />
            <directionalLight position={[0, -4, 0]} intensity={1} />
            <Word
            />
        </Canvas>
    </div >
}
