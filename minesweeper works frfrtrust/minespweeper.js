var grid = [];
var rows = parseInt(prompt("how many rows?"));
var collum = parseInt(prompt("how many collums?"));
function start() {
    var tables = document.getElementById("minetable");
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        var tr = document.createElement("tr");
           
        for (let j = 0; j < collum; j++) {
            var td = document.createElement("td");
            var img = document.createElement("img");
            img.src = "masked_tile.png";
            img.onclick = function () {
                reveal(i, j);
            };

            td.appendChild(img);
            tr.appendChild(td);

            grid[i][j] = {
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborCount: 0,
                td: td
            };
        }

        tables.appendChild(tr);
    }
    laymines();
    neighbor();
}

    function laymines() {
        var totmines = parseInt(prompt("how many mines?"));
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

function reveal(row, collum) {
    if (grid[row][collum] === undefined) {
        return;
    }
    var cell = grid[row][collum];
    if (cell.isRevealed || cell.isFlagged) return;
    cell.isRevealed = true;

    var img = document.createElement("img");
    if (cell.isMine) {
        img.src = "revealed_tile_bomb.png";
        lostgame();

    } else if (cell.neighborCount == 0) {
        img.src = "revealed_tile.png";
        revealempty();
    } else if (cell.neighborCount == 1) {
        img.src = "revealed_tile_1.png";
    } else if (cell.neighborCount == 2) {
        img.src = "revealed_tile_2.png";
    } else if (cell.neighborCount == 3) {
        img.src = "revealed_tile_3.png";
    } else if (cell.neighborCount == 4) {
        img.src = "revealed_tile_4.png";
    } else if (cell.neighborCount == 5) {
        img.src = "revealed_tile_5.png";
    } else if (cell.neighborCount == 6) {
        img.src = "revealed_tile_6.png";
    } else if (cell.neighborCount == 7) {
        img.src = "revealed_tile_7.png";
    } else if (cell.neighborCount == 8) {
        img.src = "revealed_tile_8.png";
    }

    cell.td.innerHTML = "";
    cell.td.appendChild(img);
}
function lostgame() {
    alert("you lost")
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < collum; j++) {
         var cell = grid[i][j];
            if (cell.isMine) {
                var mineImg = document.createElement("img");
                mineImg.src = "revealed_tile_bomb.png";
                cell.td.innerHTML = "";
                cell.td.appendChild(mineImg);
            }
        }
    }
    location.reload();

}
function revealempty() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < collum; j++) {
            
        }
    }

}
start();
