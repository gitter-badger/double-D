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
                        $page = $pu->getPage();
                    }catch (\Exeption $ex){
                        $page = 'error with getting page';
                    }
                    return array(
                        'data' => $page
                    );
                    break;
                case "saveProductsList":
                    $data = $request->getPost();
                    $this->getProductsTable()->saveProductsList($data['data']);
                    return array(
                        'data' =>"true"
                    );
                    break;
                case "saveProducts":
                    $post = $request->getPost();
                    $this->getProductsTable()->saveProducts($post['data']);
                    break;
                case "getProductsList":
                    return array(
                        'data' =>json_encode($this->getProductsTable()->fetchAll())
                    );
                    break;
                case "getPage":
                    $post=$request->getPost();
                    $pl_url = "http://www.ikea.com/pl/pl/catalog/categories/departments/$post[type]/$post[id]/";
                    $ru_url = "http://www.ikea.com/ru/ru/catalog/categories/departments/$post[type]/$post[id]/";
                    $data = new \stdClass();
                    $data->id = $post['id'];
                    $data->type = $post['type'];

                    try{
                        $data->page_pl=$pu->getPage($pl_url);
                        $data->page_ru=$pu->getPage($ru_url);
                    }catch (\Exeption $ex){
                        $page_pl= "error with getting page";
                    }
                    return array(
                        'data'=> json_encode($data)
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