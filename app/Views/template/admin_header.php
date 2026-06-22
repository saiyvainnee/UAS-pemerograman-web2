<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Admin' ?></title>
    <link rel="stylesheet" href="<?= base_url('/style.css') ?>">
</head>

<body>
    <div id="container">
        <header>
            <h1>Admin Panel Artikel</h1>
        </header>

        <nav>
            <a href="<?= base_url('/Lab11Web_VueJS/#/dashboard') ?>">Dashboard</a>
            <a href="<?= base_url('/Lab11Web_VueJS/#/artikel') ?>">Kelola Artikel</a>
            <a href="<?= base_url('/Lab11Web_VueJS/#/about') ?>">About</a>
            <a href="<?= base_url('/user/logout') ?>">Logout</a>
        </nav>

        <section id="main" style="width:100%">