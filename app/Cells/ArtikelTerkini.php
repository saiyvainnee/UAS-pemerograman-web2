<?php

namespace App\Cells;

use CodeIgniter\View\Cell;
use App\Models\ArtikelModel;

class ArtikelTerkini extends Cell
{
    public function render(string $library, $params = null, int $ttl = 0, ?string $cacheName = null): string
    {
        $artikel = (new ArtikelModel())->orderBy('id', 'DESC')->limit(5)->findAll();

        return view('components/artikel_terkini', ['artikel' => $artikel]);
    }
}