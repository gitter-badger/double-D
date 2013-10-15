<?php
namespace Category\Model;

use Zend\Db\TableGateway\TableGateway;

class CategoryTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function getList($list_type,$list_id)
    {
        $resultSet = $this->tableGateway->select(array('list_type'=>$list_type,'list_id'=>$list_id));
        $data = array();
        foreach ($resultSet as $row) {
            $row->price=$this->calculatePrice($row->price);
            $data[]=$row;
        }

        return $data;
    }
    public function getProduct($id){
        $result = $this->tableGateway->select(array('id'=>$id));
        foreach($result as $row){
            $rw= $row;
            $rw->price = $this->calculatePrice($rw->price);
        }
        return $rw;
    }
    public function calculatePrice($price){
        $price*=2.64*1.3;
        return ceil($price);
    }
}
