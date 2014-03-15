<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

/* todo: uncomment next lines on server machine.*/
//$dsn = sprintf(
//    'mysql:dbname=gfspock;host=gfspock-db.my.phpcloud.com',
//    get_cfg_var('zend_developer_cloud.db.gfspock'),
//    get_cfg_var('zend_developer_cloud.db.gfspock-db.my.phpcloud.com')
//);
//
//return array(
//    'db' => array(
//        'driver'         => 'Pdo',
//        'dsn'            => $dsn,
//        'username'  => 'gfspock',
//        'password'  => 'a025628',
//        'driver_options' => array(
//            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
//        ),
//    ),
//    'service_manager' => array(
//        'factories' => array(
//            'Zend\Db\Adapter\Adapter'
//            => 'Zend\Db\Adapter\AdapterServiceFactory',
//        ),
//    ),
//);
/* todo: uncomment next lines on local machine*/
$dsn = sprintf(
    'mysql:dbname=main;host=localhost',
    get_cfg_var('zend_developer_cloud.db.groot'),
    get_cfg_var('zend_developer_cloud.db.localhost')
);

return array(
    'db' => array(
        'driver'         => 'Pdo',
        'dsn'            => $dsn,
        'username'  => 'root',
        'password'  => '',
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