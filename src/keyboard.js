'use strict';

export default class MahjongKeyboard {
    constructor({
        keyboard = '.mj-keyboard',
        opener = '.mj-kb-open',
        type = 'after',
        placeAfter = '.mj-keyboard',
        tiles = {
            '1m': '&#126983;',
            '2m': '&#126984;',
            '3m': '&#126985;',
            '4m': '&#126986;',
            '5m': '&#126987;',
            '6m': '&#126988;',
            '7m': '&#126989;',
            '8m': '&#126990;',
            '9m': '&#126991;',

            '1p': '&#127001;',
            '2p': '&#127002;',
            '3p': '&#127003;',
            '4p': '&#127004;',
            '5p': '&#127005;',
            '6p': '&#127006;',
            '7p': '&#127007;',
            '8p': '&#127008;',
            '9p': '&#127009;',

            '1s': '&#126992;',
            '2s': '&#126993;',
            '3s': '&#126994;',
            '4s': '&#126995;',
            '5s': '&#126996;',
            '6s': '&#126997;',
            '7s': '&#126998;',
            '8s': '&#126999;',
            '9s': '&#127000;',

            '1z': '&#126976;',
            '2z': '&#126977;',
            '3z': '&#126978;',
            '4z': '&#126979;',
            '5z': '&#126982;',
            '6z': '&#126981;',
            '7z': '&#126980;',
        }
    }) {
        this.keyboard = keyboard;
        this.opener = opener;
        this.type = type;
        this.placeAfter = placeAfter;
        this.tiles = tiles;

        this.suits = [
            'm', 'p', 's', 'z'
        ];

        this.states = [];
    }

    init() {
        const kb = document.querySelector(this.keyboard);

        if (!kb) {
            return;
        }

        // open button
        const openButton = document.querySelector(this.opener);

        if (!openButton) {
            return;
        }

        let place = kb;
        if (this.keyboard !== this.placeAfter) {
            place = document.querySelector(this.placeAfter);
            if (!place) {
                return;
            }
        }

        let layout = document.createElement('div');
        layout.classList.add('mj-kb-layout');
        layout.classList.add('mj-kb-hide');

        if (this.type === 'fixed') {
            layout.classList.add('mj-kb-layout-fixed');
        }

        const html = `
        <table class="mj-kb-table">
        <tbody>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1m">${this.tiles['1m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="2m">${this.tiles['2m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="3m">${this.tiles['3m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="4m">${this.tiles['4m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="5m">${this.tiles['5m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="6m">${this.tiles['6m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="7m">${this.tiles['7m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="8m">${this.tiles['8m']}</a></td>
                <td><a class="mj-kb-tile" data-tile="9m">${this.tiles['9m']}</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1p">${this.tiles['1p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="2p">${this.tiles['2p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="3p">${this.tiles['3p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="4p">${this.tiles['4p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="5p">${this.tiles['5p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="6p">${this.tiles['6p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="7p">${this.tiles['7p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="8p">${this.tiles['8p']}</a></td>
                <td><a class="mj-kb-tile" data-tile="9p">${this.tiles['9p']}</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1s">${this.tiles['1s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="2s">${this.tiles['2s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="3s">${this.tiles['3s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="4s">${this.tiles['4s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="5s">${this.tiles['5s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="6s">${this.tiles['6s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="7s">${this.tiles['7s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="8s">${this.tiles['8s']}</a></td>
                <td><a class="mj-kb-tile" data-tile="9s">${this.tiles['9s']}</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1z">${this.tiles['1z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="2z">${this.tiles['2z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="3z">${this.tiles['3z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="4z">${this.tiles['4z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="5z">${this.tiles['5z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="6z">${this.tiles['6z']}</a></td>
                <td><a class="mj-kb-tile" data-tile="7z">${this.tiles['7z']}</a></td>
                <td class="mj-kb-undo"><a>&#8630;</a></td>
                <td class="mj-kb-clear"><a>&#10799;</a></td>
            </tr>
        </tbody>
        </table>
        `;

        layout.innerHTML = html;

        if (this.type === 'fixed') {
            const body = document.querySelector('body');
            body.appendChild(layout);
        } else {
            place.insertAdjacentElement('afterend', layout);
        }

        openButton.addEventListener('click', (e) => {
            e.preventDefault();

            const open = document.querySelector('.mj-kb-layout');
            if (open.classList.contains('mj-kb-hide')) {
                open.classList.remove('mj-kb-hide');
                const body = document.querySelector('body');
                body.style.paddingBottom = open.clientHeight + 'px';
            } else {
                open.classList.add('mj-kb-hide');
            }

            return false;
        });

        const tiles = layout.querySelectorAll('a.mj-kb-tile');
        tiles.forEach((tile) => {
            tile.addEventListener('click', (e) => {
                let ho = this.splitHand(kb.value);

                if (this.countHandObject(ho) === 13) {
                    kb.value = this.joinHand(ho) + tile.getAttribute('data-tile');
                } else {
                    ho = this.addToHandObject(ho, tile.getAttribute('data-tile'));
                    kb.value = this.joinHand(ho);
                }

                this.states.push(kb.value);

                kb.dispatchEvent(new Event('input', {
                    bubbles: true,
                    cancelable: true,
                }));
            });
        });

        const clear = layout.querySelector('.mj-kb-clear a');
        clear.addEventListener('click', (e) => {
            kb.value = '';
            this.states = [];

            kb.dispatchEvent(new Event('input', {
                bubbles: true,
                cancelable: true,
            }));
        });

        const undo = layout.querySelector('.mj-kb-undo a');
        undo.addEventListener('click', (e) => {
            this.states.pop();
            kb.value = this.states.slice(-1);

            kb.dispatchEvent(new Event('input', {
                bubbles: true,
                cancelable: true,
            }));
        });
    }

    splitHand(hand) {
        const max = hand.length - 1;
        let currentSuit = null;
        let handObject = [];
        for (let i = max; i >= 0; i--) {
            if (!Number.isInteger(parseInt(hand[i])) && this.suits.includes(hand[i])) {
                currentSuit = hand[i];
            } else if (Number.isInteger(parseInt(hand[i])) && currentSuit !== null) {
                if (currentSuit in handObject) {
                    handObject[currentSuit].push(parseInt(hand[i]));
                } else {
                    handObject[currentSuit] = [
                        parseInt(hand[i])
                    ];
                }
            }
        }

        this.suits.forEach((suit) => {
            if (suit in handObject) {
                handObject[suit].sort();
            }
        });

        return handObject;
    }

    joinHand(handObject) {
        let result = '';

        this.suits.forEach((suit) => {
            if (suit in handObject) {
                for (let i = 0; i < handObject[suit].length; i++) {
                    result += handObject[suit][i];
                }

                result += suit;
            }
        });

        return result;
    }

    addToHandObject(handObject, tile) {
        const suit = tile.substr(1,1);
        const value = parseInt(tile.substr(0, 1));

        if (this.suits.includes(suit)) {
            if (suit in handObject) {
                handObject[suit].push(value);
                handObject[suit].sort();
            } else {
                handObject[suit] = [
                    value
                ];
            }
        }

        return handObject;
    }

    countHandObject(handObject) {
        let count = 0;

        this.suits.forEach((suit) => {
            if (suit in handObject) {
                count += handObject[suit].length;
            }
        });

        return count;
    }
}

