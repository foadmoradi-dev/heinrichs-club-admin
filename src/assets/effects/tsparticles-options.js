import { curvesPathName } from "@tsparticles/path-curves";
import { MoveDirection, OutMode } from "@tsparticles/engine";
import { DestroyType, RotateDirection, StartValueType } from "@tsparticles/engine";

export const HyperspaceOption =   {
    autoPlay: true,
    background: {
        color: "#000000",
    },
    particles: {
        number: {
            value: 100,
        },
        color: {
            value: "#ffffff",
        },
        life: {
            count: 1,
            duration: {
                value: 5,
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 3,
        },
        move: {
            enable: true,
            speed: 10,
            decay: 0.005,
            direction: MoveDirection.outside,
            straight: true,
            outModes: OutMode.destroy,
            trail: {
                enable: true,
                length: 15,
                fill: {
                    color: "#000000",
                },
            },
        },
    },
    emitters: {
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 100,
            height: 100,
        },
        rate: {
            quantity: 10,
            delay: 0.1,
        },
    },
};

export const LinkOptions = {
    autoPlay: true,
    background: {
        color: { value: "#000000" },
        image: "",
        position: "",
        repeat: "",
        size: "",
        opacity: 100
    },
    backgroundMask: {
        composite: "destination-out",
        cover: {
            opacity: 1,
            color: { value: "" }
        },
        enable: false
    },
    clear: true,
    defaultThemes: {},
    delay: 0,
    fullScreen: { enable: true, zIndex: -2 },
    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    interactivity: {
        detectsOn: "window",
        events: {
            onClick: { enable: true, mode: "push" },
            onDiv: { selectors: {}, enable: false, mode: {}, type: "circle" },
            onHover: {
                enable: true,
                mode: "repulse",
                parallax: { enable: false, force: 2, smooth: 10 }
            },
            resize: { delay: 0.5, enable: true }
        },
        modes: {
            trail: { delay: 1, pauseOnStop: false, quantity: 1 },
            attract: {
                distance: 200,
                duration: 0.4,
                easing: "ease-out-quad",
                factor: 1,
                maxSpeed: 50,
                speed: 1
            },
            bounce: { distance: 200 },
            bubble: {
                distance: 400,
                duration: 2,
                mix: false,
                opacity: 0.8,
                size: 40,
                divs: {
                    distance: 200,
                    duration: 0.4,
                    mix: false,
                    selectors: {}
                }
            },
            connect: {
                distance: 80,
                links: { opacity: 0.5 },
                radius: 60
            },
            grab: {
                distance: 400,
                links: { blink: false, consent: false, opacity: 1 }
            },
            push: { default: true, groups: [], quantity: 4 },
            remove: { quantity: 2 },
            repulse: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: "ease-out-quad",
                divs: {
                    distance: 200,
                    duration: 0.4,
                    factor: 100,
                    speed: 1,
                    maxSpeed: 50,
                    easing: "ease-out-quad",
                    selectors: {}
                }
            },
            slow: { factor: 3, radius: 200 },
            particle: {
                replaceCursor: false,
                pauseOnStop: false,
                stopDelay: 0
            },
            light: {
                area: {
                    gradient: {
                        start: { value: "#ffffff" },
                        stop: { value: "#000000" }
                    },
                    radius: 1000
                },
                shadow: {
                    color: { value: "#000000" },
                    length: 2000
                }
            }
        }
    },
    manualParticles: [],
    particles: {
        bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
        collisions: {
            absorb: { speed: 2 },
            bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
            enable: false,
            maxSpeed: 50,
            mode: "bounce",
            overlap: { enable: true, retries: 0 }
        },
        color: {
            value: "#98f800",
            animation: {
                h: { count: 0, enable: false, speed: 1, decay: 0, delay: 0, sync: true, offset: 0 },
                s: { count: 0, enable: false, speed: 1, decay: 0, delay: 0, sync: true, offset: 0 },
                l: { count: 0, enable: false, speed: 1, decay: 0, delay: 0, sync: true, offset: 0 }
            }
        },
        effect: { close: true, fill: true, options: {}, type: {} },
        groups: [],
        move: {
            angle: { offset: 0, value: 90 },
            attract: {
                distance: 200,
                enable: false,
                rotate: { x: 3000, y: 3000 }
            },
            center: { x: 50, y: 50, mode: "percent", radius: 0 },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: true,
            gravity: { acceleration: 9.81, enable: false, inverse: false, maxSpeed: 50 },
            path: { clamp: true, delay: { value: 0 }, enable: false, options: {} },
            outModes: {
                default: "out",
                bottom: "out",
                left: "out",
                right: "out",
                top: "out"
            },
            random: false,
            size: false,
            speed: 2,
            spin: { acceleration: 0, enable: false },
            straight: false,
            trail: { enable: false, length: 10, fill: {} },
            vibrate: false,
            warp: false
        },
        number: {
            density: { enable: true, width: 1920, height: 1080 },
            limit: { mode: "delete", value: 0 },
            value: 80
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
                count: 0,
                enable: true,
                speed: 3,
                decay: 0,
                delay: 0,
                sync: false,
                mode: "auto",
                startValue: "random",
                destroy: "none"
            }
        },
        reduceDuplicates: false,
        shadow: {
            blur: 0,
            color: { value: "#000" },
            enable: false,
            offset: { x: 0, y: 0 }
        },
        shape: { close: true, fill: true, options: {}, type: "circle" },
        size: {
            value: { min: 0.1, max: 5 },
            animation: {
                count: 0,
                enable: true,
                speed: 20,
                decay: 0,
                delay: 0,
                sync: false,
                mode: "auto",
                startValue: "random",
                destroy: "none"
            }
        },
        stroke: { width: 0 },
        zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
        },
        destroy: {
            bounds: {},
            mode: "none",
            split: {
                count: 1,
                factor: { value: 3 },
                rate: { value: { min: 4, max: 9 } },
                sizeOffset: true,
                particles: {}
            }
        },
        roll: {
            darken: { enable: false, value: 0 },
            enable: false,
            enlighten: { enable: false, value: 0 },
            mode: "vertical",
            speed: 25
        },
        tilt: {
            value: 0,
            animation: { enable: false, speed: 0, decay: 0, sync: false },
            direction: "clockwise",
            enable: false
        },
        twinkle: {
            lines: {
                enable: true,
                frequency: 0.005,
                opacity: 1,
                color: { value: "#e6da0a" }
            },
            particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
                color: { value: "#ffff00" }
            }
        },
        wobble: {
            distance: 5,
            enable: false,
            speed: { angle: 50, move: 10 }
        },
        life: {
            count: 0,
            delay: { value: 0, sync: false },
            duration: { value: 0, sync: false }
        },
        rotate: {
            value: 0,
            animation: { enable: false, speed: 0, decay: 0, sync: false },
            direction: "clockwise",
            path: false
        },
        orbit: {
            animation: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: false
            },
            enable: false,
            opacity: 1,
            rotation: { value: 45 },
            width: 1
        },
        links: {
            blink: false,
            color: { value: "#ffd500" },
            consent: false,
            distance: 150,
            enable: true,
            frequency: 1,
            opacity: 0.4,
            shadow: {
                blur: 5,
                color: { value: "#000" },
                enable: false
            },
            triangles: { enable: false, frequency: 1 },
            width: 1,
            warp: false
        },
        repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
        }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    smooth: false,
    style: {},
    themes: [],
    zLayers: 100
};

export const FireFly = {
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    fpsLimit: 120,
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#fff",
        },
        life: {
            duration: {
                value: 5,
                sync: false,
            },
            count: 1,
        },
        opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
                enable: true,
                speed: 3,
            },
        },
        size: {
            value: {
                min: 3,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 3,
            random: false,
            size: true,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "trail",
            },
        },
        modes: {
            trail: {
                delay: 0.5,
                pauseOnStop: true,
                quantity: 4,
            },
        },
    },
    background: {
        color: "#000",
    },
};

export const Triangle = {
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    background: {
        color: "#000000",
    },
    particles: {
        number: {
            value: 100,
        },
        links: {
            distance: 125,
            enable: true,
            triangles: {
                enable: true,
                opacity: 0.1,
            },
        },
        move: {
            enable: true,
            speed: 5,
        },
        size: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
    },
};

export const SeaAnemone = {
    autoplay:true,
    fpsLimit: 120,
    fullScreen: { enable: true, zIndex: -2 },
    particles: {
        color: {
            value: "#FF0000",
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "destroy",
            },
            path: {
                clamp: false,
                enable: true,
                delay: {
                    value: 0,
                },
                generator: curvesPathName,
            },
            random: false,
            speed: 2,
            straight: false,
            trail: {
                fill: {
                    color: "#fff",
                },
                length: 30,
                enable: true,
            },
        },
        number: {
            value: 0,
            limit: { value: 100 },
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 10 },
            animation: {
                count: 1,
                startValue: "min",
                enable: true,
                speed: 10,
                sync: true,
            },
        },
    },
    background: {
        color: "#ffffff",
    },
    detectRetina: true,
    emitters: {
        direction: "none",
        rate: {
            quantity: 10,
            delay: 0.3,
        },
        size: {
            width: 0,
            height: 0,
            mode: "precise",
        },
        spawnColor: {
            value: "#ff0000",
            animation: {
                h: {
                    enable: true,
                    offset: {
                        min: -1.4,
                        max: 1.4,
                    },
                    speed: 5,
                    sync: false,
                },
                l: {
                    enable: true,
                    offset: {
                        min: 20,
                        max: 80,
                    },
                    speed: 0,
                    sync: false,
                },
            },
        },
        position: {
            x: 100,
            y: 0,
        },
    },
};

export const Stars = {
    background: {
        color: "#000",
    },
    particles: {
        number: {
            value: 100,
        },
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.out,
            },
            random: true,
            speed: 0.2,
            straight: false,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
            value: { min: 0, max: 1 },
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
};
export const Squares = {
    particles: {
        stroke: {
            width: 5,
            color: {
                value: [
                    "#5bc0eb",
                    "#fde74c",
                    "#9bc53d",
                    "#e55934",
                    "#fa7921",
                    "#2FF3E0",
                    "#F8D210",
                    "#FA26A0",
                    "#F51720",
                ],
            },
        },
        shape: {
            type: "square",
            options: {
                square: {
                    fill: false,
                },
            },
        },
        rotate: {
            value: 0,
            direction: RotateDirection.counterClockwise,
            animation: {
                enable: true,
                speed: 2,
                sync: true,
            },
        },
        size: {
            value: { min: 1, max: 500 },
            animation: {
                enable: true,
                startValue: StartValueType.min,
                speed: 60,
                sync: true,
                destroy: DestroyType.max,
            },
        },
    },
    background: {
        color: "#000",
    },
    emitters: {
        position: {
            y: 50,
            x: 50,
        },
        rate: {
            delay: 1,
            quantity: 1,
        },
    },
};