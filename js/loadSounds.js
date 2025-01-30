export async function loadSounds() {

    const unrollSound = PIXI.sound.add('unroll', '../sounds/unroll.mp3');
    unrollSound.volume = 0.3;
    unrollSound.speed = 1.3;

    const daythemeSound = PIXI.sound.add('daytheme', '../sounds/daytheme.mp3');
    daythemeSound.volume = 0.3
    // daythemeSound.loop = true;

    const watersplashSound = PIXI.sound.add('watersplash', '../sounds/watersplash.mp3');
    watersplashSound.volume = 0.3
    watersplashSound.speed = 0.9;


    return {
        unrollSound,
        daythemeSound,
        watersplashSound
    };
}