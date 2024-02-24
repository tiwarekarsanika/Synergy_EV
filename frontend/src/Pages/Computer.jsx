import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";


const Computer = () => {

    const computer = useGLTF('./porche_918_spyder_2014/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={1} groundColor="black" />
            <pointLight intensity={1} />
            <primitive 
                object={computer.scene} 
                scale={3} // change the model size 
                position={[0,-3.25,-1.5]} // change the model position
            />
        </mesh>
    )
}

const ComputerCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{position: [20,3,5], fov:25}}
            gl={{preserveDrawingBuffer: true}}
        >
            <Suspense>
                <OrbitControls 
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computer/>
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default ComputerCanvas