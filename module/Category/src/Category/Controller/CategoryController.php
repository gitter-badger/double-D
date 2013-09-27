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
        $list_type = (int) $this->params()->fromRoute('list_type', 0);
        $list_id = (int) $this->params()->fromRoute('list_id', 0);
        if (!$list_type) {
            return $this->redirect()->toRoute('products');
        }
        return array(
            'title'=>"Test"
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