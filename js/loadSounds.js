export async function loadSounds() {

    const unrollSound = PIXI.sound.add('unroll', '../sounds/unroll.mp3');
    unrollSound.volume = 0.3;
    unrollSound.speed = 1.3;

    const daythemeSound = PIXI.sound.add('daytheme', '../sounds/daytheme.mp3');
    daythemeSound.volume = 0.3;
    // daythemeSound.loop = true;

    const watersplashSound = PIXI.sound.add('watersplash', '../sounds/watersplash.mp3');
    watersplashSound.volume = 0.3;
    watersplashSound.speed = 0.9;

    const wipeeyesSound = PIXI.sound.add('wipeeyes', '../sounds/wipeeyes2.mp3');
    wipeeyesSound.volume = 0.9;
    wipeeyesSound.speed = 1;

    const pickupSound = PIXI.sound.add('pickup', '../sounds/pickup2.mp3');
    pickupSound.volume = 1;
    pickupSound.speed = 1;

    const drawerOpen = PIXI.sound.add('drawerOpen', '../sounds/drawerOpen.mp3');
    drawerOpen.volume = 0.35;
    drawerOpen.speed = 2;

    const drawerClose = PIXI.sound.add('drawerClose', '../sounds/drawerClose.mp3');
    drawerClose.volume = 0.35;
    drawerClose.speed = 2;

    const inputSound = PIXI.sound.add('input', '../sounds/input.mp3');
    inputSound.volume = 1;
    inputSound.speed = 1;

    const deleteInputSound = PIXI.sound.add('deleteinput', '../sounds/deleteinput.mp3');
    deleteInputSound.volume = 1;
    deleteInputSound.speed = 1;

    return {
        unrollSound,
        daythemeSound,
        watersplashSound,
        wipeeyesSound,
        pickupSound,
        drawerClose,
        drawerOpen,
        inputSound
    };
}