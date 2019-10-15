
function manualyMode(levelGame) {
    isSetNegs=false;
    gGame = newObjectGame()
    document.querySelector('h1').innerText = '😃'
    Stop()
    clearWatch()
    gLevel = chooseLevel(levelGame);
    userBuildBoard()
    stopWatch()
    document.getElementById('life').innerText='3 lives left'
    document.querySelector('p').innerText = ''
    document.getElementById('clicks').innerText ='3'
    clickstToSet = 0;


}
function userBuildBoard() {
    gBoard = []
    for (var i = 0; i < gLevel.size; i++) {
        gBoard[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = createCellObject()
        }
    }
    var tdId = 0;
    var strHTML = '<table border="1">'
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            strHTML += `<td id="${tdId}" class="td"onmousedown="buttonMouse2(event,this)"></td>`;
            tdId++;
        }
        strHTML += '</tr>';
    }
    strHTML += '</table>'
    document.querySelector('h3').innerHTML = strHTML;


}
function buttonMouse2(event, cell) {
    var i = Math.floor(cell.id / gLevel.size);
    var j = cell.id % gLevel.size;

    if (event.button === 0) {
        if (clickstToSet < gLevel.mines) {
            mineSet(i, j);
            clickstToSet++;
        } else {
            gGame.firstClick = false;
            if (!isSetNegs) {
                debugger;
                setMinesNegsCount()
                isSetNegs = true;
            }
            cellClicked(i, j)
        }

    }
    if (event.button === 2) {
        markCell(i, j)
    }
}
function mineSet(i, j) {
    gBoard[i][j].isMine = true;
    document.getElementById(i * gLevel.size + j).classList.add('tdSignBomb');
    setTimeout(function () {document.getElementById(i * gLevel.size + j).classList.remove('tdSignBomb');
        
    }, 5000);


}
