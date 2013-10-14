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
            $row->price*=2.64*1.3;
            $row->price=intval($row->price);
            $data[]=$row;
        }

        return $data;
    }
}
