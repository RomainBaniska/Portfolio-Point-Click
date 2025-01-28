export async function loadSounds() {

    const unrollSound = PIXI.sound.add('unroll', '../sounds/unroll.mp3');
    unrollSound.volume = 0.3;
    unrollSound.speed = 1.3;


    return {
        unrollSound,
    };
}