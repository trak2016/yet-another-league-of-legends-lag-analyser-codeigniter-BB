<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

        function __construct() {
          parent::__construct();
          $this->load->library('session');
          $this->load->helper(array('url','html','form'));
        }

        public function index()
        {
          $data['title'] = 'Yet another league of legends lag analyser (Code Igniter mode)';
          $this->load->view('templates/header.tpl', $data);
          $this->load->view('templates/list.tpl');
          $this->load->view('templates/uploader.tpl');
          $this->load->view('templates/statistics.tpl', $data);
          $this->load->view('templates/footer.tpl');
        }

        function upload(){
          if (!empty($_FILES)) {
            $tempFile = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            $fileData = $_FILES['file']['data'];
            $fp = fopen($tempFile, 'r');
            $fileData = fread($fp, filesize($tempFile));
            $fileData = addslashes($fileData);
            fclose($fp);
            $this->load->model(array('database_model'));
            $today = date("Y-m-d H:i:s");
            $file['name'] =  $fileName;
            $file['date'] =  $today;
            $file['data'] =  $fileData;
            $dbId = $this->database_model->setRecord($file);
            $this->session->set_userdata("last_id",$dbId);
          }
      }

      function returnId(){
        $dbId = $this->session->userdata('last_id');
        echo json_encode(array("id" => $dbId));
      }

      function wykres($id){
        $this->load->model(array('database_model'));
        $query = $this->database_model->getDataById($id);
        $row = $query->row(0);
        $wykres_data_tmp = $row->data;
        $pattern = '([\d]{1,7}\,[X]\.[X]\.[X]\.[X]\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7}\,[\d]{1,7})';
        preg_match_all($pattern, $wykres_data_tmp, $matches, 0, 0);

         for($i = 0; $i < count($matches[0]);$i++)
         {
           $arrayString[$i] = explode(",",$matches[0][$i]);
         }

         for($i = 0; $i < count($arrayString);$i++)
         {
          //ogarnianie czasu
          $strTime = $arrayString[$i][0];
          $intMilis = intval( $strTime,10);
          $time = date("H:m:s",$intMilis);
          $arrayTime[$i] = $time;
          $arrayPing[$i] = $arrayString[$i][8];
         }
         $arrayTimePing = array('time' => $arrayTime, 'ping' => $arrayPing);
         echo json_encode($arrayTimePing);
      }

      function nazwyPlikow(){
        $this->load->model(array('database_model'));
        $query = $this->database_model->getIdAndName();

        foreach ($query->result() as $row)
        {
           $IdNameArr[] = array($row->id,$row->name);
        }
        echo json_encode($IdNameArr);
      }
}
