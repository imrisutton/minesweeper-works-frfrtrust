var grid = [];
var rows = parseInt(prompt("how many rows?"));
var collum = parseInt(prompt("how many collums?"));
var flagtoggle = false;
var totmines = parseInt(prompt("how many mines?"));
var totflags = totmines;
document.getElementById("totflag").innerHTML = totflags;
var gameover = false;

// יוצר את לוח המשחק 
function start() {
    var tables = document.getElementById("minetable");

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        var tr = document.createElement("tr");

        for (let j = 0; j < collum; j++) {
            var td = document.createElement("td");
            var img = document.createElement("img");
            img.src = "masked_tile.png";

            grid[i][j] = {
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborCount: 0,
                rightflagged: false,
                td: td
            };

            img.onclick = function () {
                reveal(i, j);
            };

            td.appendChild(img);
            tr.appendChild(td);
        }

        tables.appendChild(tr);
    }

    laymines();
    neighbor();
}

// מפזר מוקשים בצורה רנדומלית
function laymines() {
    var mineplaced = 0;

    while (mineplaced < totmines) {
        var n1 = Math.floor(Math.random() * rows);
        var n2 = Math.floor(Math.random() * collum);

        if (grid[n1][n2].isMine == false) {
            grid[n1][n2].isMine = true;
            mineplaced++;
        }
    }
}

// מחשב כמה מוקשים יש סביב כל תא
function neighbor() {
    for (let o = 0; o < rows; o++) {
        for (let p = 0; p < collum; p++) {
            if (grid[o][p].isMine == false) {
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (grid[o + j] != undefined && grid[o + j][p + i] != undefined) {
                            if (grid[o + j][p + i].isMine) {
                                grid[o][p].neighborCount++;
                            }
                        }
                    }
                }
            }
        }
    }
}

// חושף תא מסדר דגלים חשיפת שכנים ללא מוקש לידם ובדיקת ניצחון או הפסד
function reveal(row, collum) {
    if (gameover == false) {

        var cell = grid[row][collum];

        if (cell.isRevealed) return;

        var img = document.createElement("img");

        img.onclick = function () {
            reveal(row, collum);
        };

        // מצב דגלים
        if (flagtoggle) {
            if (cell.isFlagged) {
                img.src = "masked_tile.png";
                cell.isFlagged = false;
                totflags++;
            }
            else if (totflags > 0) {
                img.src = "masked_tile_flag.png";
                cell.isFlagged = true;
                totflags--;
            }
            else {
                document.getElementById("totflag").innerHTML = "no more flags left to put";
                return;
            }

            cell.td.innerHTML = "";
            cell.td.appendChild(img);
            document.getElementById("totflag").innerHTML = totflags;
            return;
        }

        if (cell.isFlagged) return;

        cell.isRevealed = true;

        // מוקש
        if (cell.isMine) {
            img.src = "tile_exploded.png";
        }
        // תא ריק
        else if (cell.neighborCount == 0) {
            img.src = "revealed_tile.png";
        }
        // מספרים
        else {
            for (let i = 1; i <= 8; i++) {
                if (cell.neighborCount == i) {
                    img.src = "revealed_tile_" + i + ".png";
                    break;
                }
            }
        }

        cell.td.innerHTML = "";
        cell.td.appendChild(img);

        document.getElementById("totflag").innerHTML = totflags;

        // פתיחה של שכנים אם התא ריק
        if (cell.neighborCount == 0 && !cell.isMine) {
            for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
                for (let colOffset = -1; colOffset <= 1; colOffset++) {

                    var neighborRow = row + rowOffset;
                    var neighborCol = collum + colOffset;

                    if (
                        neighborRow >= 0 &&
                        neighborRow < rows &&
                        neighborCol >= 0 &&
                        neighborCol < grid[neighborRow].length
                    ) {
                        if (
                            !grid[neighborRow][neighborCol].isRevealed &&
                            !grid[neighborRow][neighborCol].isFlagged &&
                            !grid[neighborRow][neighborCol].isMine
                        ) {
                            reveal(neighborRow, neighborCol);
                        }
                    }
                }
            }
        }

        // הפסד / ניצחון
        if (cell.isMine) {
            lostgame(row, collum);
        }
        else {
            wingame();
        }
    }
}

//  ניצחון
function wingame() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < collum; j++) {
            var cell = grid[i][j];

            if (!cell.isMine && !cell.isRevealed) return;
            if (cell.isMine && !cell.isFlagged) return;
        }
    }

    alert("you won");
    gameover = true;
    document.getElementById("totflag").innerHTML = "YOU WON";
}

// הפסד + חשיפת כל המוקשים
function lostgame(clickedRow, clickedCollum) {
    gameover = true;
    alert("you lost");
    document.getElementById("totflag").innerHTML = "YOU LOST";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < collum; j++) {
            var cell = grid[i][j];

            if (i !== clickedRow || j !== clickedCollum) {

                if (cell.isFlagged && !cell.isMine) {
                    var saveimg = document.createElement("img");
                    saveimg.src = "tile_not_mine.png";
                    cell.td.innerHTML = "";
                    cell.td.appendChild(saveimg);
                }
                else if (cell.isMine) {
                    var mineImg = document.createElement("img");
                    mineImg.src = "revealed_tile_bomb.png";
                    cell.td.innerHTML = "";
                    cell.td.appendChild(mineImg);
                }
            }
        }
    }
}

// ריסט למשחק
function resetgame() {
    alert("המשחק עשה ריסט");
    location.reload();
}

// הפעלה/כיבוי מצב דגלים
function flagtoggles() {
    flagtoggle = !flagtoggle;
    var button = document.getElementById("button");

    if (flagtoggle === true) {
        button.style.backgroundColor = "green";
    }
    else {
        button.style.backgroundColor = "red";
    }
}

start();