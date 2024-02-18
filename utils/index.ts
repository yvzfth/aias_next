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
export const academicTitles = [
  { value: 'Prof. Dr.' },
  { value: 'Doç. Dr.' },
  { value: 'Dr. Öğr. Üyesi.' },
  { value: 'Öğr. Gör.' },
  { value: 'Arş. Gör.' },
  { value: 'Uzman. Gör.' },
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
  departments: { value: string }[];
}

export const FacultiesAndDepartments: IFacultiesAndDepartments[] = [
  {
    slug: EFaculty.iisb,
    faculty: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
    departments: [
      { value: 'Ekonomi' },
      { value: 'Ekonomi ve Finans' },
      { value: 'Finans ve Bankacılık' },
      { value: 'Gazetecilik' },
      { value: 'Halkla İlişkiler ve Reklamcılık' },
      { value: 'Havacılık Yönetimi (Türkçe/İngilizce)' },
      { value: 'İngiliz Dili ve Edebiyatı (İngilizce)' },
      { value: 'İngilizce Mütercim ve Tercümanlık' },
      { value: 'İşletme (İngilizce)' },
      { value: 'İşletme (Türkçe)' },
      { value: 'Psikoloji' },
      { value: 'Psikoloji (İngilizce)' },
      { value: 'Sağlık Yönetimi' },
      { value: 'Siyaset Bilimi ve Kamu Yönetimi' },
      { value: 'Sosyal Hizmet (Türkçe/İngilizce)' },
      { value: 'Sosyoloji' },
      { value: 'Tarih' },
      { value: 'Uluslararası İlişkiler (Türkçe/İngilizce)' },
      { value: 'Uluslararası Ticaret ve Lojistik' },
      { value: 'Yeni Medya ve İletişim' },
      { value: 'Yeni Medya ve İletişim (İngilizce)' },
      { value: 'Yönetim Bilişim Sistemleri (Türkçe/İngilizce)' },
    ],
  },
  {
    slug: EFaculty.tip,
    faculty: 'Tıp Fakültesi',
    departments: [
      { value: 'Cerrahi Tıp Bilimleri Bölümü' },
      { value: 'Dahili Tıp Bilimleri Bölümü' },
      { value: 'Temel Tıp Bilimleri Bölümü' },
    ],
  },
  {
    slug: EFaculty.mmf,
    faculty: 'Mühendislik ve Mimarlık Fakültesi',
    departments: [
      { value: 'Ekonomi' },
      { value: 'Ekonomi ve Finans' },
      { value: 'Finans ve Bankacılık' },
      { value: 'Gazetecilik' },
      { value: 'Halkla İlişkiler ve Reklamcılık' },
      { value: 'Havacılık Yönetimi (Türkçe/İngilizce)' },
      { value: 'İngiliz Dili ve Edebiyatı (İngilizce)' },
      { value: 'İngilizce Mütercim ve Tercümanlık' },
      { value: 'İşletme (İngilizce)' },
      { value: 'İşletme (Türkçe)' },
      { value: 'Psikoloji' },
      { value: 'Psikoloji (İngilizce)' },
      { value: 'Sağlık Yönetimi' },
      { value: 'Siyaset Bilimi ve Kamu Yönetimi' },
      { value: 'Sosyal Hizmet (Türkçe/İngilizce)' },
      { value: 'Sosyoloji' },
      { value: 'Tarih' },
      { value: 'Uluslararası İlişkiler (Türkçe/İngilizce)' },
      { value: 'Uluslararası Ticaret ve Lojistik' },
      { value: 'Yeni Medya ve İletişim' },
      { value: 'Yeni Medya ve İletişim (İngilizce)' },
      { value: 'Yönetim Bilişim Sistemleri (Türkçe/İngilizce)' },
    ],
  },
  {
    slug: EFaculty.art,
    faculty: 'Sanat ve Tasarım Fakültesi',
    departments: [
      { value: 'Dijital Oyun Tasarımı' },
      { value: 'Endüstriyel Tasarım' },
      { value: 'Gastronomi ve Mutfak Sanatları' },
      { value: 'Grafik Tasarımı' },
      { value: 'İç Mimarlık' },
      { value: 'İç Mimarlık (İngilizce)' },
      { value: 'İletişim ve Tasarımı' },
      { value: 'Müzik (STF)' },
      { value: 'Radyo, Televizyon ve Sinema' },
      { value: 'Sahne ve Gösteri Sanatları Yönetimi' },
      { value: 'Tekstil ve Moda Tasarımı' },
    ],
  },
];

export const facultiesAndDepartmentsArray = Object.entries(
  FacultiesAndDepartments
).map(([faculty, departments]) => ({
  faculty,
  departments,
}));
