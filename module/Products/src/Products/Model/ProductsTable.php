<?php
namespace Products\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Sql;
use \Zend\Db\Adapter\AdapterInterface;

class ProductsTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway){
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll()
    {
        $resultSet = $this->tableGateway->select();
        $data=array();
        foreach($resultSet as $row){
            $data[$row->header][]= $row;
        }
        return $data;
    }

    public function getProduct($id){
        $id=(int)$id;
        $select = "select * from products where id=".$id;
        $adapter = $this->tableGateway->getAdapter();
        $request = $adapter->query($select, $adapter::QUERY_MODE_EXECUTE);
        $row = $request->current();
        return $row;
    }
    public function saveProductsList($data){
        $insert ="replace into products_list(id, header, type, value,active) values";
        $id_array= array();
        foreach($data as $row){
            if(in_array($row['id'], $id_array)){
                continue;
            }else{
                $id_array[]=$row['id'];
            }
            if($row['id']!=$data[0]['id']){
                $insert.=",";
            }
            $insert.="($row[id], '$row[header]', '$row[type]', '$row[value]','1')";
        }
        $adapter = $this->tableGateway->getAdapter();
        $adapter->query($insert, $adapter::QUERY_MODE_EXECUTE);
    }
    public function saveProducts($data){
        $insert ="replace into products(id, list_id, list_type, price, more_info, desp, href,img, title, active) values";
        $id_array= array();
        foreach($data as $row){
            if(in_array($row['id'], $id_array)){
                continue;
            }else{
                $id_array[]=$row['id'];
            }
            if($row['id']!=$data[0]['id']){
                $insert.=",";
            }
            $insert.="('$row[id]', '$row[list_id]', '$row[list_type]', '$row[price]', '$row[more_info]','$row[desp]', '$row[href]', '$row[img]','$row[title]','1')";
        }
        $adapter = $this->tableGateway->getAdapter();
        echo $insert;
        $adapter->query($insert, $adapter::QUERY_MODE_EXECUTE);
    }
}


