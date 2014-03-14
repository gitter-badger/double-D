<?php
namespace Store\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Store\Model\Store;
use Zend\Validator\NotEmpty;
use Zend\Validator\EmailAddress;

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
        $error= new \stdClass();
        if ($request->isPost()) {
            switch ($do) {
                case "setUser":
                    $emailValidator = new EmailAddress();
                    $validator = new NotEmpty();
                    if (
                        $emailValidator->isValid($post->email) &&
                        $validator->isValid($post->fullName) &&
                        $validator->isValid($post->phone) &&
                        $validator->isValid($post->location)
                    ) {
                        $data = $this->getStoreTable()->saveUser($post);
                    }else{
                        $data = new \stdClass();
                        $data->error =true;
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