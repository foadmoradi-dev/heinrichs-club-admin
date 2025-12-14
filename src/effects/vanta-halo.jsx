'use client';
import { useEffect, useRef, useState } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

const VantaHalo = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(
                HALO({
                    el: vantaRef.current,
                    THREE,
                    backgroundColor: 0x000000,
                    baseColor: 0x2196f3, // main halo color (blue)
                    xOffset: 0.2,
                    yOffset: 0.2,
                    amplitudeFactor: 1.2,
                    size: 1.5,
                    mouseControls: true,
                    touchControls: true,
                    scale: 1.0,
                    scaleMobile: 1.0,
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default VantaHalo;
