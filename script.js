// Akıllı Filtre Algoritması
const AkilliFiltre = {
    // Yaygın harf değişimlerini normalize eder (a=4, s=5 vb.)
    normalizeEt: function(metin) {
        const karakterler = { '4': 'a', '3': 'e', '1': 'i', '0': 'o', '5': 's', '7': 't', '@': 'a', '$': 's' };
        return metin.toLowerCase()
            .replace(/[431057@$]/g, m => karakterler[m])
            .replace(/[^a-zıüçöşğ ]/g, ''); // Sadece harfleri bırakır
    },

    // Sistemin otomatik olarak yakalayacağı temel kökler
    // Not: Buraya sadece birkaç ana kök yazman yeterli, algoritma türevlerini bulur.
    yasakliKokler: ["kufur", "argo", "kotu"], 

    kontrolEt: function(hamMetin) {
        const temizMetin = this.normalizeEt(hamMetin);
        const kelimeler = temizMetin.split(/\s+/);
        
        // Kelime benzerlik kontrolü (Fuzzy Match mantığı)
        return kelimeler.some(kelime => {
            return this.yasakliKokler.some(kok => {
                // Eğer kelime yasaklı kökü içeriyorsa veya çok benziyorsa
                return kelime.includes(kok) || (kelime.length > 3 && kok.includes(kelime));
            });
        });
    },

    sansurle: function(hamMetin) {
        let metin = hamMetin;
        this.yasakliKokler.forEach(kok => {
            const regex = new RegExp(kok, "gi");
            metin = metin.replace(regex, "***");
        });
        return metin;
    }
};
