import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { ReactNode, useRef } from "react";
import { Euler } from "three";

type CameraRigProps = {
  children: ReactNode;
};

export default function CameraRig({ children }: CameraRigProps) {
  const group = useRef({ rotation: new Euler() });

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return (
    <group
      // @ts-expect-error: Ignore TypeScript error for the following line
      ref={group}
    >
      {children}
    </group>
  );
}
