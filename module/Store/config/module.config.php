<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Store\Controller\Store' => 'Store\Controller\StoreController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'store' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/store[/][/:action[/]]',
                    'constraints' => array(
                        'action'=> '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                    'defaults' => array(
                        'controller' => 'Store\Controller\Store',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'store' => __DIR__ . '/../view',
        ),
    ),
);