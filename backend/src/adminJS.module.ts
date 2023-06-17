// import * as AdminJSPrisma from '@adminjs/prisma';
// import { PrismaClient } from '@prisma/client';
// import { DMMFClass } from '@prisma/client/runtime';
import * as AdminJSPrisma from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime/index';
import { PrismaService } from 'nestjs-prisma';
// import AdminJS from '@adminjs';
// import { PrismaService } from './prisma.service';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'test123',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
// const prisma = new PrismaClient();
// const dmmf = (prisma as any)._baseDmmf as DMMFClass;
// AdminJS.registerAdapter({
//   Resource: AdminJSPrisma.Resource,
//   Database: AdminJSPrisma.Database,
// });

export default import('@adminjs/nestjs').then(({ AdminModule }) =>
  AdminModule.createAdminAsync({
    useFactory: () => {
      const prisma = new PrismaService();
      // const dmmf = (prisma as any)._baseDmmf as DMMFClass;
      // const dmmf = prisma.
      return {
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            // {
            //   resource: { model: dmmf.modelMap.GoodsCategory, client: prisma },
            // },
            // {
            //   resource: { model: dmmf.modelMap.ServiceType, client: prisma },
            // },
            // {
            //   resource: { model: dmmf.modelMap.Employee, client: prisma },
            // },
            // {
            //   resource: { model: dmmf.modelMap.ReceptionPurpose, client: prisma },
            // },
          ],
          // locale: {
          //   language: 'ru',
          //   translations: {
          //     labels: {
          //       Employee: 'Сотрудники',
          //       GoodsCategory: 'Категории товаров',
          //       ServiceType: 'Категории услуг',
          //       ReceptionPurpose: 'Цели визитов',
          //     },
          //     messages: {
          //       welcomeOnBoard_title:
          //         'Добро пожаловать в административную панель!',
          //     },
          //     actions: {
          //       new: 'Добавить',
          //       edit: 'Редактировать',
          //       show: 'Показать',
          //       delete: 'Удалить',
          //     },
          //     buttons: {
          //       save: 'Сохранить',
          //       confirmRemovalMany_1: 'Удалить {{count}} запись',
          //       confirmRemovalMany_2: 'Удалить {{count}} записей',
          //     },
          //     resources: {
          //       Employee: {
          //         properties: {
          //           fullName: 'ФИО',
          //           role: 'Роль',
          //         },
          //       },
          //       GoodsCategory: {
          //         properties: {
          //           categoryName: 'Категория',
          //         },
          //       },
          //       ServiceType: {
          //         properties: {
          //           typeName: 'Тип услуги',
          //         },
          //       },
          //       ReceptionPurpose: {
          //         properties: {
          //           purposeName: 'Цель визита',
          //         },
          //       },
          //     },
          //   },
          // },
        },
        // auth: {
        //   authenticate,
        //   cookieName: 'adminjs',
        //   cookiePassword: 'asdd',
        // },
        // sessionOptions: {
        //   resave: true,
        //   saveUninitialized: true,
        //   secret: 'secret',
        // },
      };
    },
  })
);
