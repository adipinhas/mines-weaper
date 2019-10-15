
var gGame;
var gBoard;
var gShownCellsCount = 0;
var clickstToSet = 0;
var isSetNegs = false;




function newObjectGame() {
    var gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        safeClicksAvailable: 0,
        firstClick: true,
        life: 3,
        mineSetClick: 0

    }
    return gGame;
}


function initGame(levelGame) {
    gGame = newObjectGame()
    document.querySelector('h1').innerText = '😃'
    Stop()
    clearWatch()
    gLevel = chooseLevel(levelGame);
    buildBoard();
    setMinesNegsCount()
    renderBoard();
    stopWatch()
    document.getElementById('life').innerText='3 lives left'
    document.querySelector('p').innerText = ''
    document.getElementById('clicks').innerText ='3'


}
function restart(){
    initGame(2)
}
function chooseLevel(level) {
    if (level === 1) {
        var gLevel = {
            size: 4,
            mines: 2
        }
        return gLevel;
    }
    if (level === 2) {
        var gLevel = {
            size: 8,
            mines: 12
        }
        return gLevel;
    }
    if (level === 3) {
        var gLevel = {
            size: 12,
            mines: 30
        }
        return gLevel;
    }
}



function createCellObject() {
    var cellObject = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cellObject;
}

function buildBoard(noMineI, noMineJ) {
    gBoard = []
    for (var i = 0; i < gLevel.size; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = createCellObject();
        }
    }
    var count = 0;
    while (count < gLevel.mines) {
        var rndRow = Math.floor(Math.random() * gLevel.size)
        var rndcol = Math.floor(Math.random() * gLevel.size)
        if (rndRow === noMineI && rndcol === noMineJ) continue;
        if (!gBoard[rndRow][rndcol].isMine)
            gBoard[rndRow][rndcol].isMine = true;
        count++;

    }

}

function setMinesNegsCount() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            //if (gBoard[i][j] === -1) {
            if (gBoard[i][j].isMine) {
                for (var k = i - 1; k <= i + 1; k++) {
                    for (var s = j - 1; s <= j + 1; s++) {
                        if (k >= 0 && k < gLevel.size && s >= 0 && s < gLevel.size) {
                            if (!(k === i && s === j)) {
                                gBoard[k][s].minesAroundCount++;

                            }
                        }
                    }
                }
            }
        }
    }
}



function renderBoard() {
    var tdId = 0;
    var strHTML = '<table border="1">'
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            strHTML += `<td id="${tdId}" class="td"onmousedown="buttonMouse(event,this)"></td>`;
            tdId++;
        }
        strHTML += '</tr>';
    }
    strHTML += '</table>'
    document.querySelector('h3').innerHTML = strHTML;
}

function buttonMouse(event, cell) {
    // alert(cell.id+','+event.button)
    var i = Math.floor(cell.id / gLevel.size);
    var j = cell.id % gLevel.size;

    if (event.button === 0) {
        cellClicked(i, j)
    }
    if (event.button === 2) {
        markCell(i, j)
    }

}
function markCell(i, j) {
    if (!gGame.isOn) return;
    document.getElementById(i * gLevel.size + j).innerText = '🏴'
    gBoard[i][j].isMarked = true;
    if (gBoard[i][j].isMine) {
        gGame.markedCount++;
        if (gGame.markedCount === gLevel.mines) {
            gameOver(true)
        }
    }
}
//////////////////////////
function cellClicked(i, j) {
    if (gGame.firstClick) {
        buildBoard(i, j);
        debugger;
        setMinesNegsCount()
        gGame.firstClick = false;

    }
    if (!gGame.isOn) return;
    if (i >= 0 && i < gLevel.size && j >= 0 && j < gLevel.size) {
        if (gBoard[i][j].isShown) return;
        if (gBoard[i][j].isMine) {
            if (gGame.life === 1) {
                document.getElementById('life').innerText = ''
                debugger;
                gameOver(false)
            } else {
                gGame.life--;
                document.getElementById('life').innerText = gGame.life + ' lives left'
            }
        } else {
            if (gBoard[i][j].minesAroundCount === 0) {
                document.getElementById(i * gLevel.size + j).innerText = '';
                document.getElementById(i * gLevel.size + j).classList.add('zeroCellOpen');
                gBoard[i][j].isShown = true;
                gGame.shownCount++;
                cellClicked(i - 1, j - 1)
                cellClicked(i - 1, j)
                cellClicked(i - 1, j + 1)
                cellClicked(i, j - 1)
                cellClicked(i, j + 1)
                cellClicked(i + 1, j - 1)
                cellClicked(i + 1, j)
                cellClicked(i + 1, j + 1)
            } else {
                document.getElementById(i * gLevel.size + j).innerText = gBoard[i][j].minesAroundCount;
                document.getElementById(i * gLevel.size + j).classList.add('tdClicked');
                gBoard[i][j].isShown = true;
                gGame.shownCount++;

            }
            document.querySelector('p').innerText = 'cells shown : ' + gGame.shownCount


        }
    }
}
function gameOver(isVictory) {
    gGame.isOn = false;
    Stop()
    if (isVictory) {
        document.querySelector('h1').innerText = '😎'
    } else {
        document.querySelector('h1').innerText = '😵'
        exposeMines()


    }
}
function exposeMines() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            if (gBoard[i][j].isMine) {
                document.getElementById(i * gLevel.size + j).innerText = '💣'
            }
        }
    }
}
function safeClick() {
    if (gGame.safeClicksAvailable > 2) return;
    if (!gGame.isOn) return;
    gGame.safeClicksAvailable++;
    var freeCells = []
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                freeCells.push(i * gLevel.size + j)
            }
        }
    }
    var shuffleFreeCells = shuffle(freeCells)
    var cellId = shuffleFreeCells.pop();
    var freeCell = document.getElementById(cellId)
    freeCell.style.backgroundColor = 'blue'
    document.getElementById('clicks').innerText = 3 - gGame.safeClicksAvailable
    setTimeout(function () { freeCell.style.backgroundColor = 'white' }, 3000)
}





//////////////////////////////////////////////////////////////////////////////////////////////////////





