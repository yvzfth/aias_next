export enum NavItemsValues {
  Applications = 'Başvurular',
  Periods = 'Dönemler',
  Faculties = 'Fakülteler',
  Settings = 'Ayarlar',
}
interface INavItems {
  [key: string]: NavItemsValues;
  applications: NavItemsValues;
  periods: NavItemsValues;
  faculties: NavItemsValues;
  settings: NavItemsValues;
}

export const NAV_ITEMS: INavItems = {
  applications: NavItemsValues.Applications,
  periods: NavItemsValues.Periods,
  faculties: NavItemsValues.Faculties,
  settings: NavItemsValues.Settings,
};
