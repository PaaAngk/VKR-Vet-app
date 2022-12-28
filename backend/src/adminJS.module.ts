import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSPrisma from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
const prisma = new PrismaClient();
const dmmf = (prisma as any)._baseDmmf as DMMFClass;
AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

export default AdminModule.createAdminAsync({
  useFactory: () => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        {
          resource: { model: dmmf.modelMap.Client, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.Pet, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.Employee, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.AnalyzesResearch, client: prisma },
        },
        {
          resource: {
            model: dmmf.modelMap.TypeAnalyzesResearch,
            client: prisma,
          },
        },
        {
          resource: { model: dmmf.modelMap.Reception, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.ReceptionPurpose, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.Goods, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.GoodsCategory, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.GoodsList, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.Service, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.ServiceType, client: prisma },
        },
        {
          resource: { model: dmmf.modelMap.ServiceList, client: prisma },
        },
      ],
    },
    auth: {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'secret',
    },
    sessionOptions: {
      resave: true,
      saveUninitialized: true,
      secret: 'secret',
    },
  }),
});
