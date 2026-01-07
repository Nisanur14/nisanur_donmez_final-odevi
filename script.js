
// Her veriye kendi resmini tek tek atıyoruz ki tekrar etmesin.
const kendiVerilerim = [
  { id: 1, title: "Doğa Yürüyüşü", body: "Temiz hava eşliğinde harika bir sabah yürüyüşü.", kategori: "doga", gorsel: "doga 1.jpeg" },
  { id: 2, title: "Tiyatro", body: "Yerel tiyatro topluluklarının sahnelediği oyunlara katılmak..", kategori: "sanat", gorsel: "sanat 1.jpeg" },
  { id: 3, title: "Açık Hava Sineması", body: "Yerli ve yabancı filmler yıldızların altında izleyicilerle buluşuyor, aileler ve gençler keyifli bir akşam geçiriyor.", kategori: "eglence", gorsel: "eglence 1.jpeg" },
  { id: 4, title: "Kamp", body: "Göl kenarında huzurlu bir kamp deneyimi .", kategori: "doga", gorsel: "doga 2.jpeg" },
  { id: 5, title: "Sergi Gezisi", body: " Resim, heykel veya fotoğraf sergilerini ziyaret etmek.", kategori: "sanat", gorsel: "sanat 2.jpeg" },
  { id: 6, title: "Bowling Turnuvası", body: "Takımınızı kurun ve büyük ödüllü turnuvaya katılmak.", kategori: "eglence", gorsel: "eglence 2.jpeg" },
  { id: 7, title: "Piknik", body: "Hep birlikte doğanın tadını çıkaracağımız keyifli bir etkinlik.", kategori: "doga", gorsel: "doga 3.jpeg" },
  { id: 8, title: "Konser Etkinliği", body: "Açık hava sahnesinde en sevdiğiniz sanatçıyı dinlemek.", kategori: "eglence", gorsel: "eglence 3.jpeg" },
  { id: 9, title: "Seramik Workshop", body: "Çömlek, seramik tabak, kupa ve mum yapımı gibi uygulamalı etkinliktir.", kategori: "sanat", gorsel: "sanat 3.jpeg" },
  { id: 10, title: "Tatlı Workshop", body: "Tatlı severler için harika bir buluşma! Kendi tatlılarımızı yapacağız.", kategori: "yemek", gorsel: "yemek 1.jpg" },
  { id: 11, title: "Street Food Turu", body: "Şehrin en lezzetli sokak tatlarını deneyeceğimiz bir tur. ", kategori: "yemek", gorsel: "yemek 2.jpeg" },
  { id: 12, title: "Yemek Yarışması", body: "Katılımcılar kendi tariflerini hazırlayacak ve günün yemeği seçilecek.", kategori: "yemek", gorsel: "yemek 3.jpeg" },
];

// 2. ELEMENT SEÇİCİLER
const kartListesi = document.getElementById("kartListesi");
const durum = document.getElementById("durum");
const detayIcerik = document.getElementById("detayIcerik");
const listeleBtn = document.getElementById("listeleBtn");
const kategoriSelect = document.getElementById("kategoriSelect");
const temaBtn = document.getElementById("temaBtn");

let veriler = []; 

// 3. API'den veri çekme 
async function verileriGetir() {
  try {
    durum.innerHTML = "<b>Aktiviteler hazırlanıyor...</b>";
    
    // API 
    const yanit = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
    if (!yanit.ok) throw new Error("Veri çekilemedi!");
    const apiVerileri = await yanit.json();

    // API'den ID alıyoruz, içerikleri kendi listemizden alıyoruz
    veriler = apiVerileri.map((apiItem, index) => {
      const benimVerim = kendiVerilerim[index]; 
      
      return {
        id: apiItem.id,            
        title: benimVerim.title,   
        body: benimVerim.body,     
        kategori: benimVerim.kategori,
        gorsel: benimVerim.gorsel // Burada her biri için farklı resim yolu gelecek
      };
    });

    kartlariGoster(veriler);
    durum.textContent = "";
  } catch (error) {
    durum.innerHTML = `<b style="color:red">Hata: ${error.message}</b>`;
    kartlariGoster(kendiVerilerim); 
  }
}


function kategoriYazi(kat) {
  const isimler = { doga: "Doğa", eglence: "Eğlence", sanat: "Sanat", yemek: "Yemek" };
  return isimler[kat] || kat;
}

function kartlariGoster(liste) {
  kartListesi.innerHTML = "";
  if (liste.length === 0) {
    durum.textContent = "Sonuç bulunamadı.";
    return;
  }

  liste.forEach(item => {
    const kart = document.createElement("div");
    kart.className = "kart";
    kart.innerHTML = `
      <img src="${item.gorsel}" alt="${item.title}">
      <div class="kart-bilgi">
        <span class="kategori-etiket">${kategoriYazi(item.kategori)}</span>
        <h3>${item.title}</h3>
        <button class="detayBtn">Detayları Gör</button>
      </div>
    `;
    
    kart.querySelector(".detayBtn").addEventListener("click", () => detayGoster(item));
    kartListesi.appendChild(kart);
  });
}

function detayGoster(item) {
  detayIcerik.innerHTML = `
    <div class="detay-kart">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      <hr>
      <small>Kategori: ${kategoriYazi(item.kategori)}</small>
    </div>
  `;
  detayIcerik.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function filtrele() {
  const secilen = kategoriSelect.value.toLowerCase();
  const sonuc = secilen ? veriler.filter(item => item.kategori === secilen) : veriler;
  kartlariGoster(sonuc);
}

function temaYukle() {
  const kayitliTema = localStorage.getItem("tema");
  if (kayitliTema === "dark") {
    document.body.classList.add("dark");
    temaBtn.textContent = "Aydınlık Mod";
  }
}

function temaDegistir() {
  document.body.classList.toggle("dark");
  const mod = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("tema", mod);
  temaBtn.textContent = (mod === "dark") ? "Aydınlık Mod" : "Karanlık Mod";
}


listeleBtn.addEventListener("click", filtrele);
temaBtn.addEventListener("click", temaDegistir);

// sistemi başlatma
temaYukle();
verileriGetir();