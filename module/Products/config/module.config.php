<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Products\Controller\Products' => 'Products\Controller\ProductsController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'products' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/products[/][:action][/:do]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'do'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                    'defaults' => array(
                        'controller' => 'Products\Controller\Products',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'products' => __DIR__ . '/../view',
        ),
    ),
);