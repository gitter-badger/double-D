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
                    'route'    => '/products[/][:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
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