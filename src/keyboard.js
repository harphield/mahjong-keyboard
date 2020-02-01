'use strict';

export default class MahjongKeyboard {
    constructor({
        keyboard = '.mj-keyboard',
        opener = '.mj-kb-open',
        placeAfter = '.mj-keyboard'
    }) {
        this.keyboard = keyboard;
        this.opener = opener;
        this.placeAfter = placeAfter;

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

        const html = `
        <table class="mj-kb-table">
        <tbody>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1m">&#126983;</a></td>
                <td><a class="mj-kb-tile" data-tile="2m">&#126984;</a></td>
                <td><a class="mj-kb-tile" data-tile="3m">&#126985;</a></td>
                <td><a class="mj-kb-tile" data-tile="4m">&#126986;</a></td>
                <td><a class="mj-kb-tile" data-tile="5m">&#126987;</a></td>
                <td><a class="mj-kb-tile" data-tile="6m">&#126988;</a></td>
                <td><a class="mj-kb-tile" data-tile="7m">&#126989;</a></td>
                <td><a class="mj-kb-tile" data-tile="8m">&#126990;</a></td>
                <td><a class="mj-kb-tile" data-tile="9m">&#126991;</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1p">&#127001;</a></td>
                <td><a class="mj-kb-tile" data-tile="2p">&#127002;</a></td>
                <td><a class="mj-kb-tile" data-tile="3p">&#127003;</a></td>
                <td><a class="mj-kb-tile" data-tile="4p">&#127004;</a></td>
                <td><a class="mj-kb-tile" data-tile="5p">&#127005;</a></td>
                <td><a class="mj-kb-tile" data-tile="6p">&#127006;</a></td>
                <td><a class="mj-kb-tile" data-tile="7p">&#127007;</a></td>
                <td><a class="mj-kb-tile" data-tile="8p">&#127008;</a></td>
                <td><a class="mj-kb-tile" data-tile="9p">&#127009;</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1s">&#126992;</a></td>
                <td><a class="mj-kb-tile" data-tile="2s">&#126993;</a></td>
                <td><a class="mj-kb-tile" data-tile="3s">&#126994;</a></td>
                <td><a class="mj-kb-tile" data-tile="4s">&#126995;</a></td>
                <td><a class="mj-kb-tile" data-tile="5s">&#126996;</a></td>
                <td><a class="mj-kb-tile" data-tile="6s">&#126997;</a></td>
                <td><a class="mj-kb-tile" data-tile="7s">&#126998;</a></td>
                <td><a class="mj-kb-tile" data-tile="8s">&#126999;</a></td>
                <td><a class="mj-kb-tile" data-tile="9s">&#127000;</a></td>
            </tr>
            <tr>
                <td><a class="mj-kb-tile" data-tile="1z">&#126976;</a></td>
                <td><a class="mj-kb-tile" data-tile="2z">&#126977;</a></td>
                <td><a class="mj-kb-tile" data-tile="3z">&#126978;</a></td>
                <td><a class="mj-kb-tile" data-tile="4z">&#126979;</a></td>
                <td><a class="mj-kb-tile" data-tile="5z">&#126982;</a></td>
                <td><a class="mj-kb-tile" data-tile="6z">&#126981;</a></td>
                <td><a class="mj-kb-tile" data-tile="7z">&#126980;</a></td>
                <td class="mj-kb-undo"><a>&#8630;</a></td>
                <td class="mj-kb-clear"><a>&#128473;</a></td>
            </tr>
        </tbody>
        </table>
        `;

        layout.innerHTML = html;

        place.insertAdjacentElement('afterend', layout);

        openButton.addEventListener('click', (e) => {
            e.preventDefault();

            const open = document.querySelector('.mj-kb-layout');
            if (open.classList.contains('mj-kb-hide')) {
                open.classList.remove('mj-kb-hide');
            } else {
                open.classList.add('mj-kb-hide');
            }

            return false;
        });

        const tiles = layout.querySelectorAll('.mj-kb-tile');
        tiles.forEach((tile) => {
            tile.addEventListener('click', (e) => {
                let ho = this.splitHand(kb.value);

                if (this.countHandObject(ho) === 13) {
                    kb.value = this.joinHand(ho) + e.target.getAttribute('data-tile');
                } else {
                    ho = this.addToHandObject(ho, e.target.getAttribute('data-tile'));
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

