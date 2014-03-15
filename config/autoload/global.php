<?php

// local machine
//$dbase="main";
//$host="localhost";

// qa-machine:
$dbase="dikea";
$host="127.6.222.3";

$dsn = sprintf(
    'mysql:dbname='.$dbase.';host='.$host
);

return array(
    'db' => array(
        'driver'         => 'Pdo',
        'dsn'            => $dsn,
        'driver_options' => array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'Zend\Db\Adapter\Adapter'
            => 'Zend\Db\Adapter\AdapterServiceFactory',
        ),
    ),
);