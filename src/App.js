import React, { Suspense} from 'react'

import * as THREE from 'three'

import { Canvas } from 'react-three-fiber'

import styled from 'styled-components';

import { softShadows,ContactShadows, Environment,OrbitControls } from "@react-three/drei"

import MartirezRoom from './MartirezRoom.js'
import ShinyFish from './ShinyFish.js'

const Wrapper = styled.div`
  position: relative;
  height:100vh;
  width: 100vw;
  //background: linear-gradient(180deg, rgba(28,45,75,1) 70%, rgba(170,170,170,1) 100%);
  overflow: hidden;
`;

//softShadows()

function App() {
  
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

          <spotLight
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
            target-position={[0, 0, 0]}
          />

          
          <spotLight
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
            target-position={[0, 0, 0]}
          />


          <spotLight
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
            target-position={[0, 0, 0]}
          />

          <spotLight
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
            target-position={[0, 0, 0]}
          />


          {/*
          <pointLight intensity={1} position={[4, 0, 4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4,0, 4]} color={'#f2ca66'} decay={2} castShadow/>
          <pointLight intensity={1} position={[4, 0, -4]} color={'#e8cdcc'} decay={2} castShadow/>
          <pointLight intensity={1} position={[-4, 0, -4]} color={'#f2ca66'} decay={2} castShadow/>
          */}

        <Suspense fallback={null}>
          {/*<MartirezRoom/>*/}
          <ShinyFish/>
          <ContactShadows  rotation-x={Math.PI / 2} position={[0,-3.5, 0]} opacity={0.2} width={20} height={20} blur={0.9} far={5}  />
        </Suspense>
        
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
        
        </Canvas>
      </Wrapper>
  );
}

export default App;
