const names = [
  { firstName: 'Makayla', lastName: 'Salazar' },
  { firstName: 'Emerson', lastName: 'Hines' },
  { firstName: 'Kaylen', lastName: 'Schwartz' },
  { firstName: 'Isla', lastName: 'Li' },
  { firstName: 'Ada', lastName: 'Walters' },
  { firstName: 'Brayan', lastName: 'Kidd' },
  { firstName: 'Shirley', lastName: 'Adams' },
  { firstName: 'Haiden', lastName: 'Mcmillan' },
  { firstName: 'Lina', lastName: 'Moran' },
  { firstName: 'Abraham', lastName: 'Bentley' },
  { firstName: 'Zack', lastName: 'Sheppard' },
  { firstName: 'Jazlene', lastName: 'Flores' },
  { firstName: 'Carly', lastName: 'Hayes' },
  { firstName: 'Jaiden', lastName: 'Barton' },
  { firstName: 'Nikolai', lastName: 'Hampton' },
  { firstName: 'Nora', lastName: 'Elliott' },
  { firstName: 'Gracie', lastName: 'Skinner' },
  { firstName: 'Mylie', lastName: 'Martinez' },
  { firstName: 'Makenzie', lastName: 'Fuller' },
  { firstName: 'Melany', lastName: 'Jacobs' },
  { firstName: 'Kyla', lastName: 'Duffy' },
  { firstName: 'Meadow', lastName: 'Travis' },
  { firstName: 'Jaidyn', lastName: 'Mckee' },
  { firstName: 'Yandel', lastName: 'Carson' },
  { firstName: 'Vicente', lastName: 'Pierce' },
  { firstName: 'Rory', lastName: 'Hernandez' },
  { firstName: 'Moses', lastName: 'Gallegos' },
  { firstName: 'Zain', lastName: 'Yoder' },
  { firstName: 'Violet', lastName: 'Cannon' },
  { firstName: 'Chad', lastName: 'Wu' },
  { firstName: 'Messiah', lastName: 'Hill' },
  { firstName: 'Yasmine', lastName: 'Sutton' },
  { firstName: 'Tristan', lastName: 'Michael' },
  { firstName: 'Jaida', lastName: 'Cruz' }
];

window.names = names;

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
};

export const randomizeFirstName = () => {
  return getRandomName().firstName;
};

export const randomizeLastName = () => {
  return getRandomName().lastName;
};
