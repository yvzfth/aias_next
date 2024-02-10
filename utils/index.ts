export enum NavItemsValues {
  Applications = 'Başvurular',
  Periods = 'Dönemler',
  Faculties = 'Fakülteler',
  Users = 'Kullanıcılar',
}
interface INavItems {
  [key: string]: NavItemsValues;
  applications: NavItemsValues;
  periods: NavItemsValues;
  faculties: NavItemsValues;
  users: NavItemsValues;
}

export const NAV_ITEMS: INavItems = {
  applications: NavItemsValues.Applications,
  periods: NavItemsValues.Periods,
  faculties: NavItemsValues.Faculties,
  users: NavItemsValues.Users,
};

interface IFacultiesAndDepartments {
  [key: string]: string[];
}

export const FacultiesAndDepartments: IFacultiesAndDepartments = {
  'İktisadi, idari ve Sosyal Bilimler Fakültesi': [
    'Ekonomi',
    'Ekonomi ve Finans',
    'Finans ve Bankacılık',
    'Gazetecilik',
    'Halkla İlişkiler ve Reklamcılık',
    'Havacılık Yönetimi (Türkçe/İngilizce)',
    'İngiliz Dili ve Edebiyatı (İngilizce)',
    'İngilizce Mütercim ve Tercümanlık',
    'İşletme (İngilizce)',
    'İşletme (Türkçe)',
    'Psikoloji',
    'Psikoloji (İngilizce)',
    'Sağlık Yönetimi',
    'Siyaset Bilimi ve Kamu Yönetimi',
    'Sosyal Hizmet (Türkçe/İngilizce)',
    'Sosyoloji',
    'Tarih',
    'Uluslararası İlişkiler (Türkçe/İngilizce)',
    'Uluslararası Ticaret ve Lojistik',
    'Yeni Medya ve İletişim',
    'Yeni Medya ve İletişim (İngilizce)',
    'Yönetim Bilişim Sistemleri (Türkçe/İngilizce)',
  ],
  'Tıp Fakültesi': [
    'Cerrahi Tıp Bilimleri Bölümü',
    'Dahili Tıp Bilimleri Bölümü',
    'Temel Tıp Bilimleri Bölümü',
  ],
  'Mühendislik ve Mimarlık Fakültesi': [
    'Bilgisayar Mühendisliği(Türkçe)',
    'Elektrik-Elektronik Mühendisliği (Türkçe / İngilizce)',
    'Endüstri Mühendisliği(Türkçe)',
    'İç Mimarlık ve Çevre Tasarımı(Türkçe)',
    'İnşaat Mühendisliği (İngilizce/Türkçe)',
    'Makine Mühendisliği(Türkçe)',
    'Mekatronik Mühendisliği(Türkçe)',
    'Mimarlık (İngilizce/Türkçe)',
    'Yazılım Mühendisliği (İngilizce)',
  ],
  'Sanat ve Tasarım Fakültesi': [
    'Dijital Oyun Tasarımı',
    'Endüstriyel Tasarım',
    'Gastronomi ve Mutfak Sanatları',
    'Grafik Tasarımı',
    'İç Mimarlık',
    'İç Mimarlık (İngilizce)',
    'İletişim ve Tasarımı',
    'Müzik (STF)',
    'Radyo, Televizyon ve Sinema',
    'Sahne ve Gösteri Sanatları Yönetimi',
    'Tekstil ve Moda Tasarımı',
  ],
};
