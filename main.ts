namespace SpriteKind {
    export const Pieza = SpriteKind.create()
    export const Moneda = SpriteKind.create()
    export const Brote = SpriteKind.create()
    export const BroteMarchito = SpriteKind.create()
    export const Simbolo = SpriteKind.create()
    export const Equipo = SpriteKind.create()
    export const Cartel = SpriteKind.create()
    export const Interfaz = SpriteKind.create()
    export const Plastico = SpriteKind.create()
    export const Humo = SpriteKind.create()
    export const Arbol = SpriteKind.create()
    export const ArbolVivo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arbol, function (sprite, arbolSeco) {
    if (estado == "exploracion") {
        arbolSeco.setImage(assets.image`arbolVivo0`)
        arbolSeco.setKind(SpriteKind.ArbolVivo)
        arbolesRegados += 1
        info.changeScoreBy(15)
        if (piezas < capacidadPiezas) {
            piezas += 1
        }
        jugador.sayText("Arbol " + arbolesRegados + " de " + arbolesParaGanar, 900, false)
        actualizarContador()
    }
})
function cargarNivel4 () {
    tiles.setCurrentTilemap(tilemap`ciudadNaturaleza`)
    colocarRecursosYPeligros()
    dispositivo = sprites.create(assets.image`riego0`, SpriteKind.Equipo)
    tiles.placeOnTile(dispositivo, tiles.getTileLocation(15, 10))
    ponerCartel("SISTEMA RIEGO", 15, 5)
    ponerCartel("PARQUE CENTRAL", 5, 5)
    arbolesRegados = 0
    ponerArbol(22, 16)
    ponerArbol(22, 21)
    ponerArbol(22, 26)
    ponerArbol(14, 16)
    ponerArbol(14, 21)
    ponerArbol(14, 26)
    ponerArbol(27, 25)
    ponerArbol(9, 18)
}
function continuarExplorando () {
    estado = "exploracion"
    controller.moveSprite(jugador, velocidad, velocidad)
    actualizarContador()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        comprobarBoton("ARRIBA")
    }
})
function mejorarMochila () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    if (capacidadPiezas >= 5) {
        game.showLongText("Tu mochila ya puede cargar 5 piezas.", DialogLayout.Bottom)
    } else if (dinero < 20) {
        game.showLongText("Mochila +1: cuesta 20 monedas. Encuentra monedas amarillas en la ciudad.", DialogLayout.Bottom)
    } else if (game.ask("Mochila +1: $20", "A: comprar / B: volver")) {
        dinero += -20
        capacidadPiezas += 1
    }
    continuarExplorando()
}
function revelacionFinal () {
    game.showLongText("Nodo recibe una foto desde 2126: la maquina vieja tiene una placa oculta bajo el polvo.", DialogLayout.Full)
    game.showLongText("Dice: construida por Nico, Cami, Ale y Cris. Ustedes la construiran cuando sean grandes, despues de aprender a reparar su ciudad.", DialogLayout.Full)
    game.showLongText("Somos sus nietos y nietas. Encontramos la maquina y sus planos. El simbolo de las reparaciones se convirtio en la firma de su equipo.", DialogLayout.Full)
    game.showLongText("La maquina se quedo en 2126. Solo los mensajes viajan por Nodo. Cada vez que ustedes reparaban algo, veiamos mejorar nuestra ciudad.", DialogLayout.Full)
    game.showLongText("Gracias por escucharnos. Cuidar el agua, el aire y la naturaleza necesita muchas acciones. El futuro se construye desde hoy.", DialogLayout.Full)
}
function limpiarEscenario () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Pieza)
    sprites.destroyAllSpritesOfKind(SpriteKind.Moneda)
    sprites.destroyAllSpritesOfKind(SpriteKind.Brote)
    sprites.destroyAllSpritesOfKind(SpriteKind.BroteMarchito)
    sprites.destroyAllSpritesOfKind(SpriteKind.Simbolo)
    sprites.destroyAllSpritesOfKind(SpriteKind.Equipo)
    sprites.destroyAllSpritesOfKind(SpriteKind.Cartel)
    sprites.destroyAllSpritesOfKind(SpriteKind.Plastico)
    sprites.destroyAllSpritesOfKind(SpriteKind.Humo)
    sprites.destroyAllSpritesOfKind(SpriteKind.Arbol)
    sprites.destroyAllSpritesOfKind(SpriteKind.ArbolVivo)
    arrastrando = false
}
function mejorarHerramienta () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    if (nivelHerramienta == 1) {
        game.showLongText("Ya tienes la herramienta mejorada.", DialogLayout.Bottom)
    } else if (dinero < 30) {
        game.showLongText("Herramienta: cuesta 30 monedas. Permite reparar usando una pieza menos.", DialogLayout.Bottom)
    } else if (game.ask("Herramienta: $30", "A: comprar / B: volver")) {
        dinero += -30
        nivelHerramienta = 1
    }
    continuarExplorando()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        comprobarBoton("B")
    } else if (estado == "exploracion") {
        consultarMensaje()
    }
})
function comprobarBoton (boton: string) {
    if (nivelActual == 1) {
        esValido = pasoReparacion == 0 && boton == "A" || pasoReparacion == 1 && boton == "B" || pasoReparacion == 2 && boton == "A" || pasoReparacion == 3 && boton == "ARRIBA"
    } else if (nivelActual == 2) {
        esValido = pasoReparacion == 0 && boton == "A" || pasoReparacion == 1 && boton == "ARRIBA" || pasoReparacion == 2 && boton == "B" || pasoReparacion == 3 && boton == "A"
    } else if (nivelActual == 3) {
        esValido = pasoReparacion == 0 && boton == "B" || pasoReparacion == 1 && boton == "A" || pasoReparacion == 2 && boton == "ARRIBA" || pasoReparacion == 3 && boton == "B"
    } else if (nivelActual == 4) {
        esValido = pasoReparacion == 0 && boton == "ARRIBA" || pasoReparacion == 1 && boton == "B" || pasoReparacion == 2 && boton == "A" || pasoReparacion == 3 && boton == "ARRIBA"
    }
    if (esValido) {
        pasoReparacion += 1
        if (pasoReparacion == 4) {
            completarMision()
        } else {
            actualizarContador()
        }
    } else {
        pasoReparacion = 0
        jugador.sayText("Intenta de nuevo", 1200, false)
        actualizarContador()
    }
}
function prepararMenu () {
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Default, miniMenu.StyleProperty.Margin, 3)
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, -1)
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, -5)
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 4)
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
    miniMenu.setStyleProperty(menuPersonajes, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Border, 1)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        comprobarBoton("A")
    } else if (estado == "exploracion") {
        buscarBroteMarchito()
        if (estaCerca(maquina)) {
            consultarMensaje()
        } else if (estaCerca(botiquin)) {
            info.setLife(3)
            jugador.sayText("Tres corazones!", 1200, false)
        } else if (estaCerca(mochila)) {
            mejorarMochila()
        } else if (estaCerca(herramienta)) {
            mejorarHerramienta()
        } else if (arrastrando && piezas < capacidadPiezas && Math.abs(jugador.x - dispositivo.x) < 40 && Math.abs(jugador.y - dispositivo.y) < 40) {
            soltarPlastico()
        } else if (estaCerca(dispositivo) && !(misionCompletada)) {
            iniciarReparacion()
        } else if (brotePisadoCerca) {
            revivirBrote()
        } else {
            jugador.sayText("Acercate a un equipo y pulsa A", 1200, false)
        }
    }
})
function volverALaBase () {
    tiles.placeOnTile(jugador, tiles.getTileLocation(6, 6))
    info.setLife(3)
    protegidoHasta = game.runtime() + 1500
    continuarExplorando()
}
function cargarNivel2 () {
    tiles.setCurrentTilemap(tilemap`ciudadAgua`)
    colocarRecursosYPeligros()
    dispositivo = sprites.create(assets.image`planta0`, SpriteKind.Equipo)
    tiles.placeOnTile(dispositivo, tiles.getTileLocation(11, 20))
    ponerCartel("PLANTA AGUA", 11, 18)
    ponerCartel("ENTRADA", 5, 5)
}
function revivirBrote () {
    broteElegido.setImage(assets.image`brote0`)
    broteElegido.setKind(SpriteKind.Brote)
    protegidoHasta = game.runtime() + 2500
    info.changeScoreBy(10)
    jugador.sayText("Revivio! Cuidado donde pisas", 1000, false)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        comprobarBoton("IZQUIERDA")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Plastico, function (sprite, otroPlastico) {
    if (estado == "exploracion" && !(arrastrando)) {
        arrastrando = true
        plastico = otroPlastico
        otroPlastico.follow(jugador, 70)
        jugador.sayText("Llevalo a la planta", 1000, false)
    }
})
function presentarHistoria () {
    scene.setBackgroundImage(assets.image`portadaHistoria0`)
    game.splash("Mensaje desde 2126", "Ayuda hoy al futuro")
    game.showLongText("2026. Nico, Cami, Ale y Cris reciben un mensaje de una cuenta desconocida en Nodo, su aplicacion de chat. Dice venir de 2126...", DialogLayout.Full)
    game.showLongText("Somos sus nietos y nietas. Encontramos una maquina vieja que envia mensajes al pasado. La conectamos a Nodo. Aqui falta agua limpia, hay basura y casi no quedan zonas verdes.", DialogLayout.Full)
    game.showLongText("Sus acciones de hoy cambian nuestro futuro. Elige tu personaje. Flechas: caminar. A: usar equipos. B: leer Nodo. La terminal de la base recibe los mensajes. No hay combates.", DialogLayout.Full)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Moneda, function (sprite, moneda) {
    if (estado == "exploracion") {
        sprites.destroy(moneda, effects.disintegrate, 500)
        dinero += 10
        info.changeScoreBy(5)
        actualizarContador()
    }
})
function finalDelJuego () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    game.showLongText("Nodo: enviando a 2126 el reporte del parque...", DialogLayout.Full)
    game.showLongText("2126: El parque esta lleno de gente. Hay sombra, hay pajaros, y el aire huele a tierra mojada. Crecimos jugando aqui.", DialogLayout.Full)
    revelacionFinal()
    if (info.score() >= 900) {
        rango = "ORO"
    } else if (info.score() >= 600) {
        rango = "PLATA"
    } else {
        rango = "BRONCE"
    }
    game.showLongText("Las cuatro ciudades estan reparadas. " + personajeSeleccionado + " termino con " + info.score() + " puntos y " + dinero + " monedas.", DialogLayout.Full)
    game.splash("RANGO: " + rango, "Gracias por salvarnos")
    game.over(true, effects.confetti)
}
function respuestaDel2126 () {
    game.showLongText("Nodo: enviando a 2126 el reporte de la reparacion...", DialogLayout.Full)
    if (nivelActual == 1) {
        game.showLongText("2126: Lo estamos viendo cambiar delante nuestro. El vertedero que había junto al colegio hoy es una plaza con árboles. Reciclar desde su tiempo hizo que nunca llegara a crecer.", DialogLayout.Full)
        game.showLongText("Primera pista: detrás del recolector apareció un símbolo. Los nietos dicen que tambien esta en su maquina. ¿Quien lo puso ahi?", DialogLayout.Full)
    } else if (nivelActual == 2) {
        game.showLongText("2126: El río volvió. La planta y el cuidado del rio ayudaron a recuperar el agua. Hoy bebemos de ahí y hay peces otra vez.", DialogLayout.Full)
        game.showLongText("Segunda pista: el mismo símbolo está grabado en la planta. Alguien lo dejó ahí antes de que ustedes llegaran.", DialogLayout.Full)
    } else {
        game.showLongText("2126: Hoy vimos el cielo azul por primera vez. Sus reparaciones iniciaron cien anos de cuidado, mantenimiento y aire mas limpio.", DialogLayout.Full)
        game.showLongText("Tercera pista: otra vez el símbolo, y esta vez con una fecha grabada al lado. Es la fecha de hoy. La de ustedes.", DialogLayout.Full)
    }
}
function prepararPersonaje () {
    capacidadPiezas = 3
    velocidad = 90
    descuentoPiezas = 0
    puntosReparacion = 100
    if (personajeSeleccionado == "Nico") {
        jugador = sprites.create(assets.image`nico0`, SpriteKind.Player)
        capacidadPiezas = 4
    } else if (personajeSeleccionado == "Cami") {
        jugador = sprites.create(assets.image`cami0`, SpriteKind.Player)
        descuentoPiezas = 1
    } else if (personajeSeleccionado == "Ale") {
        jugador = sprites.create(assets.image`ale0`, SpriteKind.Player)
        velocidad = 110
    } else {
        jugador = sprites.create(assets.image`cris`, SpriteKind.Player)
        puntosReparacion = 125
    }
    scene.setBackgroundColor(15)
    scene.cameraFollowSprite(jugador)
    info.setScore(0)
    info.setLife(3)
    fondoContador = sprites.create(assets.image`barraEstado0`, SpriteKind.Interfaz)
    fondoContador.setFlag(SpriteFlag.RelativeToCamera, true)
    fondoContador.setPosition(80, 112)
    fondoContador.z = 99
    contador = fancyText.create("")
    contador.setFlag(SpriteFlag.RelativeToCamera, true)
    contador.setPosition(80, 112)
    contador.z = 100
    fancyText.setColor(contador, 1)
}
function consultarMensaje () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    if (nivelActual == 1) {
        calcularCosto()
        game.showLongText("2126: La basura se acumula sin control. El reciclador está roto. Busca " + costoReparacion + " piezas y repáralo. ¡El planeta te necesita!", DialogLayout.Full)
    } else if (nivelActual == 2) {
        calcularCosto()
        game.showLongText("2126: El agua escasea y el río bajó lleno de basura. La planta de tratamiento está destruida. Necesitas " + costoReparacion + " piezas: búscalas en la ciudad, o métete al agua, engancha la basura y llévala a la planta.", DialogLayout.Full)
    } else if (nivelActual == 3) {
        calcularCosto()
        game.showLongText("2126: El aire es tóxico. Las máquinas de filtración no funcionan hace años. Busca " + costoReparacion + " piezas y actívalas. Necesitamos aire limpio.", DialogLayout.Full)
    } else {
        calcularCosto()
        game.showLongText("2126: El parque necesita vida. Camina hasta " + arbolesParaGanar + " arboles secos para regarlos. Luego busca " + costoReparacion + " piezas y repara el riego. Cuida los brotes verdes: si los pisas, pulsa A sobre ellos para revivirlos.", DialogLayout.Full)
    }
    continuarExplorando()
}
function anunciarCiudad () {
    if (nivelActual == 1) {
        game.splash("CIUDAD DEL RECICLAJE", "Mensaje 1 de 4")
    } else if (nivelActual == 2) {
        game.splash("CIUDAD DEL AGUA", "Mensaje 2 de 4")
    } else if (nivelActual == 3) {
        game.splash("CIUDAD DEL AIRE", "Mensaje 3 de 4")
    } else {
        game.splash("EL PARQUE CENTRAL", "Mensaje 4 de 4")
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pieza, function (sprite, otraPieza) {
    if (estado == "exploracion") {
        if (piezas < capacidadPiezas) {
            sprites.destroy(otraPieza, effects.disintegrate, 500)
            piezas += 1
            info.changeScoreBy(10)
            actualizarContador()
        } else {
            jugador.sayText("Mochila llena", 500, false)
        }
    }
})
function ponerCartel (texto: string, columna: number, fila: number) {
    cartel = fancyText.create(texto)
    cartel.setKind(SpriteKind.Cartel)
    fancyText.setColor(cartel, 1)
    tiles.placeOnTile(cartel, tiles.getTileLocation(columna, fila))
}
function colocarRecursosYPeligros () {
    for (let lugar of tiles.getTilesByType(assets.tile`marcaPieza0`)) {
        objeto = sprites.create(assets.image`pieza1`, SpriteKind.Pieza)
        tiles.placeOnTile(objeto, lugar)
        tiles.setTileAt(lugar, assets.tile`acera0`)
    }
    for (let lugar2 of tiles.getTilesByType(assets.tile`marcaMoneda0`)) {
        objeto = sprites.create(assets.image`moneda1`, SpriteKind.Moneda)
        tiles.placeOnTile(objeto, lugar2)
        tiles.setTileAt(lugar2, assets.tile`acera0`)
    }
    for (let lugar3 of tiles.getTilesByType(assets.tile`marcaPeligro0`)) {
        objeto = sprites.create(assets.image`brote0`, SpriteKind.Brote)
        tiles.placeOnTile(objeto, lugar3)
        tiles.setTileAt(lugar3, assets.tile`acera0`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        comprobarBoton("DERECHA")
    }
})
function actualizarContador () {
    if (estado == "reparacion") {
        if (nivelActual == 1) {
            fancyText.setText(contador, "A B A ^  |  Paso " + (pasoReparacion + 1) + "/4")
        } else if (nivelActual == 2) {
            fancyText.setText(contador, "A ^ B A  |  Paso " + (pasoReparacion + 1) + "/4")
        } else if (nivelActual == 3) {
            fancyText.setText(contador, "B A ^ B  |  Paso " + (pasoReparacion + 1) + "/4")
        } else {
            fancyText.setText(contador, "^ B A ^  |  Paso " + (pasoReparacion + 1) + "/4")
        }
    } else if (nivelActual == 4) {
        fancyText.setText(contador, "Arb " + arbolesRegados + "/" + arbolesParaGanar + " P " + piezas + "/" + capacidadPiezas + " $" + dinero)
    } else {
        fancyText.setText(contador, "Piezas " + piezas + "/" + capacidadPiezas + "  $" + dinero)
    }
    contador.setPosition(80, 112)
}
function cargarNivel3 () {
    tiles.setCurrentTilemap(tilemap`ciudadAire`)
    colocarRecursosYPeligros()
    dispositivo = sprites.create(assets.image`ventilador0`, SpriteKind.Equipo)
    tiles.placeOnTile(dispositivo, tiles.getTileLocation(20, 12))
    ponerCartel("FILTRADOR AIRE", 20, 8)
    ponerCartel("ZONA INDUSTRIAL", 5, 5)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Humo, function (sprite, nube) {
    if (estado == "exploracion" && game.runtime() >= protegidoHasta) {
        protegidoHasta = game.runtime() + 1500
        info.changeLifeBy(-1)
        jugador.sayText("Cof cof! El aire esta sucio", 800, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Brote, function (sprite, brote) {
    if (estado == "exploracion" && game.runtime() >= protegidoHasta) {
        protegidoHasta = game.runtime() + 1500
        brote.setImage(assets.image`brotePisado0`)
        brote.setKind(SpriteKind.BroteMarchito)
        info.changeLifeBy(-1)
        info.changeScoreBy(-10)
        jugador.sayText("Lo pise! Apreta A para revivirlo", 2000, false)
    }
})
function colocarBase () {
    maquina = sprites.create(assets.image`maquina0`, SpriteKind.Equipo)
    tiles.placeOnTile(maquina, tiles.getTileLocation(4, 4))
    botiquin = sprites.create(assets.image`botiquin0`, SpriteKind.Equipo)
    tiles.placeOnTile(botiquin, tiles.getTileLocation(7, 4))
    mochila = sprites.create(assets.image`mochila0`, SpriteKind.Equipo)
    tiles.placeOnTile(mochila, tiles.getTileLocation(10, 4))
    herramienta = sprites.create(assets.image`herramienta0`, SpriteKind.Equipo)
    tiles.placeOnTile(herramienta, tiles.getTileLocation(10, 7))
    ponerCartel("BASE NODO", 7, 2)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado == "reparacion") {
        pasoReparacion = 0
        continuarExplorando()
    }
})
function completarMision () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    misionCompletada = true
    piezas += 0 - costoReparacion
    dinero += 20
    info.changeScoreBy(puntosReparacion)
    if (nivelActual == 1) {
        animation.runImageAnimation(
        dispositivo,
        [assets.image`recolectorPaso1`,assets.image`recolectorPaso2`,assets.image`recolectorPaso3`,assets.image`recolectorPaso4`,assets.image`recolectorPaso5`,assets.image`recolectorPaso6`,assets.image`recolectorPaso7`],
        100,
        false
        )
    } else if (nivelActual == 2) {
        dispositivo.setImage(assets.image`plantaLista0`)
    } else if (nivelActual == 3) {
        dispositivo.setImage(assets.image`filtroListo0`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Humo)
    } else if (nivelActual == 4) {
        dispositivo.setImage(assets.image`riegoListo0`)
    }
    if (nivelActual < 4) {
        simbolo = sprites.create(assets.image`simbolo0`, SpriteKind.Simbolo)
        simbolo.setPosition(dispositivo.x, dispositivo.y - 20)
    }
    actualizarContador()
    if (nivelActual == 4) {
        finalDelJuego()
    } else {
        pause(2000)
        respuestaDel2126()
        game.showLongText("Misión completa: +20 monedas y +" + puntosReparacion + " puntos. Nodo vuelve a sonar: esta entrando el siguiente mensaje.", DialogLayout.Full)
        nivelActual += 1
        cargarNivel()
    }
}
info.onLifeZero(function () {
    volverALaBase()
    jugador.sayText("A salvo! Conservas tus recursos.", 2000, false)
})
function calcularCosto () {
    costoReparacion = Math.max(1, 3 - descuentoPiezas - nivelHerramienta)
}
function estaCerca (equipo: Sprite) {
    return Math.abs(jugador.x - equipo.x) < 22 && Math.abs(jugador.y - equipo.y) < 22
}
function soltarPlastico () {
    if (piezas < capacidadPiezas) {
        sprites.destroy(plastico)
        arrastrando = false
        piezas += 1
        info.changeScoreBy(10)
        jugador.sayText("Basura reciclada!", 800, false)
        actualizarContador()
    } else {
        jugador.sayText("Mochila llena", 800, false)
    }
}
function ponerArbol (columna: number, fila: number) {
    arbolNuevo = sprites.create(assets.image`arbolSeco0`, SpriteKind.Arbol)
    tiles.placeOnTile(arbolNuevo, tiles.getTileLocation(columna, fila))
}
function cargarNivel () {
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    color.startFade(color.originalPalette, color.Black)
    color.pauseUntilFadeDone()
    limpiarEscenario()
    misionCompletada = false
    if (nivelActual == 1) {
        cargarNivel1()
    } else if (nivelActual == 2) {
        cargarNivel2()
    } else if (nivelActual == 3) {
        cargarNivel3()
    } else {
        cargarNivel4()
    }
    colocarBase()
    volverALaBase()
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    color.startFade(color.Black, color.originalPalette)
    color.pauseUntilFadeDone()
    anunciarCiudad()
    consultarMensaje()
}
function iniciarReparacion () {
    calcularCosto()
    estado = "mensaje"
    controller.moveSprite(jugador, 0, 0)
    if (nivelActual == 4 && arbolesRegados < arbolesParaGanar) {
        game.showLongText("El riego no arranca con el parque seco. Te faltan " + (arbolesParaGanar - arbolesRegados) + " arboles por regar: camina hasta cada arbol seco.", DialogLayout.Bottom)
        continuarExplorando()
    } else if (piezas < costoReparacion) {
        game.showLongText("Necesitas " + costoReparacion + " piezas. Llevas " + piezas + ". Busca las piezas grises en las aceras.", DialogLayout.Bottom)
        continuarExplorando()
    } else {
        if (nivelActual == 1) {
            game.showLongText("Repara pulsando: A, B, A, ARRIBA. Si fallas, vuelve al primer paso. ABAJO cancela.", DialogLayout.Full)
        } else if (nivelActual == 2) {
            game.showLongText("Repara pulsando: A, ARRIBA, B, A. Si fallas, vuelve al primer paso. ABAJO cancela.", DialogLayout.Full)
        } else if (nivelActual == 3) {
            game.showLongText("Repara pulsando: B, A, ARRIBA, B. Si fallas, vuelve al primer paso. ABAJO cancela.", DialogLayout.Full)
        } else {
            game.showLongText("Repara pulsando: ARRIBA, B, A, ARRIBA. Si fallas, vuelve al primer paso. ABAJO cancela.", DialogLayout.Full)
        }
        pasoReparacion = 0
        estado = "reparacion"
        actualizarContador()
    }
}
function buscarBroteMarchito () {
    brotePisadoCerca = false
    for (let marchito of sprites.allOfKind(SpriteKind.BroteMarchito)) {
        if (jugador.overlapsWith(marchito)) {
            brotePisadoCerca = true
            broteElegido = marchito
        }
    }
}
function cargarNivel1 () {
    tiles.setCurrentTilemap(tilemap`ciudadReciclaje`)
    colocarRecursosYPeligros()
    dispositivo = sprites.create(assets.image`recolector0`, SpriteKind.Equipo)
    tiles.placeOnTile(dispositivo, tiles.getTileLocation(30, 18))
    ponerCartel("ESCUELA", 29, 6)
    ponerCartel("RECICLAJE", 30, 19)
    ponerCartel("PARQUE", 8, 23)
}
let plasticoNuevo: Sprite = null
let tipoBasura = 0
let humoNuevo: Sprite = null
let arbolNuevo: Sprite = null
let simbolo: Sprite = null
let objeto: Sprite = null
let cartel: fancyText.TextSprite = null
let contador: fancyText.TextSprite = null
let fondoContador: Sprite = null
let descuentoPiezas = 0
let rango = ""
let plastico: Sprite = null
let broteElegido: Sprite = null
let protegidoHasta = 0
let brotePisadoCerca = false
let misionCompletada = false
let herramienta: Sprite = null
let mochila: Sprite = null
let botiquin: Sprite = null
let maquina: Sprite = null
let pasoReparacion = 0
let esValido = false
let nivelHerramienta = 0
let arrastrando = false
let dinero = 0
let dispositivo: Sprite = null
let jugador: Sprite = null
let piezas = 0
let arbolesRegados = 0
let personajeSeleccionado = ""
let menuPersonajes: Sprite = null
let arbolesParaGanar = 0
let costoReparacion = 0
let puntosReparacion = 0
let velocidad = 0
let capacidadPiezas = 0
let nivelActual = 0
let estado = ""
estado = "seleccion"
nivelActual = 1
capacidadPiezas = 3
velocidad = 90
puntosReparacion = 100
costoReparacion = 3
arbolesParaGanar = 5
pause(500)
presentarHistoria()
color.startFade(color.originalPalette, color.Black)
color.pauseUntilFadeDone()
color.startFade(color.Black, color.originalPalette)
color.pauseUntilFadeDone()
menuPersonajes = miniMenu.createMenu(
miniMenu.createMenuItem("Ale: mas velocidad", assets.image`ale0`),
miniMenu.createMenuItem("Cami: ahorra 1 pieza", assets.image`cami0`),
miniMenu.createMenuItem("Cris: +25 al reparar", assets.image`cris`),
miniMenu.createMenuItem("Nico: carga 1 mas", assets.image`nico0`)
)
prepararMenu()
miniMenu.onButtonPressed(menuPersonajes, miniMenu.Button.A, function (selection, selectedIndex) {
    miniMenu.close(menuPersonajes)
    if (selectedIndex == 0) {
        personajeSeleccionado = "Ale"
    } else if (selectedIndex == 1) {
        personajeSeleccionado = "Cami"
    } else if (selectedIndex == 2) {
        personajeSeleccionado = "Cris"
    } else {
        personajeSeleccionado = "Nico"
    }
    prepararPersonaje()
    cargarNivel()
})
miniMenu.onSelectionChanged(menuPersonajes, function (selection, selectedIndex) {
    if (selectedIndex == 0) {
        scene.setBackgroundImage(assets.image`fondoAleVariante0`)
    } else if (selectedIndex == 1) {
        scene.setBackgroundImage(assets.image`fondoCami0`)
    } else if (selectedIndex == 2) {
        scene.setBackgroundImage(assets.image`fondoCrisVariante0`)
    } else {
        scene.setBackgroundImage(assets.image`fondoNicoAlternativo0`)
    }
})
game.onUpdateInterval(12000, function () {
    if (nivelActual == 2 && !(arrastrando)) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Plastico)
    }
})
game.onUpdateInterval(2500, function () {
    if (nivelActual == 3 && estado == "exploracion" && !(misionCompletada) && sprites.allOfKind(SpriteKind.Humo).length < 4) {
        humoNuevo = sprites.create(assets.image`nubeHumo0`, SpriteKind.Humo)
        animation.runImageAnimation(
        humoNuevo,
        [assets.image`humoPaso1`,assets.image`humoPaso2`,assets.image`humoPaso3`,assets.image`nubeHumo`],
        500,
        false
        )
        tiles.placeOnTile(humoNuevo, tiles.getTileLocation(randint(22, 32), randint(8, 18)))
        humoNuevo.setVelocity(-15, 0)
        humoNuevo.lifespan = 6000
    }
})
game.onUpdateInterval(3000, function () {
    if (nivelActual == 2 && estado == "exploracion" && sprites.allOfKind(SpriteKind.Plastico).length < 3) {
        tipoBasura = randint(1, 3)
        if (tipoBasura == 1) {
            plasticoNuevo = sprites.create(assets.image`plastico0`, SpriteKind.Plastico)
        } else if (tipoBasura == 2) {
            plasticoNuevo = sprites.create(assets.image`bolsa0`, SpriteKind.Plastico)
        } else {
            plasticoNuevo = sprites.create(assets.image`lata0`, SpriteKind.Plastico)
        }
        tiles.placeOnRandomTile(plasticoNuevo, assets.tile`agua0`)
    }
})
