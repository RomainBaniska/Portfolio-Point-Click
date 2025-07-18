export async function loadSounds() {

    const unrollSound = PIXI.sound.add('unroll', '../sounds/unroll.mp3');
    unrollSound.volume = 0.3;
    // unrollSound.volume = 0;
    unrollSound.speed = 1.3;

    const daythemeSound = PIXI.sound.add('daytheme', '../sounds/daytheme.mp3');
    daythemeSound.volume = 0.3;
    // daythemeSound.loop = true;

    const nightthemeSound = PIXI.sound.add('nighttheme', '../sounds/nighttheme&bugs.mp3');
    nightthemeSound.volume = 0.3;

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

    const passwordValidSound = PIXI.sound.add('passwordValid', '../sounds/passwordValid3.mp3');
    passwordValidSound.volume = 1;
    passwordValidSound.speed = 1;

    const accessDeniedSound = PIXI.sound.add('accessDenied', '../sounds/accessDenied.mp3');
    accessDeniedSound.volume = 1;
    accessDeniedSound.speed = 1;

    const ewsthemeSound = PIXI.sound.add('ewstheme', '../sounds/ewstheme.mp3');
    ewsthemeSound.volume = 0.3;
    ewsthemeSound.speed = 1;

    const itemFoundPokemonSound = PIXI.sound.add('itemFoundPokemon', '../sounds/itemFoundPokemon.mp3');
    itemFoundPokemonSound.volume = 0.3;
    itemFoundPokemonSound.speed = 1;

    const unlockTableSound = PIXI.sound.add('unlockTable', '../sounds/unlocktable.mp3');
    unlockTableSound.volume = 1;
    unlockTableSound.speed = 1;

    const drawerStuckSound = PIXI.sound.add('drawerStuck', '../sounds/drawerstuck.mp3');
    drawerStuckSound.volume = 0.3;
    drawerStuckSound.speed = 1;

    const nespressoSound = PIXI.sound.add('nespresso', '../sounds/nespressoSound.mp3');
    nespressoSound.volume = 0.2;
    nespressoSound.speed = 1;

    const lavaboSound = PIXI.sound.add('lavaboSound', '../sounds/lavabo.mp3');
    lavaboSound.volume = 0.09;
    lavaboSound.speed = 1;

    const beefEyeOpenSound = PIXI.sound.add('beefEyeOpen', '../sounds/openbeefeye.mp3');
    beefEyeOpenSound.volume = 0.8;
    beefEyeOpenSound.speed = 1.4;

    const switchOnSound = PIXI.sound.add('switchOn', '../sounds/switchOnSound.mp3');
    switchOnSound.volume = 0.8;
    switchOnSound.speed = 1;

    const pouringWaterSound = PIXI.sound.add('pouringWater', '../sounds/pouringWaterSound.mp3');
    pouringWaterSound.volume = 0.8;
    pouringWaterSound.speed = 1;

    const podputSound = PIXI.sound.add('podput', '../sounds/podputSound.mp3');
    podputSound.volume = 1;
    podputSound.speed = 1;

    const openPannelSound = PIXI.sound.add('openPannel', '../sounds/openPannel.mp3');
    openPannelSound.volume = 1;
    openPannelSound.speed = 1.3;

    const unscrewSound = PIXI.sound.add('unscrew', '../sounds/unscrew.mp3');
    unscrewSound.volume = 1.2;
    unscrewSound.speed = 1.4;

    const hitSound = PIXI.sound.add('hit', '../sounds/hits.mp3');
    hitSound.volume = 1;
    hitSound.speed = 1;

    const deathSound = PIXI.sound.add('death', '../sounds/death.mp3');
    deathSound.volume = 1;
    deathSound.speed = 1;

    const stomachSound1 = PIXI.sound.add('stomach1', '../sounds/stomach1.mp3');
    stomachSound1.volume = 1;
    stomachSound1.speed = 1;

    const stomachSound2 = PIXI.sound.add('stomach2', '../sounds/stomach2.mp3');
    stomachSound2.volume = 1;
    stomachSound2.speed = 1;

    const stomachSound3 = PIXI.sound.add('stomach3', '../sounds/stomach3.mp3');
    stomachSound3.volume = 0.5;
    stomachSound3.speed = 1;

    const drinkSound = PIXI.sound.add('drink', '../sounds/drink.mp3');
    drinkSound.volume = 0.9;
    drinkSound.speed = 1;

    const ratpSound = PIXI.sound.add('ratp', '../sounds/whooshratp.mp3');
    ratpSound.volume = 0.9;
    ratpSound.speed = 1;

    const steamSound = PIXI.sound.add('steamnotif', '../sounds/steamnotif.mp3');
    steamSound.volume = 0.9;
    steamSound.speed = 1;
 
    const railSound = PIXI.sound.add('rail', '../sounds/railtrainsound2.mp3');
    railSound.volume = 0.4;
    railSound.speed = 0.8;

    const metalStompSound = PIXI.sound.add('metalimpact', '../sounds/metalimpact2.mp3');
    metalStompSound.volume = 1;
    metalStompSound.speed = 1;

    const doorslamSound = PIXI.sound.add('doorslam', '../sounds/doorslam2.mp3');
    doorslamSound.volume = 0.8;
    doorslamSound.speed = 1;

    const trapOpenSound = PIXI.sound.add('trapopen', '../sounds/trapopen.mp3');
    trapOpenSound.volume = 1;
    trapOpenSound.speed = 1;

    const trapCloseSound = PIXI.sound.add('trapclose', '../sounds/trapclose.mp3');
    trapCloseSound.volume = 1;
    trapCloseSound.speed = 1;

    const coffeSound = PIXI.sound.add('coffesound', '../sounds/cafesoundvideo3.mp3');
    coffeSound.volume = 1;
    coffeSound.speed = 1;

    const almaScreamSound = PIXI.sound.add('almascream', '../sounds/almascream.mp3');
    almaScreamSound.volume = 0.1;
    almaScreamSound.speed = 0.8;

    return {
        unrollSound,
        daythemeSound,
        nightthemeSound,
        watersplashSound,
        wipeeyesSound,
        pickupSound,
        drawerClose,
        drawerOpen,
        inputSound,
        passwordValidSound,
        ewsthemeSound,
        accessDeniedSound,
        itemFoundPokemonSound,
        unlockTableSound,
        drawerStuckSound,
    };
}