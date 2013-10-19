<?php
namespace Store\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Store\Model\Store;

class StoreController extends AbstractActionController
{
//    protected $CategoryTable;
    public function indexAction()
    {
//        $list_type = $this->params()->fromRoute('type');
//        $list_id = (int) $this->params()->fromRoute('id');
//        if (!$list_type || !$list_id) {
//            return $this->redirect()->toRoute('products');
//        }
        return array(
            'title'=>"Test",
        );
    }
    public function requestsAction(){
        $list_type = $this->params()->fromRoute('type');
        $list_id = (int) $this->params()->fromRoute('id');
        $request = $this->getRequest();
        $post = json_decode($request->getContent());
        $data = array();

        switch($post->action){
            case "getProducts":
                $data = $this->getCategoryTable()->getList($list_type,$list_id);
                break;
            case "getNavigation":
                $data = $this->getCategoryTable()->getNavigation($list_type, $list_id);
                break;
            case "getShortNavigation":
                $data = $this->getCategoryTable()->getShortNavigation($list_type, $list_id);
                break;
        }

        return array(
            'data'=>json_encode($data)
        );
    }

}