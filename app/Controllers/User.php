<?php
namespace App\Controllers;
use App\Models\UserModel;

class User extends BaseController
{
    public function index()
    {
        $title = 'Daftar User';
        $users = (new UserModel())->findAll();
        return view('user/index', compact('users','title'));
    }

    public function login()
    {
        helper(['form']);
        if (!$this->request->getPost('email')) return view('user/login');
        $session = session();
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        $login = (new UserModel())->where('useremail', $email)->first();
        if ($login && $password == 'admin123') {
            $session->set([
                'user_id'=>$login['id'],
                'user_name'=>$login['username'],
                'user_email'=>$login['useremail'],
                'logged_in'=>true,
            ]);
            return redirect()->to('/admin/artikel');
        }
        $session->setFlashdata('flash_msg', $login ? 'Password salah.' : 'Email tidak terdaftar.');
        return redirect()->to('/user/login');
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/user/login');
    }
}
