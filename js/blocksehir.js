/*
  Konum tabanlı engelleme
  - Engellenen konumlar `block-locations.json` dosyasında tutulur (aynı klasörde)
  - Ülke veya şehir bazlı engelleme yapabilirsiniz
*/
(async function blockUserByLocation() {
  try {
    const scriptUrl = (document.currentScript && document.currentScript.src)
      ? document.currentScript.src
      : new URL('blocksehir.js', window.location.href).toString();

    const blockedLocationsUrl = new URL('block-locations.json', scriptUrl).toString();

    // IP bilgisi, ülke ve şehir bilgisi almak için ipinfo.io kullanıyoruz
    const [locationRes, blockedLocationsRes] = await Promise.all([
      fetch('https://ipinfo.io/json?token=c8d8f13b5d6a0d', { cache: 'no-store' }),
      fetch(blockedLocationsUrl, { cache: 'no-store' })
    ]);

    if (!locationRes.ok) throw new Error('Konum servisinden yanıt alınamadı');
    if (!blockedLocationsRes.ok) throw new Error('block-locations.json bulunamadı veya erişilemedi');

    const locationData = await locationRes.json();
    const userCountry = locationData && locationData.country;
    const userCity = locationData && locationData.city;
    
    if (!userCountry && !userCity) return;

    const blockedLocations = await blockedLocationsRes.json();
    
    // Önce şehir kontrolü yap (daha spesifik)
    if (userCity && blockedLocations.cities && blockedLocations.cities[userCity]) {
      window.location.href = blockedLocations.cities[userCity];
      return;
    }
    
    // Sonra ülke kontrolü yap
    if (userCountry && blockedLocations.countries && blockedLocations.countries[userCountry]) {
      window.location.href = blockedLocations.countries[userCountry];
      return;
    }
  } catch (error) {
    console.error('Konum engelleme hatası:', error);
  }
})();