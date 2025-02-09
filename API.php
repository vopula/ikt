<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';

    if (empty($name) || empty($email)) {
        echo "Nama dan email wajib diisi.";
        exit;
    }

    $content = "Nama: $name\nEmail: $email\nDeskripsi: $description\n\n";

    $folderLink = "https://drive.google.com/drive/folders/1UTNhCo-T6c1FzVtniLtMEd3vKBYoDBvB?usp=drive_link";
    $fileName = "data_" . time() . ".txt";

    $localPath = __DIR__ . "/uploads/" . $fileName;
    if (!is_dir(__DIR__ . "/uploads")) {
        mkdir(__DIR__ . "/uploads", 0777, true);
    }

    if (file_put_contents($localPath, $content)) {
        echo "File berhasil disimpan ke server lokal: $localPath\n";
        echo "Silakan unggah file secara manual ke folder Google Drive berikut: $folderLink";
    } else {
        echo "Gagal menyimpan file ke server lokal.";
    }
} else {
    echo "Invalid request method.";
}

?>