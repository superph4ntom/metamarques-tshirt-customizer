import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { BufferGeometry, Mesh, MeshLambertMaterial } from "three";
import { useSnapshot } from "valtio";
import { state } from "../store";

export default function Shirt() {
  const snap = useSnapshot(state);
  const texture = useTexture(`/${snap.selectedDecal}.png`);
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");

  useFrame((_frameState, delta) => {
    easing.dampC(
      (materials.lambert1 as MeshLambertMaterial).color,
      snap.selectedColor,
      0.25,
      delta
    );
  });

  const shirtMesh = nodes.T_Shirt_male as Mesh;
  const shirtGeometry = shirtMesh.geometry as BufferGeometry;

  return (
    <mesh
      castShadow
      geometry={shirtGeometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
    >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.2}
        map={texture}
      />
    </mesh>
  );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
