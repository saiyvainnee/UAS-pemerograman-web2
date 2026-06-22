<?php
namespace App\Controllers;
use App\Models\ArtikelModel;

class AjaxController extends BaseController
{
    public function index()
    {
        return view('ajax/index', ['title'=>'Data Artikel AJAX']);
    }
    public function getData()
    {
        return $this->response->setJSON((new ArtikelModel())->orderBy('id','DESC')->findAll());
    }
    public function delete($id)
    {
        (new ArtikelModel())->delete($id);
        return $this->response->setJSON(['status'=>'OK']);
    }
}
