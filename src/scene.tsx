import { Center, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraRig from "./cameras/camera-rig";
import "./index.css";
import Shirt from "./models/shirt";
import Backdrop from "./shadows/backdrop";

function Scene() {
  const rootElement: HTMLElement | null = document.getElementById("root");
  return (
    <>
      {rootElement ? (
        <Canvas
          shadows
          camera={{ position: [0, 0, 2.5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
          eventSource={rootElement}
          eventPrefix="client"
        >
          <ambientLight intensity={0.5} />
          <Environment files="/potsdamer_platz_1k.hdr" />

          <CameraRig>
            <Backdrop />
            <Center>
              <Shirt />
            </Center>
          </CameraRig>
        </Canvas>
      ) : null}
    </>
  );
}

export default Scene;
