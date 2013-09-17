<?php
namespace Products\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Products\Model\ProductsUpdate;

class ProductsController extends AbstractActionController
{

    public function indexAction()
    {
        return array(
            "title"=>"Update Products",
        );
    }
    public function requestsAction(){
        return array(
            "page"=>"true"
        );
    }
    public function updateAction(){
        $request = $this->getRequest();
        if($request->isPost()){
            var_dump($request);
        }

    }
}