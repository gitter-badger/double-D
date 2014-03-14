<?php
namespace Store\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Sql;
use \Zend\Db\Adapter\AdapterInterface;

class StoreTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway){
        $this->tableGateway = $tableGateway;
    }

    public function saveUser($data){
        $data->type="user";
        if (!isset($data->id)) {
            $resp = $this->tableGateway->insert((array)$data);
            if($resp){
                $data->id = $this->tableGateway->lastInsertValue;
            }
        } else {
            $id = (int)$data->id;
            $user= $this->getUser($id);
            if ($user) {
                $this->tableGateway->update((array)$data, array('id' => $id));
            } else {
                throw new \Exception('Album id does not exist');
            }
        }
        unset($data->type);
        unset($data->password);
        return $data;
    }
    public function getUser($id)
    {
        $id  = (int) $id;
        $rowset = $this->tableGateway->select(array('id' => $id));
        $row = $rowset->current();
        if (!$row) {
            throw new \Exception("Could not find row $id");
        }
        return $row;
    }
}


