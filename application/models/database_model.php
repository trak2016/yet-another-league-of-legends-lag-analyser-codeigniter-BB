<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
class Database_model extends CI_Model {

	function __construct() {
		parent::__construct();
		$this->load->database();
	}

	function getNevestId(){

		return $id;
	}

	function getDataById($id){
		$data = $this->db->query('SELECT data FROM logs WHERE ID = '.$id);
		return $data;
	}

	function getIdAndName(){
		$data = $this->db->query('SELECT id,name FROM logs ORDER BY date DESC');
		return $data;
	}

	function setRecord($file){
		$data = array(
               'name' => $file['name'],
               'date' => $file['date'],
               'data' => $file['data']
            );
	 $this->db->insert('logs', $data);
	 return $this->db->insert_id();
	}

}
?>
