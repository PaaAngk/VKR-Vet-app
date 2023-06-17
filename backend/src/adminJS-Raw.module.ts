// import { Adapter, Resource, Database } from '@adminjs/sql';
// import AdminJS from 'adminjs';
// import Plugin from '@adminjs/express';

// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'test123',
// };

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

// AdminJS.registerAdapter({
//   Resource: Resource,
//   Database: Database,
// });
// const db = await new Adapter('postgresql', {
//   connectionString:
//     'postgresql:/postgres:admin@localhost:5432/vet2?schema=public',
//   database: 'vet2',
// }).init();

// const admin = new AdminJS({
//   resources: [
//     {
//       resource: [db.table('GoodsCategory')],
//       options: {},
//     },
//   ],
//   locale: {
//     language: 'ru',
//     translations: {
//       labels: {
//         Employee: 'Сотрудники',
//         GoodsCategory: 'Категории товаров',
//         ServiceType: 'Категории услуг',
//         ReceptionPurpose: 'Цели визитов',
//       },
//       messages: {
//         welcomeOnBoard_title: 'Добро пожаловать в административную панель!',
//       },
//       actions: {
//         new: 'Добавить',
//         edit: 'Редактировать',
//         show: 'Показать',
//         delete: 'Удалить',
//       },
//       buttons: {
//         save: 'Сохранить',
//         confirmRemovalMany_1: 'Удалить {{count}} запись',
//         confirmRemovalMany_2: 'Удалить {{count}} записей',
//       },
//       resources: {
//         Employee: {
//           properties: {
//             fullName: 'ФИО',
//             role: 'Роль',
//           },
//         },
//         GoodsCategory: {
//           properties: {
//             categoryName: 'Категория',
//           },
//         },
//         ServiceType: {
//           properties: {
//             typeName: 'Тип услуги',
//           },
//         },
//         ReceptionPurpose: {
//           properties: {
//             purposeName: 'Цель визита',
//           },
//         },
//       },
//     },
//   },
// });
// admin.watch()

// const router = Plugin.buildRouter(admin);

// app.use(admin.options.rootPath, router);