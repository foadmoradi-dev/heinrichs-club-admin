'use client'

import {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";
import {loadBasic} from "@tsparticles/basic";
import {loadAll} from "@tsparticles/all";
import {Triangle} from "../assets/effects/tsparticles-options";

const ParticlesEffect = ({options}) => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {

    };


    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options || Triangle}
            />
        );
    }


};

export default ParticlesEffect