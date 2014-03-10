<?php
namespace Store\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Store\Model\Store;

class StoreController extends AbstractActionController
{
    protected $storeTable;
    public function indexAction()
    {
        return array(
            'title' => "Test",
        );
    }

    public function doAction()
    {
        $request = $this->getRequest();
        $do = $this->params()->fromRoute("method");
        $post = json_decode($request->getContent());
        $data = array();
        if ($request->isPost()) {
            switch ($do) {
                case "setUser":
                    if (
                        isset($post->email) &&
                        isset($post->fullName) &&
                        isset($post->phone) &&
                        isset($post->location)
                    ) {
                        $data = $this->getStoreTable()->saveUser($post);
                    }else{
                        $data = "false";
                    }
                    break;
            }
        };

        return array(
            'data' => json_encode($data)
        );
    }
    public function getStoreTable()
    {
        if (!$this->storeTable) {
            $sm = $this->getServiceLocator();
            $this->storeTable = $sm->get('Store\Model\StoreTable');
        }
        return $this->storeTable;
    }

}