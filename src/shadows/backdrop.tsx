import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { Color, RootState, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { RefObject, useRef } from "react";
import { state } from "../store";

type ShadowsRef = {
  getMesh: () => { material: { color: Color } };
};

export default function Backdrop() {
  const shadows: RefObject<ShadowsRef> = useRef<ShadowsRef>(null);

  useFrame((_frameState: RootState, delta: number) => {
    if (shadows.current) {
      const materialColor = shadows.current.getMesh().material.color;
      // @ts-expect-error: Ignore TypeScript error for the following line
      easing.dampC(materialColor, state.selectedColor, 0.25, delta);
    }
  });

  return (
    <AccumulativeShadows
      // @ts-expect-error: Ignore TypeScript error for the following line
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={2.05}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={1.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}
