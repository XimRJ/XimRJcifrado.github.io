

document.addEventListener('DOMContentLoaded', () => {
    const abecedarioDiv = document.getElementById('Abecedario');
    const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function mostrarAbecedario() {
        abecedarioDiv.innerHTML = abecedario.split('').map(letter => `<span>${letter}</span>`).join('');
    }

    function resaltarLetras(indiceMensaje, indiceClave) {
        const letras = abecedarioDiv.querySelectorAll('span');
        letras.forEach(letra => letra.classList.remove('highlight', 'highlight1'));
        letras[indiceMensaje]?.classList.add('highlight1');
        letras[indiceClave]?.classList.add('highlight');
    }

    async function mostrarResaltado(abecedarioIndices) {
        for (const { indiceMensaje, indiceClave } of abecedarioIndices) {
            resaltarLetras(indiceMensaje, indiceClave);
            await new Promise(resolve => setTimeout(resolve, 500)); // Espera medio segundo
        }
        limpiarResaltado();
    }

    function limpiarResaltado() {
        setTimeout(() => {
            const letras = abecedarioDiv.querySelectorAll('span');
            letras.forEach(letra => letra.classList.remove('highlight', 'highlight1'));
        }, 500);
    }

    function cifrarMensaje(mensaje, clave) {
        let resultado = "";
        let j = 0;
        const abecedarioIndices = [];

        mostrarAbecedario();

        for (let i = 0; i < mensaje.length; i++) {
            const letra = mensaje.charCodeAt(i);
            if (letra >= 65 && letra <= 90) { // A-Z
                const indiceMensaje = letra - 65;
                const indiceClave = clave.charCodeAt(j % clave.length) - 65;
                resultado += String.fromCharCode(((indiceMensaje + indiceClave) % 26) + 65);
                abecedarioIndices.push({ indiceMensaje, indiceClave });
                j++;
            } else {
                resultado += mensaje.charAt(i);
            }
        }

        mostrarResaltado(abecedarioIndices);
        return resultado;
    }

    function descifrarMensaje(mensaje, clave) {
        let resultado = "";
        let j = 0;
        const abecedarioIndices = [];

        mostrarAbecedario();

        for (let i = 0; i < mensaje.length; i++) {
            const letra = mensaje.charCodeAt(i);
            if (letra >= 65 && letra <= 90) { // A-Z
                const indiceMensaje = letra - 65;
                const indiceClave = clave.charCodeAt(j % clave.length) - 65;
                resultado += String.fromCharCode(((indiceMensaje - indiceClave + 26) % 26) + 65);
                abecedarioIndices.push({ indiceMensaje, indiceClave });
                j++;
            } else {
                resultado += mensaje.charAt(i);
            }
        }

        mostrarResaltado(abecedarioIndices);
        return resultado;
    }

    function validarSoloLetras(input) {
        input.value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    }

    // Elementos del DOM
    const mensajeCifrarInput = document.getElementById('MensajeCifrar');
    const claveCifrarInput = document.getElementById('ClaveCifrar');
    const mensajeDescifrarInput = document.getElementById('MensajeDescifrar');
    const claveDescifrarInput = document.getElementById('ClaveDescifrar');

    // Validación en tiempo real
    [mensajeCifrarInput, claveCifrarInput, mensajeDescifrarInput, claveDescifrarInput].forEach(input => {
        input.addEventListener('input', () => validarSoloLetras(input));
    });

    // Eventos para los botones de cifrado y descifrado
    document.getElementById('btnCifrar').addEventListener('click', () => {
        const mensaje = mensajeCifrarInput.value;
        const clave = claveCifrarInput.value;
        const resultado = cifrarMensaje(mensaje, clave);
        document.getElementById('MostrarCifrado').innerText = resultado;
    });

    document.getElementById('btnDescifrar').addEventListener('click', () => {
        const mensaje = mensajeDescifrarInput.value;
        const clave = claveDescifrarInput.value;
        const resultado = descifrarMensaje(mensaje, clave);
        document.getElementById('MostrarDescifrado').innerText = resultado;
    });

    mostrarAbecedario();
});
/*

const { expect } = require('chai');
const { cifrarMensaje, descifrarMensaje } = require('script.js');

describe('Cifrado Vigenère', function() {
    // Prueba para verificar si el cifrado funciona correctamente
    it('debería cifrar un mensaje correctamente', function() {
        const mensaje = 'HELLO';         // Mensaje a cifrar
        const clave = 'KEY';            // Clave de cifrado
        const mensajeCifrado = cifrarMensaje(mensaje, clave);  // Cifra el mensaje
        expect(mensajeCifrado).to.equal('RIJVS');  // Verifica que el mensaje cifrado sea el esperado
    });

    // Prueba para verificar si el descifrado funciona correctamente
    it('debería descifrar un mensaje correctamente', function() {
        const mensajeCifrado = 'RIJVS';    // Mensaje cifrado
        const clave = 'KEY';               // Clave de cifrado
        const mensajeDescifrado = descifrarMensaje(mensajeCifrado, clave);  // Descifra el mensaje
        expect(mensajeDescifrado).to.equal('HELLO');  // Verifica que el mensaje descifrado sea el esperado
    });

    // Prueba para verificar que los espacios y caracteres especiales no se cifren
    it('debería mantener los caracteres especiales y espacios sin cambios', function() {
        const mensaje = 'HELLO WORLD!';  // Mensaje con espacios y caracteres especiales
        const clave = 'KEY';             // Clave de cifrado
        const mensajeCifrado = cifrarMensaje(mensaje, clave);  // Cifra el mensaje
        expect(mensajeCifrado).to.equal('RIJVS UYVJN!');  // Verifica el mensaje cifrado
        const mensajeDescifrado = descifrarMensaje(mensajeCifrado, clave);  // Descifra el mensaje
        expect(mensajeDescifrado).to.equal(mensaje);  // Verifica que el mensaje descifrado sea igual al original
    });
});
*/
