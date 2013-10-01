<?php
namespace Category\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Category\Model\Category;

class CategoryController extends AbstractActionController
{
    protected $CategoryTable;
    public function indexAction()
    {
        $list_type = $this->params()->fromRoute('list_type');
        $list_id = (int) $this->params()->fromRoute('list_id');
        if (!$list_type || !$list_id) {
            return $this->redirect()->toRoute('products');
        }
        return array(
            'title'=>"Test",
            'list_type'=>$list_type,
            'list_id'=>$list_id
        );
    }
    public function addAction(){
        return array(
            "test"=>"test"
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