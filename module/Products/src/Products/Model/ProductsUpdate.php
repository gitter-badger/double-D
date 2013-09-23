<?php
namespace Products\Model;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class ProductsUpdate
{
    protected $url = "http://www.ikea.com/ru/ru/catalog/allproducts/";
//    protected $url = "http://www.ikea.com/ru/catalog/allproducts/alphabetical/";

    public function getProducts(){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: www.ikea.com'));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, '20');
        $response = trim(curl_exec($ch));
        curl_close($ch);
        return $response;
    }

}