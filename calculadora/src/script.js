let estado = false;
//let valoresJuntos = '';
class Calculadora {

    
    constructor(valorPrevioTextElement, valorActualTextElement) {
        this.valorPrevioTextElement = valorPrevioTextElement
        this.valorActualTextElement = valorActualTextElement
        this.borrarTodo()
    }

    borrarTodo() {
        this.valorActual = ''
        this.valorPrevio = ''
        this.operacion = undefined
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1)
    }

    agregarNumero(numero) {
        if (numero === '.' && this.valorActual.includes('.')) return
        if (this.valorActual.length === 11) return
        this.valorActual = this.valorActual.toString() + numero.toString()
    }

    elejirOperacion(operacion) {
        if (this.valorActual === '') return
        if (this.valorPrevio !== '') {
            this.calcular()
        }
        this.operacion = operacion
        this.valorPrevio = this.valorActual
        this.valorActual = ''
    }

    calcular() {
        let resultado
        const valor_1 = parseFloat(this.valorPrevio)
        const valor_2 = parseFloat(this.valorActual)
        if (isNaN(valor_1) || isNaN(valor_2)) return
        switch (this.operacion) {
            case '+':
                resultado = valor_1 + valor_2
                break
            case '-':
                resultado = valor_1 - valor_2
                break
            case 'x':
                resultado = valor_1 * valor_2
                break
            case '÷':
                resultado = valor_1 / valor_2
                break
            case '%':
                resultado = valor_1*(valor_2/100) 
                break
            default:
                return
        }
        this.valortotal = `${valor_1} ${this.operacion} ${valor_2}`
        this.valorActual = resultado
        this.operacion = undefined
        this.valorPrevio = ''
        estado = true
    }

    obtenerNumero(numero) {
        const cadena = numero.toString()
        const enteros = parseFloat(cadena.split('.')[0])
        const decimales = cadena.split('.')[1]
        let mostrarEnteros
        if (isNaN(enteros)) {
            mostrarEnteros = ''
        } else {
            mostrarEnteros = enteros.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimales != null) {
            return `${mostrarEnteros}.${decimales}`
        } else {
            return mostrarEnteros
        }
    }

    actualizarPantalla() {
        let mostrarActual = this.obtenerNumero(this.valorActual)
        let mostrarPrev = `${this.obtenerNumero(this.valorPrevio)} ${this.operacion} `
        this.valorActualTextElement.innerText = mostrarActual
        if (this.operacion != null) {
            this.valorPrevioTextElement.innerText = mostrarPrev                      
        } else {
            this.valorPrevioTextElement.innerText = ''
        }
        if(estado === true){
            this.valorPrevioTextElement.innerText = `${this.valortotal} =`
            estado = false
            this.valortotal = ''
        }  
    }
}

const numeroButtons = document.querySelectorAll('[data-numero]')
const operacionButtons = document.querySelectorAll('[data-operacion]')
const igualButton = document.querySelector('[data-igual]')
const porcentajeButton = document.querySelector('[data-porcentaje]')
const borrarButton = document.querySelector('[data-borrar]')
const borrarTodoButton = document.querySelector('[data-borrar-todo]')
const valorPrevioTextElement = document.querySelector('[data-valor-previo]')
const valorActualTextElement = document.querySelector('[data-valor-actual]')

const calculator = new Calculadora(valorPrevioTextElement, valorActualTextElement)

numeroButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.agregarNumero(button.innerText)
        calculator.actualizarPantalla()
    })
})

operacionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.elejirOperacion(button.innerText)
        calculator.actualizarPantalla()
    })
})

borrarTodoButton.addEventListener('click', _button => {
    calculator.borrarTodo()
    calculator.actualizarPantalla()
})

borrarButton.addEventListener('click', _button => {
    calculator.borrar()
    calculator.actualizarPantalla()
})

igualButton.addEventListener('click', _button => {
    calculator.calcular()
    calculator.actualizarPantalla()
    calculator.borrarTodo() //se agrego el metodo 
})

// Parcial:
// 1. Arreglar bug para que limite los numero en pantalla - hecho ---R---
// 2. Funcionabilidad al boton de porcentaje - hecho
// 3. Muestrar la operacion completa en el display superior de la pantalla despues de presionar igual - hecho ----R---
// 4. Despues de igual al presionar un numero empieza una nueva operacion - hecho -----R---