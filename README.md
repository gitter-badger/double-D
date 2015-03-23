
Installation
------------

[![Join the chat at https://gitter.im/gfspock/double-D](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gfspock/double-D?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

1. BackEnd:

Using Composer
Clone the repository and manually invoke `composer` using the shipped
`composer.phar`:

    cd my/project/dir
    php composer.phar self-update
    php composer.phar install

(The `self-update` directive is to ensure you have an up-to-date `composer.phar`
available.)

2. FrontEnd:
В корені запускаємо(краще зайти через Git Bash):
 
    `npm install` <br/>
    `bower install`
  

Запускаємо проект:
-------------------
1. run zend server 

    `cd app` <br/>
    `php -S 0.0.0.0:8080 index.php`

This will start the cli-server on port 8080, and bind it to all network
interfaces.

2. Білдимо фронтенд

  `grunt serve`
  




