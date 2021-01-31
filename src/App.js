import React, { useState, useMemo, Suspense, useRef } from 'react'

import * as THREE from 'three'

import { Canvas, useFrame} from 'react-three-fiber'

import { useSpring, animated as a } from 'react-spring/three'

import styled from 'styled-components';

import { softShadows,ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"



import MartirezRoomGltf from './resources/gltf/Owe Ragnar Martirez Room.glb'


const Wrapper = styled.div`
  position: relative;
  height:100vh;
  width: 100vw;
  //background: linear-gradient(180deg, rgba(28,45,75,1) 70%, rgba(170,170,170,1) 100%);
  overflow: hidden;
`;

//softShadows()

const MartirezRoom = ()=> {

  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const {nodes} = useGLTF(MartirezRoomGltf)
  const group = useRef();

  const [ isHover, setIsHover ] = useState(false);

  const {scale1} = useSpring({
    scale1: isHover ? 0.5 : 1 ,
    config: { mass: 1, tension: 280, friction: 120 }
  })
  
  useFrame((state) =>{
    const t = state.clock.getElapsedTime()
    group.current.rotation.z = Math.sin(t / 1.5) / 20
    group.current.rotation.x = Math.cos(t / 4) / 20
    group.current.rotation.y = Math.sin(t / 4) / 8
    group.current.position.y = (Math.sin(t / 1.5)) / 10
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
      > 
        {/*MeshStandardMaterial is a physically based rendering material that can help you achieve photorealistic */}
        {/*<meshStandardMaterial attach="material" {...nodes.room.material}/>*/}
        {/*An extension of the MeshStandardMaterial, providing more advanced physically-based rendering properties*/}
        {/*<meshPhysicalMaterial attach="material" {...nodes.room.material}/>*/}
      </mesh>
      
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

function App() {
  
  const light0 = useMemo(() => new THREE.SpotLight(), [])
  const light1 = useMemo(() => new THREE.SpotLight(), [])
  const light2 = useMemo(() => new THREE.SpotLight(), [])
  const light3 = useMemo(() => new THREE.SpotLight(), [])
  const light4 = useMemo(() => new THREE.SpotLight(), [])

  return (
      <Wrapper>
        <Canvas
          camera={{ position: [0, 0, 13] , fov:40}}
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
          
          {/*hemisphereLight不能castShadow*/}
          <hemisphereLight 
            intensity={0.7}
            skyColor={'#ff0800'} 
            groundColor={'#f77b77'} 
            //castShadow
          />
          <ambientLight 
            intensity={0.3}
            color={'#42b8eb'}
          />

          <primitive 
            object={light0}
            position={[-4,5,4]}
            color={'#f2ca66'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.5}//values between zero and 1. Default is zero.
            angle={Math.PI/7}//upper bound is Math.PI/2
            intensity={2}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={0.05}//試試0.01~0.07
            shadow-focus={0.001}//試試0.1~2
          />
          <primitive 
            object={light0.target}
            position={[0, 0, 0]}
          />
          
          <primitive 
            object={light4}
            position={[4,5,-4]}
            color={'#f2ca66'}
            distance={0}//Default is 0 (no limit)
            penumbra={0.5}//values between zero and 1. Default is zero.
            angle={Math.PI/7}//upper bound is Math.PI/2
            intensity={2}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={0.05}//試試0.01~0.07
            shadow-focus={0.001}//試試0.1~2
          />
          <primitive 
            object={light4.target}
            position={[0, 0, 0]}
          />

          <primitive 
            object={light1}
            position={[4,0,4]}
            color={'#ff0800'}
            distance={0}//Default is 0 (no limit)
            penumbra={0}//values between zero and 1. Default is zero.
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
            object={light3}
            position={[0,-3,0]}
            color={'#42b8eb'}
            distance={0}//Default is 0 (no limit)
            penumbra={0}//values between zero and 1. Default is zero.
            angle={Math.PI}//upper bound is Math.PI/2
            intensity={2}//Default is 1
            decay={2}
            castShadow
            shadow-mapSize-height={1024/512}//試試1024/500~1024
            shadow-mapSize-width={1024/512}//試試1024/500~1024
            shadow-bias={-0.5}//試試0.01~0.07
            shadow-focus={0.01}//試試0.1~2
          />
          <primitive 
            object={light3.target}
            position={[0, 0, 0]}
          />

          {/*
          <pointLight intensity={1} position={[4, 0, 4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4,0, 4]} color={'#f2ca66'} decay={2} castShadow/>
          <pointLight intensity={1} position={[4, 0, -4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4, 0, -4]} color={'#f2ca66'} decay={2} castShadow/>
          */}

        <Suspense fallback={null}>
          <MartirezRoom/>
          <ContactShadows  rotation-x={Math.PI / 2} position={[0,-3.5, 0]} opacity={0.2} width={20} height={20} blur={0.9} far={5}  />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
        </Canvas>
      </Wrapper>
  );
}

export default App;
