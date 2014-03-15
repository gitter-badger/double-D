<?php
namespace Profile\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Profile\Model\Profile;

class ProfileController extends AbstractActionController
{
    public function indexAction()
    {
        return array(
            'title'=>"Test",
        );
    }
    public function loginAction(){
        return array(
            "title"=>"login"
        );
    }
    public function aboutAction(){
        return array(
            "title"=>"login"
        );
    }
}