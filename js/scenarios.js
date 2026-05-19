const scenarioPool = [
  {
    title: 'Alay İçeren Paylaşım',
    category: 'Paylaşım ve saygı',
    icon: 'P',
    tip: 'Bir içeriği yaymak, o davranışa ortak olmak anlamına gelebilir.',
    text: 'Bir arkadaşınla dalga geçilen kısa bir video sınıf grubunda paylaşılıyor.',
    postTitle: 'Grup paylaşımı',
    postText: 'Bir öğrencinin izinsiz çekilmiş görüntüsü komik açıklamalarla paylaşılmış.',
    choices: [
      {
        text: 'Videoyu başkalarına da gönderirim.',
        effect: { respect: -18, responsibility: -12, kindness: -16 },
        title: 'Zarar büyüdü',
        what: 'İzinsiz ve küçük düşürücü içerik daha fazla kişiye ulaştı.',
        better: 'Videoyu yaymamak ve grupta kırıcı paylaşımı durdurmak daha doğru olurdu.',
        notice: 'Dijital ortamda da yüz yüze hayattaki saygı ölçüleri geçerlidir.'
      },
      {
        text: 'Sessiz kalırım, karışmam.',
        effect: { respect: -6, responsibility: -10, kindness: -5 },
        title: 'Pasif kalındı',
        what: 'İçeriği yaymadın ama olumsuz davranışa açık bir sınır da koymadın.',
        better: 'En azından paylaşımı yaymamak ve güvenli bir dille grubu uyarmak gerekir.',
        notice: 'Bazen sessizlik, yanlış davranışın normal görünmesine yol açabilir.'
      },
      {
        text: 'Paylaşmam, grubu uyarırım.',
        effect: { respect: 15, responsibility: 14, kindness: 15 },
        title: 'Değeri korudun',
        what: 'Kişinin mahremiyetini ve saygınlığını koruyan bir tercih yaptın.',
        better: 'Bu davranışı sürdürmek ve gerekirse ilgili kişiden paylaşımı kaldırmasını istemek iyi bir adımdır.',
        notice: 'Saygı, dijital dünyada da temel bir değerdir.'
      },
      {
        text: 'Videoyu yaymam ama grupta da konuşmam.',
        effect: { respect: 5, responsibility: -3, kindness: 2 },
        title: 'Zarar azaldı ama sınır konmadı',
        what: 'İçeriği büyütmedin fakat kırıcı davranışın durması için açık bir adım atmadın.',
        better: 'Yaymamak iyi bir başlangıçtır; güvenli bir dille uyarı yapmak davranışı tamamlar.',
        notice: 'Dijital saygı bazen sadece durmak değil, zararı durdurmaya çalışmaktır.'
      }
    ]
  },
  {
    title: 'Kaynağı Belirsiz Dini İçerik',
    category: 'Doğruluk ve kaynak',
    icon: 'K',
    tip: 'Dini ve ahlaki konularda hızlı paylaşım yerine kaynak kontrolü önemlidir.',
    text: 'Sosyal medyada doğruluğu belli olmayan dini bir bilgi karşına çıkıyor.',
    postTitle: 'Viral içerik',
    postText: 'Paylaşımda kaynak yok; sadece dikkat çekici ve kesin ifadeler kullanılmış.',
    choices: [
      {
        text: 'Hemen paylaşırım, faydalı olabilir.',
        effect: { truth: -18, responsibility: -10 },
        title: 'Doğruluk zayıfladı',
        what: 'Kaynağı belirsiz bilgi iyi niyetle bile yanlış bilginin yayılmasına neden olabilir.',
        better: 'Paylaşmadan önce güvenilir kaynaklara bakmak ve emin değilsen paylaşmamak gerekir.',
        notice: 'Dini konularda kaynak kontrolü daha fazla sorumluluk gerektirir.'
      },
      {
        text: 'Kaynağını araştırırım.',
        effect: { truth: 18, responsibility: 14 },
        title: 'Bilinçli seçim',
        what: 'Bilgiyi sorguladın ve hızlı etkileşim yerine doğruluğu önceledin.',
        better: 'Doğrulanmış bilgiye ulaşırsan kaynağıyla birlikte paylaşabilirsin.',
        notice: 'Paylaşmadan önce doğrulamak dijital ahlakın parçasıdır.'
      },
      {
        text: 'Yorumlarda sert tartışmaya girerim.',
        effect: { respect: -10, kindness: -14, truth: -4 },
        title: 'Üslup bozuldu',
        what: 'Doğruyu savunma çabası kırıcı bir dile dönüşebilir.',
        better: 'Kaynak sorup sakin bir açıklama yapmak tartışmayı daha faydalı hale getirir.',
        notice: 'Saygılı üslup, değerleri korumanın bir yoludur.'
      },
      {
        text: 'Paylaşımı kaydeder, sonra kaynağına bakarım.',
        effect: { truth: 10, responsibility: 8 },
        title: 'Hız yerine kontrol seçildi',
        what: 'İçeriği hemen yaymadan önce doğrulama için zaman ayırdın.',
        better: 'Kaynağı güvenilir değilse paylaşmamak en doğru tamamlayıcı adımdır.',
        notice: 'Doğrulama bazen paylaşımı ertelemekle başlar.'
      }
    ]
  },
  {
    title: 'Hakaretli Yorumlar',
    category: 'Yorum ve üslup',
    icon: 'Y',
    tip: 'Yorumlarda verilen tepki, mesajın içeriği kadar değer taşır.',
    text: 'Bir gönderinin altında inançlara ve kişisel değerlere yönelik küçümseyici yorumlar görüyorsun.',
    postTitle: 'Yorumlar bölümü',
    postText: 'Bazı kullanıcılar farklı düşünen kişilere hakaret ediyor.',
    choices: [
      {
        text: 'Ben de aynı sertlikle cevap veririm.',
        effect: { respect: -14, kindness: -16 },
        title: 'Gerilim arttı',
        what: 'Hakarete hakaretle karşılık vermek ortamı daha kırıcı hale getirdi.',
        better: 'Sakin, kısa ve saygılı bir cevap vermek ya da tartışmayı büyütmemek daha sağlıklıdır.',
        notice: 'Dijital nezaket, anlaşmazlık anında da korunmalıdır.'
      },
      {
        text: 'Saygılı bir dille karşı görüşümü yazarım.',
        effect: { respect: 14, kindness: 12, truth: 6 },
        title: 'Olgun tutum',
        what: 'Farklı fikre karşı değerleri koruyan bir dil kullandın.',
        better: 'Bu tutumu sürdürüp tartışmayı kişilere değil fikirlere odaklamak gerekir.',
        notice: 'Üslup, mesajın kendisi kadar etkilidir.'
      },
      {
        text: 'Hakaretleri beğenirim.',
        effect: { respect: -16, kindness: -14, responsibility: -8 },
        title: 'Olumsuzluk desteklendi',
        what: 'Beğeni vermek kırıcı dili daha görünür hale getirdi.',
        better: 'Kırıcı yorumları desteklememek ve gerekiyorsa bildirmek daha sorumlu bir tercihtir.',
        notice: 'Etkileşim vermek, içeriği yaymanın bir parçası olabilir.'
      },
      {
        text: 'Tartışmaya girmem ama hakaretleri bildiririm.',
        effect: { respect: 8, kindness: 8, responsibility: 10 },
        title: 'Sessiz ama sorumlu adım',
        what: 'Kavgayı büyütmeden kırıcı yorumların görünürlüğünü azaltmaya çalıştın.',
        better: 'Gerekirse kısa ve saygılı bir açıklama eklemek de faydalı olabilir.',
        notice: 'Bazen en etkili müdahale tartışmayı büyütmeden sınır koymaktır.'
      }
    ]
  },
  {
    title: 'Mahremiyet ve Gösteriş',
    category: 'Mahremiyet',
    icon: 'M',
    tip: 'Bir görüntüye erişebilmek, onu saklama ya da yayma hakkı vermez.',
    text: 'Bir arkadaşının özel hayatına ait bir görüntü izinsiz olarak paylaşılmış.',
    postTitle: 'Hikaye paylaşımı',
    postText: 'Görüntü ilgi çekiyor ancak kişinin izni olup olmadığı belli değil.',
    choices: [
      {
        text: 'Ekran görüntüsü alıp saklarım.',
        effect: { respect: -12, responsibility: -12, kindness: -8 },
        title: 'Mahremiyet ihlali',
        what: 'İzinsiz görüntüyü saklamak kişinin özel alanına zarar verdi.',
        better: 'Görüntüyü saklamamak ve paylaşımı büyütmeden ilgili kişiyi uyarmak gerekir.',
        notice: 'Mahremiyet, dijital çağda korunması gereken temel değerlerden biridir.'
      },
      {
        text: 'Paylaşımı yaymadan kişiyi uyarırım.',
        effect: { respect: 14, responsibility: 16, kindness: 10 },
        title: 'Sorumlu davranış',
        what: 'Paylaşımı büyütmeden mahremiyeti koruyan bir yol seçtin.',
        better: 'Gerekirse paylaşımı yapan kişiden içeriği kaldırmasını istemek de iyi bir adımdır.',
        notice: 'Her içeriğe erişebilmek, onu paylaşma hakkı vermez.'
      },
      {
        text: 'Herkes görmüş zaten, ben de paylaşırım.',
        effect: { respect: -18, responsibility: -16, kindness: -12 },
        title: 'Zarar çoğaldı',
        what: 'Yanlış davranış kalabalıkla birlikte daha da büyüdü.',
        better: 'Bir yanlış yaygın olsa bile onu tekrar etmemek gerekir.',
        notice: 'Dijital kalabalığa uymak yerine değer temelli karar vermek gerekir.'
      },
      {
        text: 'Paylaşmadan önce yakın bir arkadaşıma sorarım.',
        effect: { respect: -4, responsibility: -5 },
        title: 'Karar ertelendi ama risk sürdü',
        what: 'İçeriği hemen yaymadın fakat izinsiz görüntüyü başkasıyla değerlendirmeye açtın.',
        better: 'Mahrem içerikte en güvenli adım, paylaşmadan doğrudan ilgili kişiyi uyarmaktır.',
        notice: 'İzin sorunu olan içerikler üçüncü kişilerle de dolaştırılmamalıdır.'
      }
    ]
  },
  {
    title: 'Kıyaslama Baskısı',
    category: 'Dijital denge',
    icon: 'A',
    tip: 'Sosyal medya çoğu zaman hayatın düzenlenmiş ve seçilmiş kısmını gösterir.',
    text: 'Sosyal medyada herkesin hayatı kusursuz görünmektedir. Kendini yetersiz hissetmeye başlıyorsun.',
    postTitle: 'Akış ekranı',
    postText: 'Sürekli başarı, lüks ve kusursuz yaşam görüntüleri karşına çıkıyor.',
    choices: [
      {
        text: 'Kendimi sürekli başkalarıyla kıyaslarım.',
        effect: { responsibility: -8, kindness: -6 },
        title: 'Algı baskısı',
        what: 'Akıştaki seçilmiş görüntüler kendi değerini ölçme biçimini etkiledi.',
        better: 'Sosyal medya içeriklerinin gerçeğin tamamı olmadığını hatırlamak gerekir.',
        notice: 'Kendi değerini beğeni ve gösteriş üzerinden ölçmek sağlıklı değildir.'
      },
      {
        text: 'Kullanım süreme sınır koyarım.',
        effect: { responsibility: 16, kindness: 6 },
        title: 'Kontrol sende',
        what: 'Sosyal medya etkisini azaltmak için somut bir sınır koydun.',
        better: 'Bu sınırı günlük planına bağlamak ve bildirimleri azaltmak faydalı olur.',
        notice: 'Bilinçli kullanım, değerleri korumanın pratik yollarından biridir.'
      },
      {
        text: 'Daha fazla ilgi görmek için abartılı paylaşımlar yaparım.',
        effect: { truth: -10, responsibility: -8 },
        title: 'Gerçeklik zedelendi',
        what: 'Onay arayışı gerçeği olduğundan farklı göstermeye yöneltti.',
        better: 'Kendini görünürlükle değil gerçek davranışlarınla değerlendirmek daha sağlıklıdır.',
        notice: 'Dijital görünürlük, kişiliğin ölçüsü değildir.'
      },
      {
        text: 'Bir süre ara verip güvendiğim biriyle konuşurum.',
        effect: { responsibility: 12, kindness: 10 },
        title: 'Duygu fark edildi',
        what: 'Akışın seni nasıl etkilediğini fark edip kendini koruyacak bir ara verdin.',
        better: 'Bu arayı kullanım sınırıyla desteklemek daha kalıcı bir denge sağlar.',
        notice: 'Dijital denge, duygularının nasıl etkilendiğini fark etmekle başlar.'
      }
    ]
  },
  {
    title: 'Dijital Zaman Yönetimi',
    category: 'Zaman yönetimi',
    icon: 'Z',
    tip: 'Teknolojiyi amaç değil araç olarak kullanmak dijital dengenin temelidir.',
    text: 'Ders, aile ve ibadet/kişisel gelişim zamanın sosyal medya nedeniyle aksıyor.',
    postTitle: 'Bildirimler',
    postText: 'Arka arkaya gelen bildirimler planladığın işleri geciktiriyor.',
    choices: [
      {
        text: 'Bildirimleri kapatıp belirli saatlerde kullanırım.',
        effect: { responsibility: 18, truth: 4, kindness: 4 },
        title: 'Denge kuruldu',
        what: 'Teknolojiyi kontrol eden ve zamanını koruyan bir karar verdin.',
        better: 'Belirlediğin saatlere uymak ve ekran süresini takip etmek bu kararı güçlendirir.',
        notice: 'Zaman yönetimi, sorumluluk değerinin dijital alandaki karşılığıdır.'
      },
      {
        text: 'Biraz daha bakarım, sonra bırakırım.',
        effect: { responsibility: -8 },
        title: 'Erteleme başladı',
        what: 'Kısa süreli erteleme planlanan işleri geciktirmeye başladı.',
        better: 'Önce sorumluluğu tamamlamak, sonra sınırlı süreyle kullanmak daha dengelidir.',
        notice: 'Küçük ertelemeler zamanla alışkanlığa dönüşebilir.'
      },
      {
        text: 'Tüm zamanımı akışta geçiririm.',
        effect: { responsibility: -18, respect: -4 },
        title: 'Denge kayboldu',
        what: 'Sosyal medya günlük sorumlulukların önüne geçti.',
        better: 'Bildirimleri kapatmak, kullanım süresi koymak ve öncelikleri belirlemek gerekir.',
        notice: 'Kontrolsüz kullanım değer ve davranış dengesini zayıflatabilir.'
      },
      {
        text: 'Kısa mola verip sonra planıma dönerim.',
        effect: { responsibility: 8, kindness: 3 },
        title: 'Sınırlı kullanım denendi',
        what: 'Sosyal medyayı tamamen bırakmadın ama süreyi kontrol etmeye çalıştın.',
        better: 'Molanın süresini önceden belirlemek bu tercihi daha güvenli yapar.',
        notice: 'Denge, teknolojiyi planın içine alabilmektir.'
      }
    ]
  },
  {
    title: 'Öfkeyle Paylaşım',
    category: 'Paylaşım ve saygı',
    icon: 'P',
    tip: 'Öfkeyle yapılan paylaşım kısa sürede kalıcı bir iz bırakabilir.',
    text: 'Bir arkadaşınla tartıştın ve sinirle onun eski bir fotoğrafını paylaşmak istiyorsun.',
    postTitle: 'Hızlı paylaşım',
    postText: 'Fotoğraf komik görünüyor ama arkadaşın bunu paylaşmanı istemeyebilir.',
    choices: [
      {
        text: 'Fotoğrafı hemen paylaşırım.',
        effect: { respect: -16, kindness: -14, responsibility: -10 },
        title: 'Anlık öfke büyüdü',
        what: 'Kısa süreli öfke başkasının saygınlığını zedeleyen bir paylaşıma dönüştü.',
        better: 'Paylaşmadan önce beklemek ve yüz yüze konuşmak daha doğru olurdu.',
        notice: 'Dijital izler, öfke geçtikten sonra da kalabilir.'
      },
      {
        text: 'Paylaşmadan önce sakinleşirim.',
        effect: { respect: 12, kindness: 12, responsibility: 12 },
        title: 'Kendini durdurdun',
        what: 'Öfkeyle hareket etmek yerine sonucu düşünmeyi seçtin.',
        better: 'Sakinleşince konuyu doğrudan ve kırmadan konuşmak iyi bir adımdır.',
        notice: 'Kendini kontrol etmek dijital sorumluluğun önemli bir parçasıdır.'
      },
      {
        text: 'Fotoğrafı sadece yakın arkadaşlarıma gönderirim.',
        effect: { respect: -10, responsibility: -8, kindness: -8 },
        title: 'Zarar sınırlı kalmadı',
        what: 'Küçük bir gruba göndermek de izinsiz paylaşım anlamına gelir.',
        better: 'Kişisel görüntüleri izin olmadan kimseyle paylaşmamak gerekir.',
        notice: 'Paylaşımın az kişiye gitmesi onu doğru yapmaz.'
      },
      {
        text: 'Fotoğrafı taslakta bırakıp sonra karar veririm.',
        effect: { respect: 6, responsibility: 8, kindness: 6 },
        title: 'Öfke yavaşlatıldı',
        what: 'Anlık tepkiyi hemen paylaşmaya çevirmeyip kendine düşünme süresi verdin.',
        better: 'Sonraki adım, fotoğrafı silip konuyu doğrudan konuşmak olmalıdır.',
        notice: 'Paylaşımı ertelemek bazen zararı önleyen ilk adımdır.'
      }
    ]
  },
  {
    title: 'Başkasının Hatasını Yaymak',
    category: 'Paylaşım ve saygı',
    icon: 'P',
    tip: 'Bir hatayı görünür kılmak, kişiyi düzeltmekten çok incitebilir.',
    text: 'Bir öğrencinin yaptığı komik bir hata video olarak gruba düşüyor.',
    postTitle: 'Gündem olan video',
    postText: 'Video hızla yayılıyor ve herkes aynı kişiyle dalga geçiyor.',
    choices: [
      {
        text: 'Ben de gülerek paylaşırım.',
        effect: { respect: -15, kindness: -15, responsibility: -8 },
        title: 'Alay çoğaldı',
        what: 'Paylaşım kişiyi daha fazla küçük düşüren bir etkileşime dönüştü.',
        better: 'Videoyu yaymamak ve alay edenleri uyarmak daha doğru olurdu.',
        notice: 'Eğlenmek, birinin onurunu zedelemeyi haklı çıkarmaz.'
      },
      {
        text: 'Videoyu siler ve yaymam.',
        effect: { respect: 12, kindness: 10, responsibility: 10 },
        title: 'Yayılmayı durdurdun',
        what: 'Olumsuz içeriği büyütmeyerek zararı azalttın.',
        better: 'Gerekirse paylaşımı yapan kişiye bunun kırıcı olduğunu söyleyebilirsin.',
        notice: 'Bazen en doğru etkileşim hiç etkileşim vermemektir.'
      },
      {
        text: 'Kişiye özelden haber veririm.',
        effect: { respect: 14, kindness: 12, responsibility: 14 },
        title: 'Destek oldun',
        what: 'Kişiyi herkesin önünde utandırmadan durumdan haberdar ettin.',
        better: 'Bu yaklaşımı paylaşımı büyütmeden sürdürmek gerekir.',
        notice: 'Nezaket, hatayı düzeltirken kişiyi korumaktır.'
      },
      {
        text: 'Videoya gülmem ama paylaşımı da durdurmam.',
        effect: { respect: 2, kindness: -4, responsibility: -5 },
        title: 'Zarar tam durmadı',
        what: 'İçeriği yaymadın ama alay ortamının devam etmesine açık bir sınır koymadın.',
        better: 'Paylaşımı büyütmemekle birlikte kırıcı olduğunu belirtmek daha sorumludur.',
        notice: 'Pasif kalmak bazen alay edenlerin alanını geniş bırakır.'
      }
    ]
  },
  {
    title: 'Sınıf Grubu Şakası',
    category: 'Paylaşım ve saygı',
    icon: 'P',
    tip: 'Şaka, karşı tarafı incitiyorsa artık eğlence olmaktan çıkar.',
    text: 'Sınıf grubunda bir öğrencinin adıyla sahte bir hesap açılıp şaka yapılıyor.',
    postTitle: 'Sahte hesap şakası',
    postText: 'Bazıları eğleniyor, bazıları ise bunun rahatsız edici olduğunu söylüyor.',
    choices: [
      {
        text: 'Şakaya katılırım.',
        effect: { respect: -14, kindness: -13, responsibility: -10 },
        title: 'Şaka zarar verdi',
        what: 'Sahte hesapla eğlenmek kişinin kimliğini ve saygınlığını hedef aldı.',
        better: 'Sahte hesapla etkileşime girmemek ve durdurulmasını istemek gerekir.',
        notice: 'Dijital şaka da gerçek kişileri etkiler.'
      },
      {
        text: 'Bunun doğru olmadığını söylerim.',
        effect: { respect: 14, kindness: 10, responsibility: 12 },
        title: 'Sınır koydun',
        what: 'Kalabalığa uymak yerine kırıcı davranışa sınır koydun.',
        better: 'Gerekirse bir yetişkine veya grup yöneticisine haber vermek doğru olur.',
        notice: 'Saygı, grup baskısı varken de korunmalıdır.'
      },
      {
        text: 'Görmezden gelirim.',
        effect: { responsibility: -7, kindness: -5 },
        title: 'Belirsiz kaldı',
        what: 'Şakaya katılmadın ama zarar veren davranışın sürmesine engel olmadın.',
        better: 'En azından etkileşim vermemek ve güvenli bir uyarı yapmak daha iyidir.',
        notice: 'Sessiz kalmak bazen kırıcı davranışı güçlendirebilir.'
      },
      {
        text: 'Hesaptan çıkar, grup yöneticisine söylerim.',
        effect: { respect: 10, responsibility: 14, kindness: 8 },
        title: 'Güvenli yol seçildi',
        what: 'Şakayı büyütmeden yetkili bir kişiden yardım istedin.',
        better: 'Bu adımın yanında sahte hesapla etkileşim vermemek gerekir.',
        notice: 'Bazı durumlarda doğrudan tartışmak yerine yardım istemek daha güvenlidir.'
      }
    ]
  },
  {
    title: 'Kesilmiş Video',
    category: 'Doğruluk ve kaynak',
    icon: 'K',
    tip: 'Kısa kesitler olayın tamamını göstermeyebilir.',
    text: 'Bir kişinin sözleri kısa bir video kesitiyle paylaşılmış ve herkes tepki gösteriyor.',
    postTitle: 'Tepki çeken kesit',
    postText: 'Videonun öncesi ve sonrası yok; sadece en dikkat çekici bölüm var.',
    choices: [
      {
        text: 'Tamamını izlemeden paylaşırım.',
        effect: { truth: -16, responsibility: -10 },
        title: 'Eksik bilgi yayıldı',
        what: 'Bağlamı bilinmeyen bir kesit üzerinden hüküm verdin.',
        better: 'Videonun tamamını ve güvenilir kaynakları kontrol etmek gerekir.',
        notice: 'Doğruluk, yalnızca görünen parçaya değil bağlama da bakmayı gerektirir.'
      },
      {
        text: 'Kaynağı ve tam halini ararım.',
        effect: { truth: 16, responsibility: 12 },
        title: 'Bağlamı aradın',
        what: 'Hızlı tepki yerine bilginin tamamını öğrenmeye çalıştın.',
        better: 'Emin olmadığın içerikleri paylaşmamak bu tutumu güçlendirir.',
        notice: 'Dijital doğruluk, bağlam kontrolüyle başlar.'
      },
      {
        text: 'Yorumlara bakıp karar veririm.',
        effect: { truth: -8, responsibility: -5 },
        title: 'Kalabalığa güvendin',
        what: 'Yorumlar bilgi kaynağı gibi kullanıldı ama doğrulama sağlamadı.',
        better: 'Yorumlar yerine güvenilir kaynaklara bakmak gerekir.',
        notice: 'Çok kişinin aynı şeyi söylemesi onu kesin doğru yapmaz.'
      },
      {
        text: 'Paylaşmadan önce birkaç farklı kaynağa bakarım.',
        effect: { truth: 12, responsibility: 10 },
        title: 'Kontrol genişletildi',
        what: 'Tek bir kesit yerine farklı kaynaklardan bağlam aradın.',
        better: 'Kaynaklar net değilse paylaşmamak bu davranışı tamamlar.',
        notice: 'Doğru bilgi çoğu zaman tek görüntüden değil karşılaştırmadan çıkar.'
      }
    ]
  },
  {
    title: 'Sahte Çekiliş',
    category: 'Doğruluk ve kaynak',
    icon: 'K',
    tip: 'Çok cazip görünen dijital vaatler çoğu zaman kontrol ister.',
    text: 'İrfan isimli bir hesap, hediye kazanmak için linke tıklamanı ve paylaşım yapmanı istiyor.',
    postTitle: 'Hediye çekilişi',
    postText: 'Hesap yeni açılmış; yorumlarda herkes arkadaşlarını etiketliyor.',
    choices: [
      {
        text: 'Linke tıklar ve paylaşırım.',
        effect: { truth: -12, responsibility: -16 },
        title: 'Riskli bağlantı yayıldı',
        what: 'Güvenilirliği belirsiz bir bağlantı hem seni hem başkalarını riske attı.',
        better: 'İrfan isimli hesabı, bağlantıyı ve resmi duyuruları kontrol etmek gerekir.',
        notice: 'Dijital sorumluluk, güvenli olmayan bağlantıları yaymamaktır.'
      },
      {
        text: 'Hesabın gerçek olup olmadığını kontrol ederim.',
        effect: { truth: 14, responsibility: 14 },
        title: 'Güvenliği kontrol ettin',
        what: 'Cazip görünen içeriğe hemen kapılmadan doğrulama yaptın.',
        better: 'Şüpheli bağlantıları açmamak ve paylaşmamak gerekir.',
        notice: 'Kaynak kontrolü sadece haberlerde değil bağlantılarda da önemlidir.'
      },
      {
        text: 'Arkadaşlarıma özelden yollarım.',
        effect: { truth: -8, responsibility: -12 },
        title: 'Risk paylaşıldı',
        what: 'Herkese açık paylaşmasan da şüpheli bağlantıyı başkalarına taşıdın.',
        better: 'Emin olmadığın bağlantıları hiç göndermemek gerekir.',
        notice: 'İyi niyetli paylaşım da risk yayabilir.'
      },
      {
        text: 'Linke tıklamam ama İrfan isimli hesabı biraz incelerim.',
        effect: { truth: 8, responsibility: 10 },
        title: 'Risk azaltıldı',
        what: 'Bağlantıyı açmadan önce hesabın güvenilirliğini anlamaya çalıştın.',
        better: 'Şüphe devam ediyorsa paylaşmamak ve bildirmek daha doğru olur.',
        notice: 'Merak etmek doğal, güvenli kontrol yapmak sorumluluktur.'
      }
    ]
  },
  {
    title: 'Eski Haber Yeni Gibi',
    category: 'Doğruluk ve kaynak',
    icon: 'K',
    tip: 'Tarih kontrolü, yanlış yönlendirmeyi azaltır.',
    text: 'Eski bir haber bugün olmuş gibi yeniden paylaşılıyor.',
    postTitle: 'Gündem haberi',
    postText: 'Başlık dikkat çekici ama haberin tarihi görünmüyor.',
    choices: [
      {
        text: 'Başlığı görünce hemen paylaşırım.',
        effect: { truth: -14, responsibility: -8 },
        title: 'Yanıltıcı bilgi yayıldı',
        what: 'Tarihi kontrol edilmeyen haber güncelmiş gibi yayıldı.',
        better: 'Haberi açıp tarihini ve kaynağını kontrol etmek gerekir.',
        notice: 'Başlık tek başına güvenilir bilgi değildir.'
      },
      {
        text: 'Tarih ve kaynak kontrolü yaparım.',
        effect: { truth: 16, responsibility: 10 },
        title: 'Doğrulama yaptın',
        what: 'Haberin ne zaman ve nerede yayımlandığını kontrol ettin.',
        better: 'Güncel değilse paylaşmamak veya tarihini belirterek konuşmak gerekir.',
        notice: 'Tarih kontrolü dijital doğruluğun basit ama etkili adımıdır.'
      },
      {
        text: 'Sadece beğenirim.',
        effect: { truth: -5, responsibility: -5 },
        title: 'Etkileşim verildi',
        what: 'Beğeni, yanıltıcı içeriğin daha fazla kişiye görünmesine katkı sağlayabilir.',
        better: 'Emin olmadığın içeriklere etkileşim vermemek daha güvenlidir.',
        notice: 'Etkileşim de dijital bir tercihtir.'
      },
      {
        text: 'Haberi paylaşmadan önce başlığın tarihini sorarım.',
        effect: { truth: 8, responsibility: 6 },
        title: 'Soru soruldu',
        what: 'Hemen yaymak yerine içeriğin güncelliğini sorguladın.',
        better: 'Soru sormanın yanında kaynağı kendin de kontrol etmelisin.',
        notice: 'Şüphe anında soru sormak doğrulamanın başlangıcıdır.'
      }
    ]
  },
  {
    title: 'Caps ile Alay',
    category: 'Yorum ve üslup',
    icon: 'Y',
    tip: 'Mizah, bir kişiyi hedef aldığında kırıcı olabilir.',
    text: 'Birinin inancını veya değerini küçümseyen bir caps yorumlarda yayılıyor.',
    postTitle: 'Yorum zinciri',
    postText: 'Caps komik bulunuyor ama bazı kişiler incindiğini söylüyor.',
    choices: [
      {
        text: 'Ben de gülen yorum atarım.',
        effect: { respect: -12, kindness: -14 },
        title: 'Kırıcı dil desteklendi',
        what: 'Alaycı içerik beğeni ve yorumla daha görünür hale geldi.',
        better: 'Kişileri veya değerleri hedef alan mizaha destek vermemek gerekir.',
        notice: 'Dijital nezaket, gülmeden önce kimin incindiğini düşünmektir.'
      },
      {
        text: 'Kırıcı olduğunu saygılıca yazarım.',
        effect: { respect: 12, kindness: 14, responsibility: 6 },
        title: 'Üslup korundu',
        what: 'Karşı çıkarken kırıcı olmayan bir dil kullandın.',
        better: 'Mesajı kısa ve kişiselleştirmeden yazmak bu davranışı güçlendirir.',
        notice: 'Saygılı itiraz, dijital ortamda değerleri korur.'
      },
      {
        text: 'Daha sert bir caps ile cevap veririm.',
        effect: { respect: -10, kindness: -16 },
        title: 'Alay döngüsü büyüdü',
        what: 'Kırıcı mizaha kırıcı mizahla cevap verildi.',
        better: 'Sertleşmeden sınır koymak ve tartışmayı büyütmemek gerekir.',
        notice: 'Kötü üsluba aynı üslupla cevap vermek sorunu çözmez.'
      },
      {
        text: 'Beğenmem, konuyu değiştiren sakin bir yorum yazarım.',
        effect: { respect: 6, kindness: 8 },
        title: 'Gerilim yumuşatıldı',
        what: 'Kırıcı içeriği büyütmeden ortamın dilini değiştirmeye çalıştın.',
        better: 'Gerekirse kırıcı olduğunu açık ama saygılı şekilde belirtmek daha net olur.',
        notice: 'Nezaket bazen tartışmanın tonunu değiştirmekle başlar.'
      }
    ]
  },
  {
    title: 'Tartışma Etiketi',
    category: 'Yorum ve üslup',
    icon: 'Y',
    tip: 'Etiketlemek, tartışmayı çözmek yerine kalabalıklaştırabilir.',
    text: 'Bir tartışmada arkadaşlarını etiketleyip karşı tarafı susturmak istiyorsun.',
    postTitle: 'Hararetli tartışma',
    postText: 'Yorumlar hızla çoğalıyor ve kişiler birbirine sert cevaplar veriyor.',
    choices: [
      {
        text: 'Arkadaşlarımı etiketleyip destek çağırırım.',
        effect: { respect: -10, kindness: -12, responsibility: -8 },
        title: 'Kalabalık baskısı oluştu',
        what: 'Tartışma fikirden uzaklaşıp grup baskısına dönüştü.',
        better: 'Kendi görüşünü sakin ve kısa anlatmak daha doğru olurdu.',
        notice: 'Dijital tartışmalarda kalabalık çağırmak gerilimi artırabilir.'
      },
      {
        text: 'Kısa ve saygılı bir cevap veririm.',
        effect: { respect: 12, kindness: 10, truth: 6 },
        title: 'Tartışma dengelendi',
        what: 'Görüşünü ifade ederken kişileri hedef almadın.',
        better: 'Gerekirse konuşmayı bitirmek de olgun bir tercihtir.',
        notice: 'Her tartışmayı kazanmak değil, üslubu korumak değerlidir.'
      },
      {
        text: 'Karşı tarafı küçümseyen sözler yazarım.',
        effect: { respect: -14, kindness: -15 },
        title: 'Üslup sertleşti',
        what: 'Kişiyi hedef alan sözler tartışmayı daha kırıcı hale getirdi.',
        better: 'Fikre cevap vermek, kişiyi küçümsememek gerekir.',
        notice: 'Kişiye değil fikre odaklanmak dijital nezaketin temelidir.'
      },
      {
        text: 'Cevap yazmadan önce tartışmadan biraz uzaklaşırım.',
        effect: { respect: 6, kindness: 7, responsibility: 5 },
        title: 'Tepki ertelendi',
        what: 'Anlık öfkeyle yazmak yerine sakinleşmek için mesafe koydun.',
        better: 'Sonra gerekirse kısa ve kaynaklı bir cevap vermek daha faydalı olur.',
        notice: 'Bazen yazmamak, yanlış yazmaktan daha değerlidir.'
      }
    ]
  },
  {
    title: 'Arkadaşını Savunmak',
    category: 'Yorum ve üslup',
    icon: 'Y',
    tip: 'Birini savunmak, kırıcı dili sürdürmeden de mümkündür.',
    text: 'Yakın arkadaşına yorumlarda haksızca yükleniliyor.',
    postTitle: 'Yorum baskısı',
    postText: 'Bazı kullanıcılar arkadaşın hakkında sert ve küçümseyici sözler yazıyor.',
    choices: [
      {
        text: 'Ben de onlara hakaret ederim.',
        effect: { respect: -12, kindness: -16 },
        title: 'Savunma kırıcılaştı',
        what: 'Arkadaşını savunurken aynı kırıcı dili kullanmış oldun.',
        better: 'Sakin bir dille haksızlığı belirtmek ve gerekirse yorumları bildirmek gerekir.',
        notice: 'Doğru tarafı savunurken üslup da doğru kalmalıdır.'
      },
      {
        text: 'Saygılıca durmalarını isterim.',
        effect: { respect: 12, kindness: 14, responsibility: 8 },
        title: 'Destek dengeli verildi',
        what: 'Arkadaşını savundun ama kırıcı dili büyütmedin.',
        better: 'Arkadaşına özelden destek vermek de iyi bir adımdır.',
        notice: 'Nezaket, haksızlık karşısında da korunabilir.'
      },
      {
        text: 'Yorumları izlerim ama bir şey yapmam.',
        effect: { responsibility: -7, kindness: -4 },
        title: 'Destek eksik kaldı',
        what: 'Kırıcı yorumlar sürerken yapıcı bir destek verilmedi.',
        better: 'Güvenli bir şekilde destek olmak veya bildirmek daha sorumludur.',
        notice: 'Dijital ortamda destek bazen sessiz kalmamaktır.'
      },
      {
        text: 'Arkadaşıma özelden destek olup yorumları bildiririm.',
        effect: { respect: 8, kindness: 12, responsibility: 12 },
        title: 'Destek görünür oldu',
        what: 'Tartışmayı büyütmeden arkadaşının yalnız kalmamasını sağladın.',
        better: 'Gerekirse saygılı bir açık yorumla haksızlığı belirtmek de eklenebilir.',
        notice: 'Dijital destek hem kişiyi korur hem kırıcı dili azaltır.'
      }
    ]
  },
  {
    title: 'Konum Paylaşımı',
    category: 'Mahremiyet',
    icon: 'M',
    tip: 'Konum bilgisi sadece seni değil yanındaki kişileri de etkileyebilir.',
    text: 'Arkadaşlarınla buluştuğun yerden canlı konumlu hikaye paylaşmak istiyorsun.',
    postTitle: 'Canlı hikaye',
    postText: 'Hikayede konum etiketi ve yanında olan arkadaşların görünüyor.',
    choices: [
      {
        text: 'Herkesi etiketleyip konumu paylaşırım.',
        effect: { respect: -8, responsibility: -14, kindness: -5 },
        title: 'Mahremiyet açıldı',
        what: 'Başkalarının konumu ve görüntüsü izin alınmadan paylaşıldı.',
        better: 'Paylaşmadan önce izin almak ve konum bilgisini kapatmak gerekir.',
        notice: 'Mahremiyet, sadece kendi bilgini değil yanındakileri de kapsar.'
      },
      {
        text: 'Önce izin alır, konumu kapatırım.',
        effect: { respect: 14, responsibility: 16, kindness: 8 },
        title: 'Güvenli paylaşım',
        what: 'Hem izin aldın hem de gereksiz konum bilgisini kaldırdın.',
        better: 'Bu alışkanlığı her toplu paylaşımda sürdürmek gerekir.',
        notice: 'İzin almak dijital saygının en net göstergelerinden biridir.'
      },
      {
        text: 'Sadece yakın arkadaşlara atarım.',
        effect: { respect: -5, responsibility: -6 },
        title: 'Risk azalmadı',
        what: 'Kitle küçük olsa da izin ve konum sorunu devam etti.',
        better: 'Paylaşım grubundan bağımsız olarak izin ve konum kontrolü gerekir.',
        notice: 'Yakın çevre paylaşımı da mahremiyet sorumluluğu taşır.'
      },
      {
        text: 'Fotoğrafı sonra paylaşır, konumu eklemem.',
        effect: { responsibility: 8, respect: 6 },
        title: 'Risk azaltıldı',
        what: 'Canlı konum riskini azalttın ama fotoğraftaki kişiler için izin konusu devam ediyor.',
        better: 'Konumu kapatmanın yanında fotoğraftaki kişilerden izin almak gerekir.',
        notice: 'Mahremiyet çoğu zaman birkaç küçük kontrolün birleşimidir.'
      }
    ]
  },
  {
    title: 'Özel Mesaj Ekranı',
    category: 'Mahremiyet',
    icon: 'M',
    tip: 'Özel mesaj, adında olduğu gibi özel kalmalıdır.',
    text: 'Ahmet K.\'in özel mesajını ekran görüntüsü alıp başkasına göstermek istiyorsun.',
    postTitle: 'Mesaj ekranı',
    postText: 'Mesajda kişisel bilgiler ve özel bir konuşma yer alıyor.',
    choices: [
      {
        text: 'Ahmet K.\'in ekran görüntüsünü gruba atarım.',
        effect: { respect: -18, responsibility: -15, kindness: -12 },
        title: 'Güven zedelendi',
        what: 'Özel konuşma izinsiz şekilde başkalarına açıldı.',
        better: 'Özel mesajları izin olmadan paylaşmamak gerekir.',
        notice: 'Gizli konuşmayı yaymak dijital güveni kırar.'
      },
      {
        text: 'Paylaşmam, konuşmayı Ahmet K. ile özel tutarım.',
        effect: { respect: 16, responsibility: 14, kindness: 10 },
        title: 'Gizlilik korundu',
        what: 'Özel konuşmanın sınırına saygı gösterdin.',
        better: 'Sorun varsa bunu doğrudan ilgili kişiyle konuşmak daha doğrudur.',
        notice: 'Mahremiyeti korumak güven ilişkisini güçlendirir.'
      },
      {
        text: 'Ahmet K. ismini kapatıp paylaşırım.',
        effect: { respect: -8, responsibility: -8 },
        title: 'Gizlilik tam korunmadı',
        what: 'İsim kapansa bile konuşmanın içeriği kişiyi tanınabilir kılabilir.',
        better: 'İzin yoksa içeriği hiç paylaşmamak gerekir.',
        notice: 'Anonimleştirmek her zaman mahremiyeti korumaz.'
      },
      {
        text: 'Mesajı paylaşmadan sadece güvendiğim birinden fikir alırım.',
        effect: { respect: -3, responsibility: -3 },
        title: 'Niyet iyi ama sınır belirsiz',
        what: 'Yardım aradın fakat özel konuşmanın içeriği yine üçüncü kişiye açıldı.',
        better: 'Kişisel bilgileri göstermeden genel bir durum olarak danışmak daha güvenlidir.',
        notice: 'Destek istemek doğru olabilir; özel bilgiyi koruma şekli önemlidir.'
      }
    ]
  },
  {
    title: 'Aile Fotoğrafı',
    category: 'Mahremiyet',
    icon: 'M',
    tip: 'Aile içi görüntülerde herkesin rızası önemlidir.',
    text: 'Aile içinde çekilen özel bir fotoğrafı sosyal medyada paylaşmak istiyorsun.',
    postTitle: 'Aile anı',
    postText: 'Fotoğrafta paylaşılmak istemeyebilecek aile bireyleri de var.',
    choices: [
      {
        text: 'Güzel çıktığım için hemen paylaşırım.',
        effect: { respect: -10, responsibility: -12, kindness: -6 },
        title: 'Rıza atlandı',
        what: 'Kendi isteğin öne çıktı, fotoğraftaki diğer kişilerin izni sorulmadı.',
        better: 'Fotoğraftaki kişilerden izin almak gerekir.',
        notice: 'Paylaşım hakkı, fotoğraftaki herkesi ilgilendirir.'
      },
      {
        text: 'Paylaşmadan önce herkese sorarım.',
        effect: { respect: 14, responsibility: 14, kindness: 8 },
        title: 'Rıza gözetildi',
        what: 'Fotoğrafta yer alan kişilerin tercihine saygı gösterdin.',
        better: 'İstemeyen varsa fotoğrafı paylaşmamak veya onu çıkarmak gerekir.',
        notice: 'İzin sormak küçük ama güçlü bir saygı davranışıdır.'
      },
      {
        text: 'Sadece 24 saatlik hikaye atarım.',
        effect: { respect: -6, responsibility: -7 },
        title: 'Geçici sanıldı',
        what: 'Hikaye kısa süreli olsa da ekran görüntüsü alınabilir ve yayılabilir.',
        better: 'Süreli paylaşımda da izin almak gerekir.',
        notice: 'Geçici içerik de dijital iz bırakabilir.'
      },
      {
        text: 'Fotoğrafı kırpar, rahatsız olabilecek kişileri çıkarmaya çalışırım.',
        effect: { respect: 5, responsibility: 6 },
        title: 'Dikkat gösterildi',
        what: 'Paylaşımın başkalarını etkileyebileceğini fark ettin.',
        better: 'Kırpmak yetmeyebilir; en doğrusu yine izin almaktır.',
        notice: 'Mahremiyet için teknik düzenleme kadar rıza da önemlidir.'
      }
    ]
  },
  {
    title: 'Beğeni Sayısı',
    category: 'Dijital denge',
    icon: 'A',
    tip: 'Beğeni sayısı, kişinin değerini ölçen gerçek bir gösterge değildir.',
    text: 'Paylaşımın az beğeni aldı ve kendini değersiz hissetmeye başladın.',
    postTitle: 'Beğeni bildirimi',
    postText: 'Beklediğin kadar etkileşim gelmediği için moralin bozuluyor.',
    choices: [
      {
        text: 'Değerimi beğeni sayısıyla ölçerim.',
        effect: { kindness: -8, responsibility: -6 },
        title: 'Denge zayıfladı',
        what: 'Kendi değerini dijital etkileşime bağladın.',
        better: 'Beğenilerin kişiliğini ölçmediğini hatırlamak gerekir.',
        notice: 'Sayılar, insanın değerini anlatmakta yetersizdir.'
      },
      {
        text: 'Beğeninin değerimi belirlemediğini hatırlarım.',
        effect: { responsibility: 12, kindness: 10, truth: 4 },
        title: 'Algıyı dengeledin',
        what: 'Dijital tepki ile kişisel değeri ayırdın.',
        better: 'Bu farkındalığı sosyal medya kullanım sürenle de destekleyebilirsin.',
        notice: 'Dijital denge, kendini sayılarla ölçmemektir.'
      },
      {
        text: 'Daha çok beğeni için abartılı içerik paylaşırım.',
        effect: { truth: -10, responsibility: -8 },
        title: 'Onay arayışı arttı',
        what: 'Etkileşim almak için gerçeklikten uzaklaşma riski oluştu.',
        better: 'Kendini olduğun gibi ifade etmek ve ara vermek daha sağlıklıdır.',
        notice: 'Onay arayışı dijital davranışları kolayca yönlendirebilir.'
      },
      {
        text: 'Paylaşımı silmeden önce neden moralimin bozulduğunu düşünürüm.',
        effect: { responsibility: 8, kindness: 8 },
        title: 'Duygu fark edildi',
        what: 'Tepki vermeden önce beğeni sayısının sende oluşturduğu duyguyu anlamaya çalıştın.',
        better: 'Bu farkındalığı sosyal medya kullanımını sınırlamakla destekleyebilirsin.',
        notice: 'Kendini anlamak, dijital denge kurmanın ilk adımıdır.'
      }
    ]
  },
  {
    title: 'Filtre Baskısı',
    category: 'Dijital denge',
    icon: 'A',
    tip: 'Filtreler görünümü değiştirebilir ama gerçek değeri belirlemez.',
    text: 'Herkesin kusursuz göründüğü paylaşımları görünce kendi görünüşünden rahatsız oluyorsun.',
    postTitle: 'Filtreli akış',
    postText: 'Akışta sürekli düzenlenmiş ve kusursuz görünen fotoğraflar var.',
    choices: [
      {
        text: 'Kendimi sürekli eksik görürüm.',
        effect: { kindness: -10, responsibility: -6 },
        title: 'Algı baskısı arttı',
        what: 'Düzenlenmiş görüntüler gerçeklik algını etkiledi.',
        better: 'Filtreli içeriklerin gerçeğin tamamı olmadığını hatırlamak gerekir.',
        notice: 'Dijital görüntü, gerçek hayatın tamamı değildir.'
      },
      {
        text: 'Akışı azaltır, kendime karşı nazik olurum.',
        effect: { kindness: 14, responsibility: 12 },
        title: 'Kendini korudun',
        what: 'Seni olumsuz etkileyen içerikle arana sınır koydun.',
        better: 'Benzer içerikleri azaltmak ve gerçek hayata odaklanmak iyi gelir.',
        notice: 'Dijital nezaket kendine karşı da geçerlidir.'
      },
      {
        text: 'Ben de olduğumdan farklı görünmeye çalışırım.',
        effect: { truth: -10, responsibility: -5 },
        title: 'Gerçeklik uzaklaştı',
        what: 'Dijital görünüm için kendini olduğundan farklı sunma isteği oluştu.',
        better: 'Paylaşım yaparken gerçeklik ve ölçülülük korunmalıdır.',
        notice: 'Kusursuz görünme baskısı değer algısını zedeleyebilir.'
      },
      {
        text: 'Bu içerikleri azaltır ama tamamen bırakmam.',
        effect: { responsibility: 8, kindness: 8 },
        title: 'Sınır denendi',
        what: 'Seni zorlayan içeriklerle arana bir miktar mesafe koydun.',
        better: 'Sınırı düzenli hale getirmek ve kendine karşı daha nazik olmak gerekir.',
        notice: 'Dijital denge çoğu zaman küçük ayarlamalarla başlar.'
      }
    ]
  },
  {
    title: 'Trend Baskısı',
    category: 'Dijital denge',
    icon: 'A',
    tip: 'Her trende katılmak zorunda değilsin.',
    text: 'Popüler bir akım, değerlerine uygun olmayan bir davranışı eğlenceli gösteriyor.',
    postTitle: 'Yeni akım',
    postText: 'Arkadaşların katılıyor ve seni de etiketliyor.',
    choices: [
      {
        text: 'Dışlanmamak için katılırım.',
        effect: { responsibility: -10, truth: -6 },
        title: 'Grup baskısı etkiledi',
        what: 'Kendi ölçün yerine kalabalığın beklentisi belirleyici oldu.',
        better: 'Değerlerine uymayan akımlara katılmamak gerekir.',
        notice: 'Popüler olmak, doğru olmak anlamına gelmez.'
      },
      {
        text: 'Uygun bulmadığımı söyleyip katılmam.',
        effect: { responsibility: 14, truth: 8, respect: 6 },
        title: 'Sınırını korudun',
        what: 'Grup baskısına rağmen kendi değerlerine uygun davrandın.',
        better: 'Bunu kırmadan ifade etmek davranışı daha güçlü yapar.',
        notice: 'Dijital denge, her akıma kapılmamaktır.'
      },
      {
        text: 'Akımı daha da abartarak yaparım.',
        effect: { responsibility: -14, kindness: -6 },
        title: 'Kontrol azaldı',
        what: 'Etkileşim isteği davranışı daha riskli hale getirdi.',
        better: 'Eğlence ile değer sınırını ayırmak gerekir.',
        notice: 'Etkileşim için ölçüyü kaybetmek dijital dengeyi bozar.'
      },
      {
        text: 'Akımı izlerim ama bana uygun kısmı varsa onu yaparım.',
        effect: { responsibility: 7, truth: 4 },
        title: 'Uyarlama yapıldı',
        what: 'Popüler baskıya tamamen kapılmadan kendi sınırını korumaya çalıştın.',
        better: 'Değerlerine uymayan kısmı net biçimde dışarıda bırakmak gerekir.',
        notice: 'Her trende katılmak yerine seçerek davranmak daha dengelidir.'
      }
    ]
  },
  {
    title: 'Gece Akışı',
    category: 'Zaman yönetimi',
    icon: 'Z',
    tip: 'Uyku düzeni, dijital zaman yönetiminin önemli bir parçasıdır.',
    text: 'Gece yatmadan önce kısa süre bakmak için sosyal medyayı açıyorsun.',
    postTitle: 'Gece bildirimi',
    postText: 'Bir video bitmeden yenisi başlıyor ve süre uzuyor.',
    choices: [
      {
        text: 'Bir video daha diyerek devam ederim.',
        effect: { responsibility: -14 },
        title: 'Süre uzadı',
        what: 'Kısa kullanım planı kontrolsüz şekilde uzadı.',
        better: 'Yatmadan önce uygulamayı kapatmak veya zaman sınırı koymak gerekir.',
        notice: 'Küçük ertelemeler uyku düzenini etkileyebilir.'
      },
      {
        text: 'Zaman sınırı koyup kapatırım.',
        effect: { responsibility: 16, kindness: 4 },
        title: 'Sınır koydun',
        what: 'Dijital içerik yerine dinlenme ihtiyacını önceledin.',
        better: 'Bu sınırı düzenli alışkanlığa çevirmek faydalıdır.',
        notice: 'Zaman yönetimi, kendine karşı sorumluluktur.'
      },
      {
        text: 'Sabaha kadar akışta kalırım.',
        effect: { responsibility: -20, respect: -4 },
        title: 'Denge bozuldu',
        what: 'Sosyal medya temel ihtiyaçların önüne geçti.',
        better: 'Bildirimleri kapatıp uyku öncesi ekran süresini azaltmak gerekir.',
        notice: 'Kontrolsüz kullanım günlük sorumlulukları etkiler.'
      },
      {
        text: 'Bir alarm kurup sadece belirli süre bakarım.',
        effect: { responsibility: 9, kindness: 3 },
        title: 'Süre sınırı kondu',
        what: 'Kullanımı tamamen bırakmadın ama kontrol için somut bir sınır koydun.',
        better: 'Alarm çaldığında uygulamayı kapatmak bu tercihin asıl testidir.',
        notice: 'Zaman sınırı, dijital alışkanlığı yönetmenin pratik yoludur.'
      }
    ]
  },
  {
    title: 'Ders Arasında Bildirim',
    category: 'Zaman yönetimi',
    icon: 'Z',
    tip: 'Bildirimleri yönetmek dikkati korumaya yardım eder.',
    text: 'Ders çalışırken sürekli bildirim geliyor ve dikkatin dağılıyor.',
    postTitle: 'Bildirim akışı',
    postText: 'Her bildirimde telefonu kontrol etmek istiyorsun.',
    choices: [
      {
        text: 'Her bildirime hemen bakarım.',
        effect: { responsibility: -14 },
        title: 'Odak dağıldı',
        what: 'Ders çalışma süreci bildirimlerle bölündü.',
        better: 'Çalışma süresince bildirimleri kapatmak daha verimli olur.',
        notice: 'Dikkati korumak dijital sorumluluğun günlük karşılığıdır.'
      },
      {
        text: 'Telefonu sessize alıp mola saatinde bakarım.',
        effect: { responsibility: 18, truth: 4 },
        title: 'Odak korundu',
        what: 'Teknolojiyi çalışma planına göre yönettin.',
        better: 'Mola saatlerini önceden belirlemek bu davranışı güçlendirir.',
        notice: 'Kontrollü kullanım, sorumlulukları kolaylaştırır.'
      },
      {
        text: 'Dersi bırakıp sohbete geçerim.',
        effect: { responsibility: -18 },
        title: 'Öncelik kaydı',
        what: 'Anlık sohbet planlanan sorumluluğun önüne geçti.',
        better: 'Önce görevi tamamlamak, sonra sınırlı süreyle iletişim kurmak gerekir.',
        notice: 'Dijital zaman yönetimi öncelikleri belirlemektir.'
      },
      {
        text: 'Bildirimleri görürüm ama sadece acil olanlara bakarım.',
        effect: { responsibility: 6 },
        title: 'Kısmi kontrol sağlandı',
        what: 'Tüm bildirimlere kapılmamaya çalıştın ama dikkat hâlâ bölünebilir.',
        better: 'Acil olmayan bildirimleri tamamen sessize almak daha güçlü bir çözümdür.',
        notice: 'Odak korumak için sınırın net olması gerekir.'
      }
    ]
  },
  {
    title: 'Aile Sofrasında Telefon',
    category: 'Zaman yönetimi',
    icon: 'Z',
    tip: 'Dijital denge, çevrendeki insanlara ayırdığın zamanı da etkiler.',
    text: 'Ailenle yemek yerken sürekli telefona bakmak istiyorsun.',
    postTitle: 'Sofrada bildirim',
    postText: 'Telefon masada ve bildirimler dikkati çekiyor.',
    choices: [
      {
        text: 'Sofrada sürekli telefona bakarım.',
        effect: { respect: -8, responsibility: -10, kindness: -6 },
        title: 'İletişim zayıfladı',
        what: 'Yanındaki insanlarla kurulan bağ dijital akışa yenildi.',
        better: 'Yemek süresince telefonu kenara koymak daha saygılı olur.',
        notice: 'Zaman yönetimi, insanlara ayırdığın dikkati de kapsar.'
      },
      {
        text: 'Telefonu kenara koyup sohbete katılırım.',
        effect: { respect: 12, responsibility: 14, kindness: 10 },
        title: 'Bağ güçlendi',
        what: 'Dijital akış yerine yanındaki insanlara dikkat verdin.',
        better: 'Bu alışkanlığı aile ve arkadaş zamanlarında sürdürmek iyi olur.',
        notice: 'Teknolojiyi kenara koymak bazen değerleri öne çıkarmaktır.'
      },
      {
        text: 'Sadece gizlice kontrol ederim.',
        effect: { respect: -5, responsibility: -6 },
        title: 'Dikkat bölündü',
        what: 'Telefon görünmese de zihinsel dikkat sofradan uzaklaştı.',
        better: 'Kısa süreliğine tamamen uzak durmak daha etkilidir.',
        notice: 'Dijital denge yalnızca ekran süresi değil, dikkat yönetimidir.'
      },
      {
        text: 'Acil bir şey var mı diye bakıp telefonu ters çeviririm.',
        effect: { respect: 4, responsibility: 6 },
        title: 'Sınır kurulmaya çalışıldı',
        what: 'Telefonu tamamen bırakmadın ama sofradaki dikkati korumaya çalıştın.',
        better: 'Acil durum yoksa telefonu masadan uzaklaştırmak daha net bir sınırdır.',
        notice: 'Yakındaki insanlara dikkat vermek de dijital değerin parçasıdır.'
      }
    ]
  }
];
