import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";


const Mycar = () => {

    const computer = useGLTF('./generic_toyama_xr_sedan/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={20} groundColor="black" />
            <pointLight intensity={1} />
            <primitive 
                object={computer.scene} 
                scale={2} // change the model size 
                position={[0,-3.25,-1.5]} // change the model position
            />
        </mesh>
    )
}

const MyCarCanvas = () => {
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
                <Mycar/>
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default MyCarCanvas