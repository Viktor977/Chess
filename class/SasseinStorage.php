<?php
include 'Storage.php';
class SasseinStorage implements Storage
{
    /**
     * @var string
     */
    private $name;

    function __construct($name)
    {
        $this->name = $name;
        session_start();
    }

    function save($figure)
    {
        $_SESSION[$this->name] = $figure;
    }

    function load()
    {
        return $_SESSION[$this->name];
    }

}
