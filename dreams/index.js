document.addEventListener('DOMContentLoaded', function () {
    const fileListElement = document.getElementById('fileList');

    // Text dosyalarının bulunduğu klasörün yolu
    const textFolder = 'text/';

    // Dosyaları listele
    fetchTextFiles(textFolder)
        .then(files => {
            files.forEach(file => {
                // Dosyayı listeye ekle
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                
                // İlgili dosyanın resmini göster
                const image = document.createElement('img');
                image.src = 'file.png'; // file.png dosyanızın yolunu güncelleyin
                image.alt = 'Dosya Resmi';

                listItem.appendChild(image);
                fileListElement.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Dosya listeleme hatası:', error);
        });
});

// Text dosyalarını getir
async function fetchTextFiles(folder) {
    const response = await fetch(folder);
    const data = await response.text();

    // Dosya isimlerini ayır
    const fileNames = data.split('\n').filter(fileName => fileName.trim() !== '');

    // Dosya objelerini oluştur
    const files = fileNames.map(fileName => ({
        name: fileName,
        path: folder + fileName,
    }));

    return files;
}
