var grid = [];
var isMine
var isRevealed
var isFlagged
var neighborCount
var td
for (var row = 0; row < 11; row++) {
    grid[row] = [];
    for (var collum = 0; collum < 11; collum++) {
        grid[row][collum] = [
            isMine = false,
            isRevealed= false,
            isFlagged= false,
            neighborCount = 0,
            td = document.createElement("td"),
            ]

    }
}
function laymines() {
    var totmines = parseInt(alert("input number"));
    var mineplaced = 0;
    var n1 = Math.floor(Math.random() * 11)
    var n2 = Math.floor(Math.random() * 11)
    while (totmines >= mineplaced) {
        if (grid[n1][n2].isMine == false) {
            grid[n1][n2].isMine = true;
            mineplaced++;
        }

    }
}
function neigbor() {
    for (var row = 0; row < 11; row++) {
        for (var collum = 0; collum < 11; collum++) {
            if (grid[row][collum].isMine == false) {
                for (var j = -1; j <= 1; j++) {
                    for (var i = -1; i <= 1; i++) {
                        if (grid[row + j] != undefined && grid[row + j][collum + i] != undefined) {


                            if (grid[row + j][collum + i].isMine) {
                                grid[row][collum].neighborCount++;
                            }

                        }
                    }
                }
            }
        }
    }
}

function reveal(row, collum) {
    var cell = grid[row][collum];
    var img = document.createElement("img");

    if (cell.isMine) {
        img.src = "revealed_tile_bomb.png";
    } else if (cell.neighborCount == 0) {
        img.src = "revealed_tile_0.png";
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

    cell.td.appendChild(img);
}