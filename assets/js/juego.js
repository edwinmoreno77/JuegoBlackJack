

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    //Referencias HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),

        puntosHtml = document.querySelectorAll('small');


    // Esta funcion inicializa en juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');


        btnDetener.disabled = false;
        btnPedir.disabled = false;

    };


    //Esta funcion crea un nuevo deck
    const crearDeck = () => {
        deck = [];
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

        return _.shuffle(deck);
    }



    //Esta funcion me permite tomar una carta

    const perdirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas';
        }

        return deck.pop();
    }


    //Esto me permite tener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }


    //Turno : 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputador] = puntosJugadores;

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

        }, 800);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputador = 0;
        do {
            const carta = perdirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = perdirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

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
        //acumularPuntos(carta, puntosJugadores.length - 1);
        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();

    });





    return {
        nuevoJuego: inicializarJuego
    };

})();