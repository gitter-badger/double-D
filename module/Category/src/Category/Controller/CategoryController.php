<?php
namespace Category\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Category\Model\Category;

class CategoryController extends AbstractActionController
{
    protected $CategoryTable;
    public function listAction()
    {
        $list_type = $this->params()->fromRoute('type');
        $list_id = (int) $this->params()->fromRoute('id');
        if (!$list_type || !$list_id) {
            return $this->redirect()->toRoute('products');
        }
        return array(
            'title'=>"Test",
            'list_type'=>$list_type,
            'list_id'=>$list_id,
            'data' => json_encode($this->getCategoryTable()->getList($list_type,$list_id)),
        );
    }
    public function requestsAction(){
        $list_type = $this->params()->fromRoute('type');
        $list_id = (int) $this->params()->fromRoute('id');
        $request = $this->getRequest();
        $post = json_decode($request->getContent());
        switch($post->action){
            case "getProducts":
                $data = $this->getCategoryTable()->getList($list_type,$list_id);
                break;
            case "getNavigation":
                $data = $this->getCategoryTable()->getNavigation($list_type, $list_id);
                break;
        }

        return array(
            'data'=>json_encode($data)
        );
    }

    public function productAction(){
        $id = $this->params()->fromRoute('type');
        $data = $this->getCategoryTable()->getProduct($id);
        return array(
            "data"=>$data,
        );
    }

    public function getCategoryTable()
    {
        if (!$this->CategoryTable) {
            $sm = $this->getServiceLocator();
            $this->CategoryTable = $sm->get('Category\Model\CategoryTable');
        }
        return $this->CategoryTable;
    }
}