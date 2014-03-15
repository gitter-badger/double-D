<?php
namespace Store\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Sql;
use \Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSet;

class StoreTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway){
        $this->tableGateway = $tableGateway;
        $adapter =$this->tableGateway->getAdapter();
        $this->cartListGateway=new TableGateway('cart_list', $adapter, null, new ResultSet());
    }

    public function saveCart($data){
        $resp = $this->tableGateway->insert((array)$data);
        if($resp){
            $resp = $this->tableGateway->lastInsertValue;
        }
        return $resp;
    }
    public function setCartList($data){
        $resp = array();
        for($i =0; $i< count($data->data); $i++){
            $array= array(
                'cartId' => $data->cartId,
                'price' => $data->data[$i]->item->price,
                'productId' => $data->data[$i]->item->id,
                'number' => $data->data[$i]->number,
            );
            $resp[]=array(
                'id'=>$data->data[$i]->item->id,
                'status'=>$this->insertCart($array)
            );
        }
        return $resp;
    }

    public function insertCart($data){
        return $this->cartListGateway->insert($data);
    }

}


