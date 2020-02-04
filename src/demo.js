import MahjongKeyboard from './keyboard';

window.addEventListener('DOMContentLoaded', () => {
    const keyboard = new MahjongKeyboard({
        placeAfter: '.mj-kb-open',
    });

    keyboard.init();
});
