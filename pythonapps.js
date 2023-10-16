const apiKey = process.env.GITHUB_API_KEY;
const repoName = 'parzivalhaliday/100-python-apps'; // GitHub reposu adı
const githubContainer = document.getElementById('github-section'); // GitHub dizinlerini eklemek için bir konteyner seçin

// GitHub API'sine istek yapmak için kullanılan URL
const githubUrl = `https://api.github.com/repos/${repoName}/contents`;

// GitHub API'sine GET isteği yaparak dizinleri çekin
fetch(githubUrl, {
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
})
.then(response => response.json())
.then(data => {
    // Dizinleri içeren diziye eriştik. Her bir dizini işleyebilirsiniz.

    data.forEach(directory => {
        // Dosya adını kontrol edin, eğer "README.md" ise işlem yapmayın
        if (directory.name === "README.md") {
            return;
        }

        // Dizin adını ve HTML URL'sini alın
        const directoryName = directory.name;
        const directoryUrl = directory.html_url;

        // Dizin adını içeren bir div oluşturun
        const directoryDiv = document.createElement('div');
        
        // Dizin adını yazdırın
        const directoryNameElement = document.createElement('span');
        directoryNameElement.className = 'a';
        directoryNameElement.textContent = directoryName;
        
        // Dizin URL'sini içeren bir bağlantı oluşturun
        const directoryUrlElement = document.createElement('a');
        directoryUrlElement.className = 'a1';
        directoryUrlElement.href = directoryUrl;
        directoryUrlElement.textContent = 'URL';

        // Dizin adını ve URL'yi ekleyin
        directoryDiv.appendChild(directoryNameElement);
        directoryDiv.appendChild(document.createTextNode(' ')); // Boşluk ekleyin
        directoryDiv.appendChild(directoryUrlElement);

        // HTML sayfanızdaki belirlediğiniz konteynere ekleyin
        githubContainer.appendChild(directoryDiv);
    });
})
.catch(error => console.error(error));
