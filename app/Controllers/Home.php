<?php
namespace App\Controllers;
class Home extends BaseController
{
    public function index()
    {
        return view('home', ['title'=>'Home', 'content'=>'Selamat datang di aplikasi Lab11Web CodeIgniter 4.']);
    }
}
