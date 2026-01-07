# Aktivite Listeleme Uygulaması

Bu proje, kullanıcıya farklı kategorilerde aktivite önerileri sunan
ve JavaScript temellerini pekiştirmeyi amaçlayan bir web uygulamasıdır.

## Kullanılan API
JSONPlaceholder Posts API

## API Endpoint
https://jsonplaceholder.typicode.com/posts

## Uygulama Nasıl Çalışır?
- Sayfa yüklendiğinde `fetch` kullanılarak API’den veri çekilir
- API’den gelen veriler `map` metodu ile işlenir
- API verilerindeki `id` bilgisi kullanılarak, uygulamaya ait özel içerikler ile birleştirme yapılır
- Her aktiviteye JavaScript ile kategori ve görsel bilgisi eklenir
- Aktivite kartları dinamik olarak DOM’a eklenir
- Seçilen kategoriye göre aktiviteler filtrelenir
- “Detayları Gör” butonuna tıklanınca aktivite detayları aynı sayfa içinde gösterilir
- Dark / Light tema desteği bulunmaktadır ve tema bilgisi `localStorage` ile saklanır
- API isteği başarısız olursa hata yönetimi yapılır ve kullanıcı bilgilendirilir

## Kullanılan JavaScript Konuları
- Fetch API
- Async / Await
- Try / Catch ile hata yönetimi
- DOM Manipülasyonu
- addEventListener
- Array metotları (map, forEach, filter)
- Fonksiyonlar (parametre alan ve değer döndüren)
- if / else yapısı
- Ternary operatör
- localStorage kullanımı

## Özellikler
- Kategoriye göre filtreleme
- Detay görüntüleme
- Karanlık / Aydınlık tema desteği
- Dinamik kart oluşturma
