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
        $request = $this->getRequest();
        $do = $this->params()->fromRoute("do");
        if($request->isPost()&& isset($do)){
            $pu = new ProductsUpdate();
            switch($do){
                case "getProductsPage":
                    try{
                        $page = $pu->getProducts();
                    }catch (\Exeption $ex){
                        $page = 'error with getting page';
                    }
                    return array(
                        'data' => $page
                    );
                    break;
                case "saveProducts":
                    $data = $request->getPost();
                    var_dump($data);
                    return array(
                        'data' =>"true"
                    );
                    break;
            }

        }else{
            return array(
                'data' => "false"
            );
        }
    }
    public function updateAction(){



    }
}