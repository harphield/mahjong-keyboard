# Mahjong Keyboard

[![npm version](https://badge.fury.io/js/mahjong-keyboard.svg)](https://badge.fury.io/js/mahjong-keyboard)

Virtual keyboard that outputs mahjong notation.

Manzu = 1-9m\
Pinzu = 1-9p\
Souzu = 1-9s\
Winds = 1-4z\
Dragons = 5-7z

Check out the [Demo](https://harphield.github.io/mahjong-keyboard/).

## How to use

- add to your project via npm (TODO)
- create mandatory elements
    - input for the notation (usually an input text field)
    - opener/closer button
- import keyboard's SCSS to your own SCSS file
```scss
@import "~mahjong-keyboard";
``` 
- import into JS and initialize
```javascript
import MahjongKeyboard from 'mahjong-keyboard';

const keyboard = new MahjongKeyboard({});
keyboard.init();
```
- default parameters that can be changed in the constructor
    - *keyboard*: selector for the input, where the notation is written (default **.mj-keyboard**)
    - *opener*: selector of the element you want to open and close the keyboard (default **.mj-kb-opener**)
    - *type*: after or fixed (default **after**). After will place the keyboard after placeAfter, fixed will put it on the bottom like a mobile keyboard.
    - *placeAfter*: selector of an element that you want to place the keyboard after (default **.mj-keyboard**)
    - *tiles*: you can customize each tile's representation. Defaults are UTF-8 mahjong tile glyphs. Format looks like this:
    ```javascript
    const keyboard = new MahjongKeyboard({
        tiles: {
            '1m': '<img class="mj-kb-tile-image" src="/images/tiles/m1.png">',
            '2m': '<img class="mj-kb-tile-image" src="/images/tiles/m2.png">',
            '3m': '<img class="mj-kb-tile-image" src="/images/tiles/m3.png">',
            '4m': '<img class="mj-kb-tile-image" src="/images/tiles/m4.png">',
            '5m': '<img class="mj-kb-tile-image" src="/images/tiles/m5.png">',
            '6m': '<img class="mj-kb-tile-image" src="/images/tiles/m6.png">',
            '7m': '<img class="mj-kb-tile-image" src="/images/tiles/m7.png">',
            '8m': '<img class="mj-kb-tile-image" src="/images/tiles/m8.png">',
            '9m': '<img class="mj-kb-tile-image" src="/images/tiles/m9.png">',

            '1p': '<img class="mj-kb-tile-image" src="/images/tiles/p1.png">',
            '2p': '<img class="mj-kb-tile-image" src="/images/tiles/p2.png">',
            '3p': '<img class="mj-kb-tile-image" src="/images/tiles/p3.png">',
            '4p': '<img class="mj-kb-tile-image" src="/images/tiles/p4.png">',
            '5p': '<img class="mj-kb-tile-image" src="/images/tiles/p5.png">',
            '6p': '<img class="mj-kb-tile-image" src="/images/tiles/p6.png">',
            '7p': '<img class="mj-kb-tile-image" src="/images/tiles/p7.png">',
            '8p': '<img class="mj-kb-tile-image" src="/images/tiles/p8.png">',
            '9p': '<img class="mj-kb-tile-image" src="/images/tiles/p9.png">',

            '1s': '<img class="mj-kb-tile-image" src="/images/tiles/s1.png">',
            '2s': '<img class="mj-kb-tile-image" src="/images/tiles/s2.png">',
            '3s': '<img class="mj-kb-tile-image" src="/images/tiles/s3.png">',
            '4s': '<img class="mj-kb-tile-image" src="/images/tiles/s4.png">',
            '5s': '<img class="mj-kb-tile-image" src="/images/tiles/s5.png">',
            '6s': '<img class="mj-kb-tile-image" src="/images/tiles/s6.png">',
            '7s': '<img class="mj-kb-tile-image" src="/images/tiles/s7.png">',
            '8s': '<img class="mj-kb-tile-image" src="/images/tiles/s8.png">',
            '9s': '<img class="mj-kb-tile-image" src="/images/tiles/s9.png">',

            '1z': '<img class="mj-kb-tile-image" src="/images/tiles/z1.png">',
            '2z': '<img class="mj-kb-tile-image" src="/images/tiles/z2.png">',
            '3z': '<img class="mj-kb-tile-image" src="/images/tiles/z3.png">',
            '4z': '<img class="mj-kb-tile-image" src="/images/tiles/z4.png">',
            '5z': '<img class="mj-kb-tile-image" src="/images/tiles/z5.png">',
            '6z': '<img class="mj-kb-tile-image" src="/images/tiles/z6.png">',
            '7z': '<img class="mj-kb-tile-image" src="/images/tiles/z7.png">',
        }
    });
    ```
    
