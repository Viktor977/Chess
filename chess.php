<?php

include_once ("class/MySqlStorage.php");
include_once ('class/Board.php');
include_once ('class/Storage.php');
$dsn='mysql:host=localhost;dbname=chess;charset=utf8';
$username='brad';
$password='1234';

$storage=new MySqlStorage($dsn,$username,$password);
$board=new Board($storage);

if(isset($_GET['newFigures']))
    echo $board->newFigure();
if(isset($_GET['getFigures']))
    echo $board->getFigure();
if ((isset($_GET['moveFigure']))){
    echo $board->moveFigure($_GET['frCoord'],$_GET['toCoord']);
}
// -------------work with session--------------------------
/*
session_start();
if(isset($_GET['newFigures']))
    $_SESSION['map']='rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR';

echo $_SESSION['map'];


if(isset($_GET['getFigures']))
    echo $_SESSION['map'];

if(isset($_GET['moveFigure'])) {
    $frCoord = $_GET["'frCoord"];
    $toCoord = $_GET['toCoord'];
    $figure=$_SESSION['map'][$frCoord];
    $_SESSION["map"][$frCoord]='1';
    $_SESSION["map"][$toCoord]=$figure;
    echo $_SESSION['map'];
}
*/

