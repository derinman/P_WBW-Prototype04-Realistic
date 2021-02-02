import React, { useRef } from 'react'

import {useFrame} from 'react-three-fiber'

import {useGLTF} from "@react-three/drei"

import gltf from './resources/gltf/Pony Cartoon.glb'

const nodeToMesh =(nodes)=>{
  
  //動畫應該寫在這邊
  return(
  nodes.map(
    (data)=>
      
      <mesh
        key={data.name}
        geometry={data.geometry}
        material={data.material}
        position={[data.position.x,data.position.y,data.position.z]}
      />
      
      ))
}

const PonyCartoon = ()=> {

    // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
    // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
    // nodes is a named collection of meshes, materials a named collection of materials
    const gltf_ = useGLTF(gltf)
    const group = useRef();
    
    let nodes = gltf_.nodes
    let nodesMeshOnly = Object.values(nodes).filter(data=>data.type==='Mesh')

    //console.log(nodesMeshOnly)

    useFrame((state) =>{
        const t = state.clock.getElapsedTime()
        group.current.rotation.z = Math.sin(t / 1.5) / 20
        group.current.rotation.x = Math.cos(t / 4) / 20
        group.current.rotation.y = Math.sin(t / 4) / 8
        group.current.position.y = (Math.sin(t / 1.5)) / 10
    })
    


    return (
      <group
        ref={group}
      >
        {/* room */}
        {nodeToMesh(nodesMeshOnly)}


      </group>
    )
  }

export default PonyCartoon