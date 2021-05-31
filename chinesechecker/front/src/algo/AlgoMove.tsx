
export interface Dot {
    x: number;
    y: number;
    color: string;
    selected?: boolean;
    isMovableHere?: boolean;
  }


function getDotWithCoord(x: number, y: number, spots:Dot[]) {
    var tDot: Dot

    tDot = spots.find(element => element.x === x && element.y === y)
   
    if (tDot)
        return (tDot)
    console.log("Dot introuvable and its anormal")
}


function checkDotIsAllow(x: number, y: number, spots:Dot[], arrayAllowMove:Dot[], vToCheckFirstTime: boolean) {
    var tDot: Dot

    tDot = spots.find(element => element.x === x && element.y === y && element.color === "lightgrey")
    // console.log(tDot)

    if(tDot) {
        if(vToCheckFirstTime && !arrayAllowMove.find(element => element.x === x && element.y === y))
            arrayAllowMove.push(tDot)
        return (true)
    }
    return (false)
}


function checkAllowMoveForDot(vToCheckFirstTime: boolean, arrayAllowMove:Dot[], dot:Dot, spots:Dot[], vToExit: number) {

    if (vToExit >= 6)
        return

    if (!checkDotIsAllow(dot.x-1, dot.y-1, spots, arrayAllowMove, vToCheckFirstTime))
        if (checkDotIsAllow(dot.x-2, dot.y-2, spots, arrayAllowMove, true))
            checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x-2, dot.y-2, spots), spots, vToExit+1)

    if (!checkDotIsAllow(dot.x+1, dot.y-1, spots, arrayAllowMove, vToCheckFirstTime))
            if (checkDotIsAllow(dot.x+2, dot.y-2, spots, arrayAllowMove, true))
                checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x+2, dot.y-2, spots), spots, vToExit+1)

    if (!checkDotIsAllow(dot.x-1, dot.y+1, spots, arrayAllowMove, vToCheckFirstTime))
        if (checkDotIsAllow(dot.x-2, dot.y+2, spots, arrayAllowMove, true))
            checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x-2, dot.y+2, spots), spots, vToExit+1)

    if (!checkDotIsAllow(dot.x+1, dot.y+1, spots, arrayAllowMove, vToCheckFirstTime))
        if (checkDotIsAllow(dot.x+2, dot.y+2, spots, arrayAllowMove, true))
            checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x+2, dot.y+2, spots), spots, vToExit+1)
                  
    if (!checkDotIsAllow(dot.x-2, dot.y, spots, arrayAllowMove, vToCheckFirstTime))
        if (checkDotIsAllow(dot.x-4, dot.y, spots, arrayAllowMove, true))
            checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x-4, dot.y, spots), spots, vToExit+1)
            
    if (!checkDotIsAllow(dot.x+2, dot.y, spots, arrayAllowMove, vToCheckFirstTime))
        if (checkDotIsAllow(dot.x+4, dot.y, spots, arrayAllowMove, true))
            checkAllowMoveForDot(false, arrayAllowMove, getDotWithCoord(dot.x+4, dot.y, spots), spots, vToExit+1)}


function getAllowMoveForDot(dot: Dot, spots: Dot[]) : Dot[] {

    let arrayAllowMove = []
    let vToCheckFirstTime = true
    let vToExit = 0

    checkAllowMoveForDot(vToCheckFirstTime, arrayAllowMove, dot, spots, vToExit)
    
    for( var i = 0; i < arrayAllowMove.length; i++)
        if ( arrayAllowMove[i].x === dot.x && arrayAllowMove[i].y === dot.y)
            arrayAllowMove.splice(i, 1); 
    return(arrayAllowMove)
}

export {getAllowMoveForDot}