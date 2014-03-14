<?php
namespace Profile\Model;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class Profile
{
    public $id;
    public $list_id;
    public $list_type;
    public $price;
    public $more_info;
    public $desp;
    public $href;
    public $img;
    public $title;
    public $active;
    protected $inputFilter;

    public function exchangeArray($data)
    {
        $this->id     = (!empty($data['id'])) ? $data['id'] : null;
        $this->list_id = (!empty($data['list_id'])) ? $data['list_id'] : null;
        $this->list_type  = (!empty($data['list_type'])) ? $data['list_type'] : null;
        $this->price  = (!empty($data['price'])) ? $data['price'] : null;
        $this->more_info  = (!empty($data['more_info'])) ? $data['more_info'] : null;
        $this->desp  = (!empty($data['desp'])) ? $data['desp'] : null;
        $this->href  = (!empty($data['href'])) ? $data['href'] : null;
        $this->img  = (!empty($data['img'])) ? $data['img'] : null;
        $this->title  = (!empty($data['title'])) ? $data['title'] : null;
        $this->active  = (!empty($data['active'])) ? $data['active'] : false;
    }

    public function getArrayCopy()
    {
        return get_object_vars($this);
    }

    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception("Not used");
    }
}