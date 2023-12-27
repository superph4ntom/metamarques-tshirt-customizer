import { IconCameraHeart, IconChevronLeft } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { state } from "./store";

const transition = { type: "spring", duration: 0.8 };

const headerAnimation = {
  initial: { opacity: 0, y: -120 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", duration: 1.8, delay: 1 },
};

const sectionAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};

export default function Overlay() {
  const snap = useSnapshot(state);

  return (
    <div className="container">
      <motion.header {...headerAnimation} className="header">
        <h1 className="logo">
          Meta<span>Marques</span>
        </h1>
      </motion.header>

      <AnimatePresence>
        {snap.intro ? <Intro key="main" /> : <Customizer key="custom" />}
      </AnimatePresence>
    </div>
  );
}

function Intro() {
  return (
    <motion.section {...sectionAnimation}>
      <div className="section-container">
        <div className="support-content">
          <p>
            Create your unique and exclusive <strong>crypto shirt</strong> with
            our brand-new customization tool.
          </p>
          <button
            style={{ background: "black" }}
            onClick={() => (state.intro = false)}
          >
            customize now
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function Customizer() {
  const snap = useSnapshot(state);

  const downloadCanvas = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      );
      link.click();
    } else {
      console.error("Canvas element not found");
    }
  };

  return (
    <motion.section {...sectionAnimation}>
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}
            ></div>
          ))}
        </div>

        <div className="decals">
          <div className="decals-container">
            {snap.decals.map((decal) => (
              <div
                key={decal}
                className="decal"
                onClick={() => (state.selectedDecal = decal)}
              >
                <img src={decal + "_thumb.png"} alt="brand" />
              </div>
            ))}
          </div>
        </div>

        <button
          className="share"
          style={{ background: snap.selectedColor }}
          onClick={downloadCanvas}
        >
          <IconCameraHeart />
          DOWNLOAD
        </button>

        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}
        >
          <IconChevronLeft />
          GO BACK
        </button>
      </div>
    </motion.section>
  );
}
