<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ArtikelModel;

class Post extends ResourceController
{
    use ResponseTrait;

    private function cors()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    public function index()
    {
        $this->cors();

        $model = new ArtikelModel();

        return $this->respond([
            'artikel' => $model->orderBy('id', 'DESC')->findAll()
        ]);
    }

    public function create()
    {
        $this->cors();

        $model = new ArtikelModel();

        $judul = $this->request->getVar('judul');
        $isi = $this->request->getVar('isi');
        $status = $this->request->getVar('status') ?? 0;
        $idKategori = $this->request->getVar('id_kategori') ?? 1;

        if (!$judul) {
            return $this->failValidationErrors('Judul wajib diisi.');
        }

        $model->insert([
            'judul'       => $judul,
            'isi'         => $isi,
            'status'      => $status,
            'slug'        => url_title($judul, '-', true),
            'gambar'      => 'default.png',
            'id_kategori' => $idKategori,
        ]);

        return $this->respondCreated([
            'status' => 201,
            'messages' => [
                'success' => 'Data artikel berhasil ditambahkan.'
            ]
        ]);
    }

    public function show($id = null)
    {
        $this->cors();

        $model = new ArtikelModel();
        $data = $model->find($id);

        if ($data) {
            return $this->respond($data);
        }

        return $this->failNotFound('Data tidak ditemukan.');
    }

    public function update($id = null)
    {
        $this->cors();

        $model = new ArtikelModel();

        $judul = $this->request->getVar('judul');
        $isi = $this->request->getVar('isi');
        $status = $this->request->getVar('status') ?? 0;

        if (!$judul) {
            return $this->failValidationErrors('Judul wajib diisi.');
        }

        $model->update($id, [
            'judul'  => $judul,
            'isi'    => $isi,
            'status' => $status,
            'slug'   => url_title($judul, '-', true),
        ]);

        return $this->respond([
            'status' => 200,
            'messages' => [
                'success' => 'Data artikel berhasil diubah.'
            ]
        ]);
    }

    public function delete($id = null)
    {
        $this->cors();

        $model = new ArtikelModel();

        if ($model->find($id)) {
            $model->delete($id);

            return $this->respondDeleted([
                'status' => 200,
                'messages' => [
                    'success' => 'Data artikel berhasil dihapus.'
                ]
            ]);
        }

        return $this->failNotFound('Data tidak ditemukan.');
    }
}