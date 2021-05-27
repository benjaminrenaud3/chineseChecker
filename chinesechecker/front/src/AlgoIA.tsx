import {Dot} from "./Game"
import {getAllowMoveForDot} from "./AlgoMove"


function getDotWithCoord(x: number, y: number, spots:Dot[]) {
    var tDot: Dot

    tDot = spots.find(element => element.x === x && element.y === y)
   
    if (tDot)
        return (tDot)
    console.log("Dot introuvable and its anormal")
}


function getDistanceBetweenDots(dot1 : Dot, dot2 : Dot) {
    return (Math.sqrt(Math.pow((dot2.x - dot1.x), 2) + Math.pow((dot2.y - dot1.y), 2)))
}

function getDistanceBetweenCoords(x1 : number, y1 : number, x2 : number, y2 : number) {
    return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
}


function getBestMoveForPlayer(player: string, spots: Dot[]) {
    let playerDots : Dot[] = []

    let oppositeX:number = 0
    let oppositeY:number = 0

    let distance:number = 100
    let saveStartDot:Dot
    let saveEndDot:Dot

    let tmp:number = 0

    switch(player) {
        case "red":
            oppositeX = 0;
            oppositeY = -8;
            break;
        case "green":
            oppositeX = 12;
            oppositeY = -4;
            break;
        case "brown":
            oppositeX = 12;
            oppositeY = 4;
            break;
        case "pink":
            oppositeX = 0;
            oppositeY = 8;
            break;
        case "orange":
            oppositeX = -12;
            oppositeY = 4;
            break;
        case "blue":
            oppositeX = -12;
            oppositeY = -4;
            break;
        default:
            break;
    }

    spots.forEach(item => {
        if (item.color === player)
            playerDots.push(item)
    })

    playerDots.forEach(item => {
        getAllowMoveForDot(item, spots).forEach(dot => {
            tmp = getDistanceBetweenCoords(dot.x, dot.y, oppositeX, oppositeY)
            if (tmp < distance && tmp > 4.25 && tmp != 6) {
                distance = tmp
                saveStartDot = item
                saveEndDot = dot
            }
        })
    })
    console.log(getDistanceBetweenCoords(6, -4, 12, -4))

    return([saveStartDot, saveEndDot])
}

export {getBestMoveForPlayer}



// rouge -> rose 0 -8
// vert -> orange 12 -4
// marron -> bleu 12 4

// rose -> rouge 0 8
// orange -> vert -12 4
// bleu -> marron -12 -4
