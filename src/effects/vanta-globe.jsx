'use client';

import { useEffect, useRef, useState } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

const VantaGlobe = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                GLOBE({
                    el: vantaRef.current,
                    THREE: THREE,
                    color: 0x78909C,
                    backgroundColor: 0x000000,
                    points: 12.0,
                    maxDistance: 24.0,
                    spacing: 16.0,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return <div ref={vantaRef} className="w-full h-screen -z-0 absolute end-0 " />;
};

export default VantaGlobe;
