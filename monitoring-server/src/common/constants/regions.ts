export const REGIONS = {
  VINNYTSIA: 'Вінницька область',
  VOLYN: 'Волинська область',
  DNIPRO: 'Дніпровська область',
  DONETSK: 'Донецька область',
  ZHYTOMYR: 'Житомирська область',
  ZAKARPATTIA: 'Закарпатська область',
  ZAPORIZHIA: 'Запорізька область',
  IVANO_FRANKIVSK: 'Івано-Франківська область',
  KYIV: 'Київська область',
  KIROVOHRAD: 'Кіровоградська область',
  LUHANSK: 'Луганська область',
  LVIV: 'Львівська область',
  MYKOLAIV: 'Миколаївська область',
  ODESA: 'Одеська область',
  POLTAVA: 'Полтавська область',
  RIVNE: 'Рівненська область',
  SUMY: 'Сумська область',
  TERNOPIL: 'Тернопільська область',
  KHARKIV: 'Харківська область',
  KHERSON: 'Херсонська область',
  KHMELNYTSKYI: 'Хмельницька область',
  CHERKASY: 'Черкаська область',
  CHERNIHIV: 'Чернігівська область',
  CHERNIVTSI: 'Чернівецька область',
  CRIMEA: 'АР Крим',
};

export const REGION_NUMBERS = {
  'Вінницька область': '01',
  'Волинська область': '02',
  'Дніпровська область': '03',
  'Донецька область': '04',
  'Житомирська область': '05',
  'Закарпатська область': '06',
  'Запорізька область': '07',
  'Івано-Франківська область': '08',
  'Київська область': '09',
  'Кіровоградська область': '10',
  'Луганська область': '11',
  'Львівська область': '12',
  'Миколаївська область': '13',
  'Одеська область': '14',
  'Полтавська область': '15',
  'Рівненська область': '16',
  'Сумська область': '17',
  'Тернопільська область': '18',
  'Харківська область': '19',
  'Херсонська область': '21',
  'Хмельницька область': '22',
  'Черкаська область': '23',
  'Чернігівська область': '24',
  'Чернівецька область': '25',
  'АР Крим': '26',
};

export type RegionsKeys = keyof typeof REGIONS;
export type RegionsValues = (typeof REGIONS)[RegionsKeys];