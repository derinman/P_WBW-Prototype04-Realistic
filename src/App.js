import React, { useState, useMemo, Suspense, useRef } from 'react'

import * as THREE from 'three'

import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { useSpring, animated as a } from 'react-spring/three'

import styled from 'styled-components';

import { softShadows } from "@react-three/drei"

import MartirezRoomGltf from './resources/gltf/Owe Ragnar Martirez Room.glb'

const Wrapper = styled.div`
  position: relative;
  height:100vh;
  width: 100vw;
  background: linear-gradient(180deg, rgba(28,45,75,1) 70%, rgba(170,170,170,1) 100%);
  overflow: hidden;
`;

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.005, // World size (default: 0.005)
  near: 9.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
})

const MartirezRoom = ()=> {

  const {nodes} = useLoader(GLTFLoader, MartirezRoomGltf, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.decoderPath = '/draco-gltf/'
    loader.setDRACOLoader(dracoLoader)
  })
  const group = useRef();

  const [ isHover, setIsHover ] = useState(false);

  const {scale1} = useSpring({
    scale1: isHover ? 0.5 : 1 ,
    config: { mass: 1, tension: 280, friction: 120 }
  })

  console.log(nodes)

  return (
    <group
      ref={group}
    >
      {/* room */}
      <mesh
        geometry={nodes.room.geometry}
        material={nodes.room.material}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.room.children[0].geometry}
        material={nodes.room.children[0].material}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.room.children[1].geometry}
        material={nodes.room.children[1].material}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.room.children[2].geometry}
        material={nodes.room.children[2].material}
        castShadow
        receiveShadow
      />

      <mesh
        geometry={nodes.Hand.geometry}
        material={nodes.Hand.material}
        castShadow
        receiveShadow
      />

      <a.mesh
        geometry={nodes.Cone.geometry}
        material={nodes.Cone.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />
      <a.mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />
      <a.mesh
        geometry={nodes.Icosphere.geometry}
        material={nodes.Icosphere.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />
      <a.mesh
        geometry={nodes.Sphere.geometry}
        material={nodes.Sphere.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />
      <a.mesh
        geometry={nodes.Sphere001.geometry}
        material={nodes.Sphere001.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />
      {/* cloud */}
      <a.mesh
        geometry={nodes.Sphere002.geometry}
        material={nodes.Sphere002.material}
        scale={scale1.interpolate(r => [r, r, r])}
        onPointerOver={() => setIsHover(true)} 
        onPointerOut={() => setIsHover(false)}
        castShadow
        receiveShadow
      />

    </group>
  )
}

extend({ OrbitControls })
const Controls = (props) => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


function App() {
  
  const light0 = useMemo(() => new THREE.SpotLight(), [])
  const light1 = useMemo(() => new THREE.SpotLight(), [])
  const light2 = useMemo(() => new THREE.SpotLight(), [])
  
  return (
      <Wrapper>
        <Canvas
          camera={{ position: [0, 0, 10] , fov:40}}
          shadowMap
          colorManagement
          gl={{ antialias: true }}
          onCreated={({ gl }) => {//gl.toneMapping = THREE.NoToneMapping;
                                  //gl.toneMapping = THREE.LinearToneMapping;
                                  gl.toneMapping = THREE.ReinhardToneMapping;
                                  //gl.toneMapping = THREE.CineonToneMapping;
                                  //gl.toneMapping = THREE.ACESFilmicToneMapping;
                                  gl.toneMappingExposure = 2;
                                  
          }}
        >
          
          <hemisphereLight intensity={0.2} skyColor={'#fc032c'} groundColor={'#f5ce58'} castShadow/>
          
          <primitive 
            object={light0}
            position={[-4,5,4]}
            color={'#f7ed92'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.5}//values between zero and 1. Default is zero.
            angle={Math.PI/7}//upper bound is Math.PI/2
            intensity={3}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/256}//試試1024/500~1024
            shadow-mapSize-width={1024/256}//試試1024/500~1024
            shadow-bias={-0.5}//試試0.01~0.07
            shadow-focus={0.01}//試試0.1~2
          />
          <primitive 
            object={light0.target}
            position={[0, 0, 0]}
          />
          
          <primitive 
            object={light1}
            position={[4,0,4]}
            color={'#fff'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.05}//values between zero and 1. Default is zero.
            angle={Math.PI/3}//upper bound is Math.PI/2
            intensity={0.5}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/256}//試試1024/500~1024
            shadow-mapSize-width={1024/256}//試試1024/500~1024
            shadow-bias={-0.5}//試試0.01~0.07
            shadow-focus={0.01}//試試0.1~2
          />
          <primitive 
            object={light1.target}
            position={[0, 0, 0]}
          />

          <primitive 
            object={light2}
            position={[0,0,-6]}
            color={'#f7a892'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.05}//values between zero and 1. Default is zero.
            angle={Math.PI}//upper bound is Math.PI/2
            intensity={5}//Default is 1
            decay={0.0005}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={-0.5}//試試0.01~0.07
            shadow-focus={0.01}//試試0.1~2
          />
          <primitive 
            object={light2.target}
            position={[0, 0, 0]}
          />

          {/*
          <pointLight intensity={1} position={[4, 0, 4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4,0, 4]} color={'#f2ca66'} decay={2} castShadow/>
          <pointLight intensity={1} position={[4, 0, -4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4, 0, -4]} color={'#f2ca66'} decay={2} castShadow/>
          
          <pointLight intensity={1.2} position={[0, -3, 0]} color={'#f2ca66'} decay={2} castShadow/>
          */}

          <Controls
            //autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
        <Suspense fallback={null}>
          <MartirezRoom/>
        </Suspense>

        </Canvas>
      </Wrapper>
  );
}

export default App;
