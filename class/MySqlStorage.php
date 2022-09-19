<?php
include_once ("Storage.php");
class MySqlStorage implements Storage
{
    var $pdo;

    function __construct($dns, $user, $pass)
    {
        $this->pdo = new PDO($dns, $user, $pass);
    }

    public function save($figure)
    {
        $this->pdo->prepare('UPDATE board SET figures=?')
            ->execute(array($figure));
        return $this->load();

    }

    public function load()
    {
       return $this->pdo->query('SELECT * figures FROM board')
            ->fetch()[0];
    }
}
