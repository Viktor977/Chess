var map;
var divSquare='<div id="s$coord" class="square $color"></div>';
var divFigure='<div id="f$coord" class="figure">$figure</div>';
var isDragged=false;
var isFlipped=false;

$(function (){
    start();
   // $('.buttonNew').click(newFiguresPHP);
   $('.buttonNew').click(newFigures);
    $('.buttonFlip').click(flipBoard);
    //setInterval('showFiguresPhp()',1000);
});

function start() {
    map = new Array(64);
    addSquares();
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
   // showFiguresPhp();
   showDate();
}

function flipBoard(){
    isFlipped=!isFlipped;
    start();
}
function newFigures(){
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');

}
function setDraggable(){

    $('.figure').draggable({

        start:function (event,ui){
            isDragged=true;
        }
    });

}

function setDroppable(){
    $('.square').droppable({
        drop:function (event,ui) {
            var frCoord = ui.draggable.attr('id').substring(1);
            var toCoord = this.id.substring(1);
            moveFigure(frCoord, toCoord);
           // moveFigurePhp(frCoord, toCoord);
            isDragged = false;
        }
    });
}

function moveFigure(frCoord,toCoord){
    console.log('move from :' + frCoord + '' + 'move to :'+ toCoord);

    let figure=map[frCoord];
    showFigureAt(frCoord,'1');
    showFigureAt(toCoord,figure);

}

function  addSquares(){
    $('.board').html('');
    for(let coord = 0;coord < 64;coord++)
        $('.board').append(divSquare
            .replace('$coord',isFlipped ? 63 - coord : coord)
            .replace('$color',isBlackSquareAt(coord) ? 'black':'white'));

    setDroppable();
}

function showFigures(figures) {
    for (let coord = 0; coord < 64; coord++)
        showFigureAt(coord, figures.charAt(coord));

}

function showFigureAt(coord,figure){
    if(map[coord]==figure)return;
    map[coord]=figure;
$('#s' + coord).html(divFigure
    .replace('$coord',coord)
    .replace("$figure",getChessSymbol(figure)));
     setDraggable();
};

function getChessSymbol(figure){
    switch (figure){
        case 'K':return '&#9812;';
        case 'Q':return '&#9813;';
        case 'R':return '&#9814;';
        case 'B':return '&#9815;';
        case 'N':return '&#9816;';
        case 'P':return '&#9817;';
        case 'k':return '&#9818;';
        case 'q':return '&#9819;';
        case 'r':return '&#9820;';
        case 'b':return '&#9821;';
        case 'n':return '&#9822;';
        case 'p':return '&#9823;';
        default :return '';
    }
};

function  isBlackSquareAt(coord){
    return (coord % 8 + Math.floor(coord / 8)) % 2;
};

function showFiguresPhp(){
    if(isDragged)return;
    $.get('chess.php?getFigures',showFigures);
};

function showDate(){
    let date=new Date();
    let curentdate=date.getDate()+'. '+date.getMonth()+'. '+date.getFullYear() ;
    console.log(curentdate);
    let p=document.getElementById('date');
    p.innerHTML=`${curentdate}`;
    
   
   

}



function moveFigurePhp(frCoord,toCoord){
    $.get('chess.php?moveFigure' +
          '&frCoord='+ frCoord +
          '&toCoord=' + toCoord,
           showFigures
    );

}
function newFiguresPHP(){
    $.get('chess.php?newFigures',showFigures);

}
