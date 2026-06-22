<?php
namespace App\Controllers;

use App\Models\ArtikelModel;
use App\Models\KategoriModel;
use CodeIgniter\Exceptions\PageNotFoundException;

class Artikel extends BaseController
{
    public function index()
    {
        $title = 'Daftar Artikel';
        $model = new ArtikelModel();
        $artikel = $model->getArtikelDenganKategori();
        return view('artikel/index', compact('artikel', 'title'));
    }

    public function view($slug)
    {
        $model = new ArtikelModel();
        $artikel = $model->where('slug', $slug)->first();
        if (!$artikel) throw PageNotFoundException::forPageNotFound('Artikel tidak ditemukan.');
        $kategoriModel = new KategoriModel();
        $kategori = $kategoriModel->find($artikel['id_kategori']);
        $title = $artikel['judul'];
        return view('artikel/detail', compact('artikel', 'kategori', 'title'));
    }

    public function admin_index()
    {
        $title = 'Daftar Artikel (Admin)';
        $model = new ArtikelModel();
        $kategoriModel = new KategoriModel();
        $q = $this->request->getVar('q') ?? '';
        $kategori_id = $this->request->getVar('kategori_id') ?? '';
        $page = (int)($this->request->getVar('page') ?? 1);

        $builder = $model->select('artikel.*, kategori.nama_kategori')
            ->join('kategori', 'kategori.id_kategori = artikel.id_kategori', 'left')
            ->orderBy('artikel.id', 'DESC');

        if ($q !== '') $builder->like('artikel.judul', $q);
        if ($kategori_id !== '') $builder->where('artikel.id_kategori', $kategori_id);

        $data = [
            'title' => $title,
            'q' => $q,
            'kategori_id' => $kategori_id,
            'artikel' => $builder->paginate(10, 'default', $page),
            'pager' => $model->pager,
            'kategori' => $kategoriModel->findAll(),
        ];

        if ($this->request->isAJAX()) {
            return $this->response->setJSON($data);
        }
        return view('artikel/admin_index', $data);
    }

    public function add()
    {
        helper(['form']);
        $kategoriModel = new KategoriModel();
        if ($this->request->getMethod() === 'POST' && $this->validate([
            'judul' => 'required',
            'id_kategori' => 'required|integer',
            'gambar' => 'permit_empty|is_image[gambar]|max_size[gambar,2048]'
        ])) {
            $file = $this->request->getFile('gambar');
            $namaGambar = 'default.png';
            if ($file && $file->isValid() && !$file->hasMoved()) {
                $namaGambar = $file->getRandomName();
                $file->move(FCPATH . 'gambar', $namaGambar);
            }
            $model = new ArtikelModel();
            $judul = $this->request->getPost('judul');
            $model->insert([
                'judul' => $judul,
                'isi' => $this->request->getPost('isi'),
                'status' => $this->request->getPost('status') ?? 0,
                'slug' => url_title($judul, '-', true),
                'gambar' => $namaGambar,
                'id_kategori' => $this->request->getPost('id_kategori'),
            ]);
            return redirect()->to('/admin/artikel');
        }
        return view('artikel/form_add', ['title'=>'Tambah Artikel', 'kategori'=>$kategoriModel->findAll()]);
    }

    public function edit($id)
    {
        helper(['form']);
        $model = new ArtikelModel();
        $kategoriModel = new KategoriModel();
        $artikel = $model->find($id);
        if (!$artikel) throw PageNotFoundException::forPageNotFound('Artikel tidak ditemukan.');
        if ($this->request->getMethod() === 'POST' && $this->validate([
            'judul' => 'required',
            'id_kategori' => 'required|integer',
            'gambar' => 'permit_empty|is_image[gambar]|max_size[gambar,2048]'
        ])) {
            $namaGambar = $artikel['gambar'];
            $file = $this->request->getFile('gambar');
            if ($file && $file->isValid() && !$file->hasMoved()) {
                $namaGambar = $file->getRandomName();
                $file->move(FCPATH . 'gambar', $namaGambar);
            }
            $judul = $this->request->getPost('judul');
            $model->update($id, [
                'judul' => $judul,
                'isi' => $this->request->getPost('isi'),
                'status' => $this->request->getPost('status') ?? 0,
                'slug' => url_title($judul, '-', true),
                'gambar' => $namaGambar,
                'id_kategori' => $this->request->getPost('id_kategori'),
            ]);
            return redirect()->to('/admin/artikel');
        }
        return view('artikel/form_edit', ['title'=>'Edit Artikel', 'artikel'=>$artikel, 'kategori'=>$kategoriModel->findAll()]);
    }

    public function delete($id)
    {
        (new ArtikelModel())->delete($id);
        return redirect()->to('/admin/artikel');
    }
}
