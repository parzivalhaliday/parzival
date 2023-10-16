        // to animate the title
        const colorArray = ["#f8f8f2", "#a8a8a2", "#ae81ff", "#a6e22e", "#f92672", "#66d9ef", "#f8f8f2", "#e6db74", "#75715e"];
        const randomcolor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        const randomcolor2 = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
        function AnimateTitle() {
            let title = document.getElementById("head");
            let testElement = document.getElementById("renk");
    
            let text = title.innerText;
            let newText = "";
            const errorColor = randomcolor();
    
            for (char = 0; char < text.length; char++) {
                let letter = text[char];
                if (letter === "#" || letter === 'p') { // Değişiklik burada: 'p' harfini kontrol ediyoruz
                    newText += letter.fontcolor(randomcolor());
                } else {
                    newText += letter.fontcolor(errorColor);
                }
            }
            title.innerHTML = newText;
            
            // renk  üzerinde de aynı işlemi yapabilirsiniz
            let testText = testElement.innerText;
            let newTestText = "";
    
            for (char = 0; char < testText.length; char++) {
                let letter = testText[char];
                if (letter === "#" || letter === '$') { // Değişiklik burada: 'p' harfini kontrol ediyoruz
                    newTestText += letter.fontcolor(randomcolor());
                } else {
                    newTestText += letter.fontcolor(errorColor);
                }
            }
            testElement.innerHTML = newTestText;
        }
    
        function ColorifyBaslik() {
            let basliklar = document.getElementsByClassName("baslik");
            for (i = 0; i < basliklar.length; i++) {
                let baslik = basliklar[i].innerText;
                let newBaslik = "";
    
                for (j = 0; j < baslik.length; j++) {
                    let harf = baslik[j];
                    newBaslik += harf.fontcolor(randomcolor2(colorArray));
                }
                basliklar[i].innerHTML = newBaslik;
            }
        }
    
        function ColorifyBorder() {
            let sections = document.getElementsByClassName("section");
            for (i = 0; i < sections.length; i++) {
                sections[i].style.borderColor = randomcolor2(colorArray);
            }
        }
    
        setInterval(ColorifyBaslik, 400);
        setInterval(AnimateTitle, 150);
        ColorifyBorder();