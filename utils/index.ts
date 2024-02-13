export enum NavItemsValues {
  Applications = 'Başvurular',
  Users = 'Kullanıcılar',
}
interface INavItems {
  [key: string]: NavItemsValues;
  applications: NavItemsValues;
  users: NavItemsValues;
}

export const NAV_ITEMS: INavItems = {
  applications: NavItemsValues.Applications,
  users: NavItemsValues.Users,
};

const date = new Date();
const currentMonth = date.getMonth();
const monthNames = [
  { id: 1, value: 'Ocak' },
  { id: 2, value: 'Şubat' },
  { id: 3, value: 'Mart' },
  { id: 4, value: 'Nisan' },
  { id: 5, value: 'Mayıs' },
  { id: 6, value: 'Haziran' },
  { id: 7, value: 'Temmuz' },
  { id: 8, value: 'Ağustos' },
  { id: 9, value: 'Eylül' },
  { id: 10, value: 'Ekim' },
  { id: 11, value: 'Kasım' },
  { id: 12, value: 'Aralık' },
];

export const next12Months: {
  id: number;
  value: string;
}[] = [];
for (let i = 0; i < 12; i++) {
  next12Months.push(monthNames[(currentMonth + i) % 12]);
}

enum EFaculty {
  iisb = 'iisb',
  tip = 'tip',
  mmf = 'mmf',
  art = 'art',
}
interface IFacultiesAndDepartments {
  slug: EFaculty;
  faculty: string;
  departments: string[];
}

export const FacultiesAndDepartments: IFacultiesAndDepartments[] = [
  {
    slug: EFaculty.iisb,
    faculty: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
    departments: [
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
  },
  {
    slug: EFaculty.tip,
    faculty: 'Tıp Fakültesi',
    departments: [
      'Cerrahi Tıp Bilimleri Bölümü',
      'Dahili Tıp Bilimleri Bölümü',
      'Temel Tıp Bilimleri Bölümü',
    ],
  },
  {
    slug: EFaculty.mmf,
    faculty: 'Mühendislik ve Mimarlık Fakültesi',
    departments: [
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
  },
  {
    slug: EFaculty.art,
    faculty: 'Sanat ve Tasarım Fakültesi',
    departments: [
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
  },
];

export const facultiesAndDepartmentsArray = Object.entries(
  FacultiesAndDepartments
).map(([faculty, departments]) => ({
  faculty,
  departments,
}));
