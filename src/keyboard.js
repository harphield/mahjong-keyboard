const suits = [
    'm', 'p', 's', 'z'
];

let states = [];

window.addEventListener('DOMContentLoaded', () => {
    const keyboards = document.querySelectorAll('.mj-keyboard');

    keyboards.forEach((kb, counter) => {
        let layout = document.createElement('div');
        layout.classList.add('mj-kb-layout');
        layout.classList.add('mj-kb-hide');
        layout.classList.add('mj-kb-number-' + counter);

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
                    <td class="mj-kb-undo"><a>Undo</a></td>
                    <td class="mj-kb-clear"><a>Clear</a></td>
                </tr>
            </tbody>
        </table>
        `;

        layout.innerHTML = html;

        kb.addEventListener('click', (e) => {
            e.preventDefault();

            const open = document.querySelector('.mj-kb-number-' + counter);
            open.classList.remove('mj-kb-hide');

            return false;
        });

        kb.insertAdjacentElement('afterend', layout);

        const tiles = layout.querySelectorAll('.mj-kb-tile');
        tiles.forEach((tile) => {
            tile.addEventListener('click', (e) => {
                let ho = splitHand(kb.value);
                // ho = addToHandObject(ho, e.target.getAttribute('data-tile'));
                kb.value = joinHand(ho) + e.target.getAttribute('data-tile');
                states.push(kb.value);
            });
        });

        const clear = layout.querySelector('.mj-kb-clear a');
        clear.addEventListener('click', (e) => {
            kb.value = '';
        });

        const undo = layout.querySelector('.mj-kb-undo a');
        undo.addEventListener('click', (e) => {
            states.pop();
            kb.value = states.slice(-1);
        });
    });
});

function splitHand(hand) {
    const max = hand.length - 1;
    let currentSuit = null;
    let handObject = [];
    for (let i = max; i >= 0; i--) {
        if (!Number.isInteger(parseInt(hand[i])) && suits.includes(hand[i])) {
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

    suits.forEach((suit) => {
        if (suit in handObject) {
            handObject[suit].sort();
        }
    });

    return handObject;
}

function joinHand(handObject) {
    let result = '';

    suits.forEach((suit) => {
        if (suit in handObject) {
            for (let i = 0; i < handObject[suit].length; i++) {
                result += handObject[suit][i];
            }

            result += suit;
        }
    });

    return result;
}

function addToHandObject(handObject, tile) {
    const suit = tile.substr(1,1);
    const value = parseInt(tile.substr(0, 1));

    if (suits.includes(suit)) {
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
