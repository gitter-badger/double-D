<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Category\Controller\Category' => 'Category\Controller\CategoryController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'category' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/category[/][/:list_type][/:list_id]',
                    'constraints' => array(
                        'list_type'=> '[a-zA-Z][a-zA-Z0-9_-]*',
                        'list_id'   => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Category\Controller\Category',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'category' => __DIR__ . '/../view',
        ),
    ),
);