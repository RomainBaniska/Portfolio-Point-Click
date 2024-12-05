import { initializeApp } from './initApp.js';
import { loadSprites } from './loadSprites.js';
import { resizeHandler } from './resizeHandler.js';
import { interactions } from './interactions.js';
import { loadTexts } from './loadTexts.js';

(async () => {
    const app = await initializeApp();
    const sprites = await loadSprites(app); 
    const texts = await loadTexts(sprites); 
    await resizeHandler(app, sprites);
    await interactions(app, sprites, texts);
})();