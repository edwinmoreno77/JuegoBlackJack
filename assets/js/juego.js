
/*
2C = Two of Clubs (Treboles)
2D = Two of Diamonds (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Espadas)
*/
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputador = 0;

//Referencias HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');



const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const puntosHtml = document.querySelectorAll('small');

//Esta funcion crea un nuevo deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
}


crearDeck();


//Esta funcion me permite tomar una carta

const perdirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas';
    }

    const carta = deck.pop()

    //console.log(deck);
    // console.log(carta);
    return carta;
}

//perdirCarta();


//Esto me permite tener el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;




    // let puntos = 0;

    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {

    //     puntos = valor * 1;
    // }

    // console.log(puntos);

}
const valor = valorCarta(perdirCarta());
//console.log({ valor });

//turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = perdirCarta();
        puntosComputador = puntosComputador + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputador;

        // // <img class="carta" src="assets/cartas/10C.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }


    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputador === puntosMinimos) {
            alert('Nadie Gana');
        } else if (puntosMinimos > 21) {
            alert('Perdiste');
        } else if (puntosComputador > 21) {
            alert('Ganaste');
        } else {
            alert('Perdiste');
        }

    }, 500);
}


//Eventos

btnPedir.addEventListener('click', () => {
    const carta = perdirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10C.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }


});


btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosComputador = 0;
    puntosJugador = 0;
    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;
})