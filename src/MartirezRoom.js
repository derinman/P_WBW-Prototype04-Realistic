import React, { useState, useRef } from 'react'

import {useFrame} from 'react-three-fiber'

import { useSpring, animated as a } from 'react-spring/three'

import {useGLTF} from "@react-three/drei"

import gltf from './resources/gltf/Owe Ragnar Martirez Room.glb'

const MartirezRoom = ()=> {

    // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
    // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
    // nodes is a named collection of meshes, materials a named collection of materials
    const {nodes} = useGLTF(gltf)
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
    
    //console.log(nodes)

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

export default MartirezRoom