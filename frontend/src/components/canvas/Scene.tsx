import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { WebGPU } from './WebGPU'

export default function Scene({ children, ...props }) {
  const targetObject = useRef()
  const directionalLight = useRef()
  const sceneRef = useRef()
  const [dirLightIntensity, setDirLightIntensity] = useState(10)

  // const { scene } = useThree();

  useEffect(() => {
    setTimeout(() => {
      setDirLightIntensity(dirLightIntensity + 1)
    }, 10000)
    // setTimeout(() => {
    //   directionalLight.current['intensity'] = 11;
    // }, 5000)
    // console.log(directionalLight)
    // const scene = sceneRef.current
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // sceneRef.current.add( directionalLight );
  }, [])

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} ref={sceneRef} style={{ zIndex: 1 }}>
      <Suspense>
        {children}
        <ambientLight intensity={0.8} />
        <object3D ref={targetObject} position={[-4, 0, 0]} />
        <directionalLight
          ref={directionalLight}
          position={[0, 0, 0]}
          intensity={dirLightIntensity}
          target={targetObject.current}
        />
        
      </Suspense>
    </Canvas>
  )
}
