<?php
namespace Products\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Products\Model\Products;
use Products\Model\ProductsUpdate;

class ProductsController extends AbstractActionController
{
    protected $productsTable;

    public function indexAction()
    {
        return array(
            'title' => "Products page",
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
                    $this->getProductsTable()->saveProducts($data['data']);
                    return array(
                        'data' =>"true"
                    );
                    break;
                case "getProductsList":
                    $data = $request->getPost();
                    return array(
                        'data' =>json_encode($this->getProductsTable()->fetchAll())
                    );
                    break;
            }
        }else{
            return $this->redirect()->toRoute("products");
        }
    }
    public function updateAction(){

    }
    public function getProductsTable()
    {
        if (!$this->productsTable) {
            $sm = $this->getServiceLocator();
            $this->productsTable = $sm->get('Products\Model\ProductsTable');
        }
        return $this->productsTable;
    }

}