import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
};

export type AddInGoodsListInput = {
  goodsId: Scalars['Int'];
  quantity: Scalars['Float'];
  receptionId: Scalars['Int'];
};

export type AnalyzesResearch = {
  __typename?: 'AnalyzesResearch';
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  pet?: Maybe<Pet>;
  petId?: Maybe<Scalars['Int']>;
  type?: Maybe<TypeAnalyzesResearch>;
  typeId?: Maybe<Scalars['Int']>;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
  user: User;
};

export type BetweenDateInput = {
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  /** Client full name. */
  fullName: Scalars['String'];
  id: Scalars['Int'];
  pets?: Maybe<Array<Pet>>;
  telephoneNumber: Scalars['String'];
};

export type ClientConnection = {
  __typename?: 'ClientConnection';
  nodes: Array<Client>;
  totalCount: Scalars['Int'];
};

export type ClientOrder = {
  direction: OrderDirection;
  field: ClientOrderField;
};

/** Properties by which client connections can be ordered. */
export enum ClientOrderField {
  Address = 'address',
  CreatedAt = 'createdAt',
  FullName = 'fullName',
  Id = 'id',
  TelephoneNumber = 'telephoneNumber'
}

export type CountOutput = {
  __typename?: 'CountOutput';
  count: Scalars['Int'];
};

export type CreateAnalyzesResearchInput = {
  data?: InputMaybe<Scalars['String']>;
  petId: Scalars['Int'];
  typeId: Scalars['Int'];
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  telephoneNumber: Scalars['String'];
};

export type CreateGoodsCategoryInput = {
  categoryName: Scalars['String'];
};

export type CreateGoodsInput = {
  categoryId: Scalars['Int'];
  measure: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CreatePetInput = {
  DOB?: InputMaybe<Scalars['DateTime']>;
  alias: Scalars['String'];
  breed?: InputMaybe<Scalars['String']>;
  castration?: InputMaybe<Scalars['Boolean']>;
  clientId: Scalars['Int'];
  color?: InputMaybe<Scalars['String']>;
  diagnosis?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  nutrition?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type CreateReceptionInput = {
  anamnesis?: InputMaybe<Scalars['String']>;
  assignment?: InputMaybe<Scalars['String']>;
  clinicalSigns?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Float']>;
  diagnosis?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  employeeId: Scalars['Int'];
  goodsListReceptionInput?: InputMaybe<Array<GoodsListReceptionInput>>;
  petId: Scalars['Int'];
  purposeId: Scalars['Int'];
  serviceListReceptionInput?: InputMaybe<Array<ServiceListReceptionInput>>;
};

export type CreateReceptionRecordInput = {
  clientId?: InputMaybe<Scalars['Int']>;
  dateTimeEnd: Scalars['DateTime'];
  dateTimeStart: Scalars['DateTime'];
  employeeId?: InputMaybe<Scalars['Int']>;
  kindOfAnimal?: InputMaybe<Scalars['String']>;
  receptionPurposeId?: InputMaybe<Scalars['Int']>;
};

export type CreateServiceInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  typeId: Scalars['Int'];
};

export type CreateServiceTypeInput = {
  typeName: Scalars['String'];
};

export type CreateWorkScheduleInput = {
  dateWorkStart: Scalars['DateTime'];
  employeeId: Scalars['Int'];
  /** Количество дней для создания графика. */
  workDays: Scalars['Int'];
};

/** Properties by which select need department for write warehouse and registry data. */
export enum Department {
  Angarsk = 'Angarsk',
  Usolye = 'Usolye'
}

export type Employee = {
  __typename?: 'Employee';
  fullName: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  receptions?: Maybe<Array<Reception>>;
  role?: Maybe<Role>;
};

export type Goods = {
  __typename?: 'Goods';
  GoodsList?: Maybe<Array<GoodsList>>;
  category: GoodsCategory;
  categoryId?: Maybe<Scalars['Int']>;
  department?: Maybe<Department>;
  id: Scalars['Int'];
  measure?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

export type GoodsCategory = {
  __typename?: 'GoodsCategory';
  categoryName?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<Goods>>;
  id?: Maybe<Scalars['Int']>;
};

export type GoodsList = {
  __typename?: 'GoodsList';
  Goods?: Maybe<Goods>;
  Reception?: Maybe<Reception>;
  goods: Goods;
  goodsId?: Maybe<Scalars['Int']>;
  quantity: Scalars['Float'];
  receptionId?: Maybe<Scalars['String']>;
};

export type GoodsListReceptionInput = {
  goodsId: Scalars['Int'];
  quantity: Scalars['Float'];
};

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addInGoodsList: GoodsList;
  addInServiceList: ServiceType;
  changePassword: User;
  createAnalyzesResearch: AnalyzesResearch;
  createClient: Client;
  createGoods: Goods;
  createGoodsCategory: GoodsCategory;
  createPet: Pet;
  createReception: Reception;
  createReceptionRecord: ReceptionRecord;
  createService: Service;
  createWorkSchedule: Array<WorkSchedule>;
  deleteClient: Client;
  deleteGoods: Goods;
  deletePet: Pet;
  deleteReceptionRecord: ReceptionRecord;
  deleteResearch: AnalyzesResearch;
  deleteService: Service;
  deleteWorkScheduleAllEmployeeById: CountOutput;
  deleteWorkScheduleById: WorkSchedule;
  login: Auth;
  refreshToken: Token;
  updateAnalyzesResearch: AnalyzesResearch;
  updateClient: Client;
  updateDateReceptionRecord: ReceptionRecord;
  updateGoods: Goods;
  updatePet: Pet;
  updateReception: Reception;
  updateReceptionRecord: ReceptionRecord;
  updateService: Service;
  updateUser: User;
  updateWorkSchedule: WorkSchedule;
};


export type MutationAddInGoodsListArgs = {
  data: AddInGoodsListInput;
};


export type MutationAddInServiceListArgs = {
  data: CreateServiceTypeInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateAnalyzesResearchArgs = {
  data: CreateAnalyzesResearchInput;
};


export type MutationCreateClientArgs = {
  data: CreateClientInput;
};


export type MutationCreateGoodsArgs = {
  data: CreateGoodsInput;
};


export type MutationCreateGoodsCategoryArgs = {
  data: CreateGoodsCategoryInput;
};


export type MutationCreatePetArgs = {
  data: CreatePetInput;
};


export type MutationCreateReceptionArgs = {
  data: CreateReceptionInput;
};


export type MutationCreateReceptionRecordArgs = {
  data: CreateReceptionRecordInput;
};


export type MutationCreateServiceArgs = {
  data: CreateServiceInput;
};


export type MutationCreateWorkScheduleArgs = {
  data: CreateWorkScheduleInput;
};


export type MutationDeleteClientArgs = {
  clientId: Scalars['Int'];
};


export type MutationDeleteGoodsArgs = {
  goodsId: Scalars['Int'];
};


export type MutationDeletePetArgs = {
  petId: Scalars['Int'];
};


export type MutationDeleteReceptionRecordArgs = {
  receptionRecordId: Scalars['Int'];
};


export type MutationDeleteResearchArgs = {
  analyzesResearchId: Scalars['Int'];
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['Int'];
};


export type MutationDeleteWorkScheduleAllEmployeeByIdArgs = {
  employeeId: Scalars['Int'];
};


export type MutationDeleteWorkScheduleByIdArgs = {
  workScheduleId: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT'];
};


export type MutationUpdateAnalyzesResearchArgs = {
  analyzesResearchId: Scalars['Int'];
  data: UpdateAnalyzesResearchInput;
};


export type MutationUpdateClientArgs = {
  clientId: Scalars['Int'];
  data: UpdateClientInput;
};


export type MutationUpdateDateReceptionRecordArgs = {
  data: BetweenDateInput;
  receptionRecordId: Scalars['Int'];
};


export type MutationUpdateGoodsArgs = {
  data: UpdateGoodsInput;
  goodsId: Scalars['Int'];
};


export type MutationUpdatePetArgs = {
  data: UpdatePetInput;
  petId: Scalars['Int'];
};


export type MutationUpdateReceptionArgs = {
  data: UpdateReceptionInput;
  receptionId: Scalars['Int'];
};


export type MutationUpdateReceptionRecordArgs = {
  data: UpdateReceptionRecordInput;
  receptionRecordId: Scalars['Int'];
};


export type MutationUpdateServiceArgs = {
  data: UpdateServiceInput;
  serviceId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateWorkScheduleArgs = {
  data: UpdateWorkScheduleInput;
  workScheduleId: Scalars['Int'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pet = {
  __typename?: 'Pet';
  DOB?: Maybe<Scalars['String']>;
  alias: Scalars['String'];
  analyzesResearchs?: Maybe<Array<AnalyzesResearch>>;
  breed?: Maybe<Scalars['String']>;
  castration?: Maybe<Scalars['Boolean']>;
  client?: Maybe<Client>;
  clientId?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  diagnosis?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  kind?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  nutrition?: Maybe<Scalars['String']>;
  receptions?: Maybe<Array<Reception>>;
  weight?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  allEmployees: Array<Employee>;
  allGoods: Array<Goods>;
  allGoodsCategory: Array<GoodsCategory>;
  allGoodsList: Array<GoodsList>;
  allReceptionPurpose: Array<ReceptionPurpose>;
  allServiceList: Array<ServiceList>;
  allServiceType: Array<ServiceType>;
  allServices: Array<Service>;
  allTypeAnalyzesResearch: Array<TypeAnalyzesResearch>;
  analyzesResearch: AnalyzesResearch;
  clientDetail: Client;
  clientsWithSearch: Array<Client>;
  getSurgeryList: Array<Service>;
  getWorkScheduleById: WorkSchedule;
  getWorkSchedulesBetweenDate: Array<WorkSchedule>;
  hello: Scalars['String'];
  helloWorld: Scalars['String'];
  me: User;
  pet: Pet;
  reception: Reception;
  receptionRecord: ReceptionRecord;
  receptionRecordBetweenDate: Array<ReceptionRecord>;
  searchClients: ClientConnection;
};


export type QueryAnalyzesResearchArgs = {
  analyzesResearchId: Scalars['Int'];
};


export type QueryClientDetailArgs = {
  clientId: Scalars['Int'];
};


export type QueryClientsWithSearchArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetWorkScheduleByIdArgs = {
  workScheduleId: Scalars['Int'];
};


export type QueryGetWorkSchedulesBetweenDateArgs = {
  data: BetweenDateInput;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};


export type QueryPetArgs = {
  petId: Scalars['Int'];
};


export type QueryReceptionArgs = {
  receptionId: Scalars['Int'];
};


export type QueryReceptionRecordArgs = {
  receptionRecordId: Scalars['Int'];
};


export type QueryReceptionRecordBetweenDateArgs = {
  data: BetweenDateInput;
};


export type QuerySearchClientsArgs = {
  after?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClientOrder>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type Reception = {
  __typename?: 'Reception';
  /** Анамнез */
  anamnesis?: Maybe<Scalars['String']>;
  /** Лист назначения */
  assignment?: Maybe<Scalars['String']>;
  /** Клинические признаки */
  clinicalSigns?: Maybe<Scalars['String']>;
  /** Посчитанная стоимость приема по усулгам и товарам */
  cost?: Maybe<Scalars['Float']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Диагноз */
  diagnosis?: Maybe<Scalars['String']>;
  /** Скидка на прием */
  discount?: Maybe<Scalars['Int']>;
  employee?: Maybe<Employee>;
  employeeId?: Maybe<Scalars['Int']>;
  goods?: Maybe<Array<Maybe<GoodsList>>>;
  id: Scalars['Int'];
  pet?: Maybe<Pet>;
  petId?: Maybe<Scalars['Int']>;
  purpose?: Maybe<ReceptionPurpose>;
  purposeId?: Maybe<Scalars['Int']>;
  services?: Maybe<Array<Maybe<ServiceList>>>;
};

export type ReceptionPurpose = {
  __typename?: 'ReceptionPurpose';
  id?: Maybe<Scalars['Int']>;
  purposeName: Scalars['String'];
  receptions?: Maybe<Array<Reception>>;
};

export type ReceptionRecord = {
  __typename?: 'ReceptionRecord';
  client?: Maybe<Client>;
  clientId?: Maybe<Scalars['String']>;
  /** Дата и время конца записи */
  dateTimeEnd: Scalars['DateTime'];
  /** Дата и время начала записи */
  dateTimeStart: Scalars['DateTime'];
  employee?: Maybe<Employee>;
  employeeId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  /** Вид животного */
  kindOfAnimal?: Maybe<Scalars['String']>;
  purpose?: Maybe<ReceptionPurpose>;
  receptionPurposeId?: Maybe<Scalars['Int']>;
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Manager = 'MANAGER'
}

export type Service = {
  __typename?: 'Service';
  ServiceList?: Maybe<Array<ServiceList>>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  type?: Maybe<ServiceType>;
  typeId?: Maybe<Scalars['Int']>;
};

export type ServiceList = {
  __typename?: 'ServiceList';
  Reception?: Maybe<Reception>;
  Service?: Maybe<Service>;
  quantity?: Maybe<Scalars['Float']>;
  receptionId?: Maybe<Scalars['String']>;
  service: Service;
  serviceId?: Maybe<Scalars['Int']>;
};

export type ServiceListReceptionInput = {
  quantity: Scalars['Float'];
  serviceId: Scalars['Int'];
};

export type ServiceType = {
  __typename?: 'ServiceType';
  id?: Maybe<Scalars['Int']>;
  service?: Maybe<Array<Service>>;
  typeName?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  clientCreated: Client;
  serviceAdded: Service;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
};

export type TypeAnalyzesResearch = {
  __typename?: 'TypeAnalyzesResearch';
  analyzesResearch?: Maybe<Array<AnalyzesResearch>>;
  id?: Maybe<Scalars['Int']>;
  typeName?: Maybe<Scalars['String']>;
};

export type UpdateAnalyzesResearchInput = {
  data: Scalars['String'];
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  fullName: Scalars['String'];
  telephoneNumber: Scalars['String'];
};

export type UpdateGoodsInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type UpdatePetInput = {
  DOB?: InputMaybe<Scalars['DateTime']>;
  alias: Scalars['String'];
  breed?: InputMaybe<Scalars['String']>;
  castration?: InputMaybe<Scalars['Boolean']>;
  clientId: Scalars['Int'];
  color?: InputMaybe<Scalars['String']>;
  diagnosis?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['Boolean']>;
  kind: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  nutrition?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type UpdateReceptionInput = {
  anamnesis?: InputMaybe<Scalars['String']>;
  assignment?: InputMaybe<Scalars['String']>;
  clinicalSigns?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Float']>;
  diagnosis?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  employeeId: Scalars['Int'];
  goodsListReceptionInput?: InputMaybe<Array<GoodsListReceptionInput>>;
  purposeId: Scalars['Int'];
  serviceListReceptionInput?: InputMaybe<Array<ServiceListReceptionInput>>;
};

export type UpdateReceptionRecordInput = {
  clientId?: InputMaybe<Scalars['Int']>;
  dateTimeEnd: Scalars['DateTime'];
  dateTimeStart: Scalars['DateTime'];
  employeeId?: InputMaybe<Scalars['Int']>;
  kindOfAnimal?: InputMaybe<Scalars['String']>;
  receptionPurposeId?: InputMaybe<Scalars['Int']>;
};

export type UpdateServiceInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type UpdateUserInput = {
  fullName?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkScheduleInput = {
  date: Scalars['DateTime'];
  employeeId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  login: Scalars['String'];
  role: Role;
};

export type WorkSchedule = {
  __typename?: 'WorkSchedule';
  /** Дата рабочего дня */
  date: Scalars['DateTime'];
  employee?: Maybe<Employee>;
  employeeId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type CurrentUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, fullName?: string | null, login: string, role: Role } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: any, user: { __typename?: 'User', id: number, login: string, fullName?: string | null, role: Role } } };

export type GetAllServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServiceQuery = { __typename?: 'Query', allServices: Array<{ __typename?: 'Service', id: number, name?: string | null, price?: number | null, type?: { __typename?: 'ServiceType', id?: number | null, typeName?: string | null } | null }> };

export type CreateServiceMutationVariables = Exact<{
  data: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: number, name?: string | null, price?: number | null, type?: { __typename?: 'ServiceType', id?: number | null, typeName?: string | null } | null } };

export type GetAllServiceTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServiceTypeQuery = { __typename?: 'Query', allServiceType: Array<{ __typename?: 'ServiceType', id?: number | null, typeName?: string | null }> };

export type UpdateServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
  data: UpdateServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'Service', id: number, name?: string | null, price?: number | null, type?: { __typename?: 'ServiceType', id?: number | null, typeName?: string | null } | null } };

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: { __typename?: 'Service', id: number, name?: string | null } };

export type SearchClientQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchClientQuery = { __typename?: 'Query', clientsWithSearch: Array<{ __typename?: 'Client', id: number, fullName: string, telephoneNumber: string }> };

export type GetClientWithPaginationQueryVariables = Exact<{
  search: Scalars['String'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['Int']>;
  orderBy: ClientOrder;
}>;


export type GetClientWithPaginationQuery = { __typename?: 'Query', searchClients: { __typename?: 'ClientConnection', totalCount: number, nodes: Array<{ __typename?: 'Client', id: number, fullName: string, telephoneNumber: string, pets?: Array<{ __typename?: 'Pet', id: number, alias: string }> | null }> } };

export type CreateClientMutationVariables = Exact<{
  data: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string, address?: string | null, pets?: Array<{ __typename?: 'Pet', id: number, alias: string }> | null } };

export type ClientDetailQueryVariables = Exact<{
  clientId: Scalars['Int'];
}>;


export type ClientDetailQuery = { __typename?: 'Query', clientDetail: { __typename?: 'Client', id: number, fullName: string, address?: string | null, telephoneNumber: string, pets?: Array<{ __typename?: 'Pet', id: number, alias: string, kind?: string | null, gender?: boolean | null, DOB?: string | null, breed?: string | null }> | null } };

export type UpdateClientMutationVariables = Exact<{
  clientId: Scalars['Int'];
  data: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: number, fullName: string, address?: string | null, telephoneNumber: string, pets?: Array<{ __typename?: 'Pet', id: number, alias: string, kind?: string | null, gender?: boolean | null, DOB?: string | null, breed?: string | null }> | null } };

export type DeleteClientMutationVariables = Exact<{
  clientId: Scalars['Int'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'Client', id: number } };

export type CreatePetMutationVariables = Exact<{
  data: CreatePetInput;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet: { __typename?: 'Pet', id: number, alias: string, kind?: string | null, gender?: boolean | null, DOB?: string | null, breed?: string | null } };

export type GetPetDetailQueryVariables = Exact<{
  petId: Scalars['Int'];
}>;


export type GetPetDetailQuery = { __typename?: 'Query', pet: { __typename?: 'Pet', id: number, alias: string, DOB?: string | null, breed?: string | null, castration?: boolean | null, color?: string | null, diagnosis?: string | null, gender?: boolean | null, kind?: string | null, notes?: string | null, nutrition?: string | null, weight?: number | null, clientId?: number | null, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string, address?: string | null } | null, receptions?: Array<{ __typename?: 'Reception', id: number, diagnosis?: string | null, createdAt?: any | null, cost?: number | null, purpose?: { __typename?: 'ReceptionPurpose', purposeName: string } | null }> | null, analyzesResearchs?: Array<{ __typename?: 'AnalyzesResearch', id: number, createdAt?: any | null, type?: { __typename?: 'TypeAnalyzesResearch', typeName?: string | null } | null }> | null } };

export type UpdatePetMutationVariables = Exact<{
  petId: Scalars['Int'];
  data: UpdatePetInput;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', updatePet: { __typename?: 'Pet', id: number, alias: string, DOB?: string | null, breed?: string | null, castration?: boolean | null, color?: string | null, diagnosis?: string | null, gender?: boolean | null, kind?: string | null, notes?: string | null, nutrition?: string | null, weight?: number | null, clientId?: number | null, receptions?: Array<{ __typename?: 'Reception', id: number, diagnosis?: string | null, createdAt?: any | null, cost?: number | null, purpose?: { __typename?: 'ReceptionPurpose', purposeName: string } | null }> | null, analyzesResearchs?: Array<{ __typename?: 'AnalyzesResearch', id: number, createdAt?: any | null, type?: { __typename?: 'TypeAnalyzesResearch', typeName?: string | null } | null }> | null } };

export type DeletePetMutationVariables = Exact<{
  petId: Scalars['Int'];
}>;


export type DeletePetMutation = { __typename?: 'Mutation', deletePet: { __typename?: 'Pet', id: number } };

export type GetAllServicesWithNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServicesWithNameQuery = { __typename?: 'Query', allServices: Array<{ __typename?: 'Service', id: number, name?: string | null, price?: number | null }> };

export type GetSurgeryListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSurgeryListQuery = { __typename?: 'Query', getSurgeryList: Array<{ __typename?: 'Service', id: number, name?: string | null, price?: number | null }> };

export type GetAllGoodsWithNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGoodsWithNamesQuery = { __typename?: 'Query', allGoods: Array<{ __typename?: 'Goods', id: number, name: string, measure?: string | null, quantity?: number | null, price?: number | null }> };

export type GetAllEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmployeesQuery = { __typename?: 'Query', allEmployees: Array<{ __typename?: 'Employee', id?: number | null, fullName: string }> };

export type GetAllReceptionPurposeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReceptionPurposeQuery = { __typename?: 'Query', allReceptionPurpose: Array<{ __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string }> };

export type CreateReceptionMutationVariables = Exact<{
  data: CreateReceptionInput;
}>;


export type CreateReceptionMutation = { __typename?: 'Mutation', createReception: { __typename?: 'Reception', anamnesis?: string | null, assignment?: string | null, clinicalSigns?: string | null, cost?: number | null, diagnosis?: string | null, employeeId?: number | null, petId?: number | null, purposeId?: number | null, discount?: number | null, id: number } };

export type GetReceptionQueryVariables = Exact<{
  receptionId: Scalars['Int'];
}>;


export type GetReceptionQuery = { __typename?: 'Query', reception: { __typename?: 'Reception', id: number, anamnesis?: string | null, assignment?: string | null, clinicalSigns?: string | null, cost?: number | null, diagnosis?: string | null, petId?: number | null, discount?: number | null, pet?: { __typename?: 'Pet', alias: string, DOB?: string | null, kind?: string | null, gender?: boolean | null, id: number, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null } | null, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null, purpose?: { __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string } | null, goods?: Array<{ __typename?: 'GoodsList', quantity: number, goods: { __typename?: 'Goods', name: string, id: number, categoryId?: number | null, measure?: string | null, price?: number | null, category: { __typename?: 'GoodsCategory', id?: number | null } } } | null> | null, services?: Array<{ __typename?: 'ServiceList', quantity?: number | null, service: { __typename?: 'Service', id: number, typeId?: number | null, name?: string | null, price?: number | null, type?: { __typename?: 'ServiceType', id?: number | null } | null } } | null> | null } };

export type UpdateReceptionMutationVariables = Exact<{
  data: UpdateReceptionInput;
  receptionId: Scalars['Int'];
}>;


export type UpdateReceptionMutation = { __typename?: 'Mutation', updateReception: { __typename?: 'Reception', id: number } };

export type GetAllAnalyzeTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAnalyzeTypesQuery = { __typename?: 'Query', allTypeAnalyzesResearch: Array<{ __typename?: 'TypeAnalyzesResearch', id?: number | null, typeName?: string | null }> };

export type CreateAnalyzesResearchMutationVariables = Exact<{
  data: CreateAnalyzesResearchInput;
}>;


export type CreateAnalyzesResearchMutation = { __typename?: 'Mutation', createAnalyzesResearch: { __typename?: 'AnalyzesResearch', id: number, typeId?: number | null, petId?: number | null, data?: string | null, createdAt?: any | null } };

export type GetAnalyzesResearchQueryVariables = Exact<{
  analyzesResearchId: Scalars['Int'];
}>;


export type GetAnalyzesResearchQuery = { __typename?: 'Query', analyzesResearch: { __typename?: 'AnalyzesResearch', id: number, data?: string | null, createdAt?: any | null, pet?: { __typename?: 'Pet', alias: string, DOB?: string | null, kind?: string | null, gender?: boolean | null, id: number, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null } | null, type?: { __typename?: 'TypeAnalyzesResearch', id?: number | null, typeName?: string | null } | null } };

export type UpdateAnalyzesResearchMutationVariables = Exact<{
  data: UpdateAnalyzesResearchInput;
  analyzesResearchId: Scalars['Int'];
}>;


export type UpdateAnalyzesResearchMutation = { __typename?: 'Mutation', updateAnalyzesResearch: { __typename?: 'AnalyzesResearch', id: number } };

export type DeleteAnalyzesResearchMutationVariables = Exact<{
  analyzesResearchId: Scalars['Int'];
}>;


export type DeleteAnalyzesResearchMutation = { __typename?: 'Mutation', deleteResearch: { __typename?: 'AnalyzesResearch', id: number } };

export type GetAllGoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGoodsQuery = { __typename?: 'Query', allGoods: Array<{ __typename?: 'Goods', id: number, name: string, measure?: string | null, quantity?: number | null, price?: number | null, category: { __typename?: 'GoodsCategory', id?: number | null, categoryName?: string | null } }> };

export type CreateGoodsMutationVariables = Exact<{
  data: CreateGoodsInput;
}>;


export type CreateGoodsMutation = { __typename?: 'Mutation', createGoods: { __typename?: 'Goods', id: number, name: string, measure?: string | null, quantity?: number | null, price?: number | null, category: { __typename?: 'GoodsCategory', id?: number | null, categoryName?: string | null } } };

export type GetAllGoodsCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGoodsCategoryQuery = { __typename?: 'Query', allGoodsCategory: Array<{ __typename?: 'GoodsCategory', id?: number | null, categoryName?: string | null }> };

export type UpdateGoodsMutationVariables = Exact<{
  goodsId: Scalars['Int'];
  data: UpdateGoodsInput;
}>;


export type UpdateGoodsMutation = { __typename?: 'Mutation', updateGoods: { __typename?: 'Goods', id: number, name: string, measure?: string | null, quantity?: number | null, price?: number | null, category: { __typename?: 'GoodsCategory', id?: number | null, categoryName?: string | null } } };

export type DeleteGoodsMutationVariables = Exact<{
  goodsId: Scalars['Int'];
}>;


export type DeleteGoodsMutation = { __typename?: 'Mutation', deleteGoods: { __typename?: 'Goods', id: number, name: string } };

export type GetRecordsByDatesRangeQueryVariables = Exact<{
  data: BetweenDateInput;
}>;


export type GetRecordsByDatesRangeQuery = { __typename?: 'Query', receptionRecordBetweenDate: Array<{ __typename?: 'ReceptionRecord', id: number, dateTimeStart: any, dateTimeEnd: any, kindOfAnimal?: string | null, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null, purpose?: { __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string } | null }> };

export type CreateReceptionRecordMutationVariables = Exact<{
  data: CreateReceptionRecordInput;
}>;


export type CreateReceptionRecordMutation = { __typename?: 'Mutation', createReceptionRecord: { __typename?: 'ReceptionRecord', id: number, dateTimeStart: any, dateTimeEnd: any, kindOfAnimal?: string | null, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null, purpose?: { __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string } | null } };

export type UpdateReceptionRecordMutationVariables = Exact<{
  receptionRecordId: Scalars['Int'];
  data: UpdateReceptionRecordInput;
}>;


export type UpdateReceptionRecordMutation = { __typename?: 'Mutation', updateReceptionRecord: { __typename?: 'ReceptionRecord', id: number, dateTimeStart: any, dateTimeEnd: any, kindOfAnimal?: string | null, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null, purpose?: { __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string } | null } };

export type DeleteReceptionRecordMutationVariables = Exact<{
  receptionRecordId: Scalars['Int'];
}>;


export type DeleteReceptionRecordMutation = { __typename?: 'Mutation', deleteReceptionRecord: { __typename?: 'ReceptionRecord', id: number } };

export type UpdateDateReceptionRecordMutationVariables = Exact<{
  receptionRecordId: Scalars['Int'];
  data: BetweenDateInput;
}>;


export type UpdateDateReceptionRecordMutation = { __typename?: 'Mutation', updateDateReceptionRecord: { __typename?: 'ReceptionRecord', id: number, dateTimeStart: any, dateTimeEnd: any, kindOfAnimal?: string | null, client?: { __typename?: 'Client', id: number, fullName: string, telephoneNumber: string } | null, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null, purpose?: { __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string } | null } };

export type ServiceAddedSubscribeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ServiceAddedSubscribeSubscription = { __typename?: 'Subscription', serviceAdded: { __typename?: 'Service', id: number, name?: string | null, price?: number | null, type?: { __typename?: 'ServiceType', id?: number | null, typeName?: string | null } | null } };

export type GetWorkSchedulesBetweenDateQueryVariables = Exact<{
  data: BetweenDateInput;
}>;


export type GetWorkSchedulesBetweenDateQuery = { __typename?: 'Query', getWorkSchedulesBetweenDate: Array<{ __typename?: 'WorkSchedule', id: number, date: any, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null }> };

export type CreateWorkScheduleMutationVariables = Exact<{
  data: CreateWorkScheduleInput;
}>;


export type CreateWorkScheduleMutation = { __typename?: 'Mutation', createWorkSchedule: Array<{ __typename?: 'WorkSchedule', id: number, date: any, employee?: { __typename?: 'Employee', id?: number | null, fullName: string } | null }> };

export type DeleteWorkScheduleMutationVariables = Exact<{
  workScheduleId: Scalars['Int'];
}>;


export type DeleteWorkScheduleMutation = { __typename?: 'Mutation', deleteWorkScheduleById: { __typename?: 'WorkSchedule', id: number } };

export type DeleteWorkScheduleAllByIdMutationVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type DeleteWorkScheduleAllByIdMutation = { __typename?: 'Mutation', deleteWorkScheduleAllEmployeeById: { __typename?: 'CountOutput', count: number } };

export const CurrentUserProfileDocument = gql`
    query currentUserProfile {
  me {
    id
    fullName
    login
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrentUserProfileGQL extends Apollo.Query<CurrentUserProfileQuery, CurrentUserProfileQueryVariables> {
    override document = CurrentUserProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      login
      fullName
      role
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllServiceDocument = gql`
    query GetAllService {
  allServices {
    id
    name
    price
    type {
      id
      typeName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllServiceGQL extends Apollo.Query<GetAllServiceQuery, GetAllServiceQueryVariables> {
    override document = GetAllServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateServiceDocument = gql`
    mutation CreateService($data: CreateServiceInput!) {
  createService(data: $data) {
    id
    name
    price
    type {
      id
      typeName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateServiceGQL extends Apollo.Mutation<CreateServiceMutation, CreateServiceMutationVariables> {
    override document = CreateServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllServiceTypeDocument = gql`
    query GetAllServiceType {
  allServiceType {
    id
    typeName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllServiceTypeGQL extends Apollo.Query<GetAllServiceTypeQuery, GetAllServiceTypeQueryVariables> {
    override document = GetAllServiceTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateServiceDocument = gql`
    mutation UpdateService($serviceId: Int!, $data: UpdateServiceInput!) {
  updateService(serviceId: $serviceId, data: $data) {
    id
    name
    price
    type {
      id
      typeName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateServiceGQL extends Apollo.Mutation<UpdateServiceMutation, UpdateServiceMutationVariables> {
    override document = UpdateServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteServiceDocument = gql`
    mutation DeleteService($serviceId: Int!) {
  deleteService(serviceId: $serviceId) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteServiceGQL extends Apollo.Mutation<DeleteServiceMutation, DeleteServiceMutationVariables> {
    override document = DeleteServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchClientDocument = gql`
    query SearchClient($search: String!) {
  clientsWithSearch(search: $search) {
    id
    fullName
    telephoneNumber
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchClientGQL extends Apollo.Query<SearchClientQuery, SearchClientQueryVariables> {
    override document = SearchClientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetClientWithPaginationDocument = gql`
    query GetClientWithPagination($search: String!, $first: Int!, $after: Int, $orderBy: ClientOrder!) {
  searchClients(search: $search, first: $first, after: $after, orderBy: $orderBy) {
    nodes {
      id
      fullName
      telephoneNumber
      pets {
        id
        alias
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetClientWithPaginationGQL extends Apollo.Query<GetClientWithPaginationQuery, GetClientWithPaginationQueryVariables> {
    override document = GetClientWithPaginationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateClientDocument = gql`
    mutation CreateClient($data: CreateClientInput!) {
  createClient(data: $data) {
    id
    fullName
    telephoneNumber
    address
    pets {
      id
      alias
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateClientGQL extends Apollo.Mutation<CreateClientMutation, CreateClientMutationVariables> {
    override document = CreateClientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClientDetailDocument = gql`
    query ClientDetail($clientId: Int!) {
  clientDetail(clientId: $clientId) {
    id
    fullName
    address
    telephoneNumber
    pets {
      id
      alias
      kind
      gender
      DOB
      breed
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClientDetailGQL extends Apollo.Query<ClientDetailQuery, ClientDetailQueryVariables> {
    override document = ClientDetailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateClientDocument = gql`
    mutation UpdateClient($clientId: Int!, $data: UpdateClientInput!) {
  updateClient(clientId: $clientId, data: $data) {
    id
    fullName
    address
    telephoneNumber
    pets {
      id
      alias
      kind
      gender
      DOB
      breed
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateClientGQL extends Apollo.Mutation<UpdateClientMutation, UpdateClientMutationVariables> {
    override document = UpdateClientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteClientDocument = gql`
    mutation DeleteClient($clientId: Int!) {
  deleteClient(clientId: $clientId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteClientGQL extends Apollo.Mutation<DeleteClientMutation, DeleteClientMutationVariables> {
    override document = DeleteClientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePetDocument = gql`
    mutation CreatePet($data: CreatePetInput!) {
  createPet(data: $data) {
    id
    alias
    kind
    gender
    DOB
    breed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePetGQL extends Apollo.Mutation<CreatePetMutation, CreatePetMutationVariables> {
    override document = CreatePetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPetDetailDocument = gql`
    query GetPetDetail($petId: Int!) {
  pet(petId: $petId) {
    id
    alias
    DOB
    alias
    breed
    castration
    color
    diagnosis
    gender
    kind
    notes
    nutrition
    weight
    clientId
    client {
      id
      fullName
      telephoneNumber
      address
    }
    receptions {
      id
      diagnosis
      createdAt
      cost
      purpose {
        purposeName
      }
    }
    analyzesResearchs {
      id
      type {
        typeName
      }
      createdAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPetDetailGQL extends Apollo.Query<GetPetDetailQuery, GetPetDetailQueryVariables> {
    override document = GetPetDetailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePetDocument = gql`
    mutation UpdatePet($petId: Int!, $data: UpdatePetInput!) {
  updatePet(petId: $petId, data: $data) {
    id
    alias
    DOB
    alias
    breed
    castration
    color
    diagnosis
    gender
    kind
    notes
    nutrition
    weight
    clientId
    receptions {
      id
      diagnosis
      createdAt
      cost
      purpose {
        purposeName
      }
    }
    analyzesResearchs {
      id
      type {
        typeName
      }
      createdAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePetGQL extends Apollo.Mutation<UpdatePetMutation, UpdatePetMutationVariables> {
    override document = UpdatePetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePetDocument = gql`
    mutation DeletePet($petId: Int!) {
  deletePet(petId: $petId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePetGQL extends Apollo.Mutation<DeletePetMutation, DeletePetMutationVariables> {
    override document = DeletePetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllServicesWithNameDocument = gql`
    query GetAllServicesWithName {
  allServices {
    id
    name
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllServicesWithNameGQL extends Apollo.Query<GetAllServicesWithNameQuery, GetAllServicesWithNameQueryVariables> {
    override document = GetAllServicesWithNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetSurgeryListDocument = gql`
    query GetSurgeryList {
  getSurgeryList {
    id
    name
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSurgeryListGQL extends Apollo.Query<GetSurgeryListQuery, GetSurgeryListQueryVariables> {
    override document = GetSurgeryListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllGoodsWithNamesDocument = gql`
    query GetAllGoodsWithNames {
  allGoods {
    id
    name
    measure
    quantity
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllGoodsWithNamesGQL extends Apollo.Query<GetAllGoodsWithNamesQuery, GetAllGoodsWithNamesQueryVariables> {
    override document = GetAllGoodsWithNamesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllEmployeesDocument = gql`
    query GetAllEmployees {
  allEmployees {
    id
    fullName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllEmployeesGQL extends Apollo.Query<GetAllEmployeesQuery, GetAllEmployeesQueryVariables> {
    override document = GetAllEmployeesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllReceptionPurposeDocument = gql`
    query GetAllReceptionPurpose {
  allReceptionPurpose {
    id
    purposeName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllReceptionPurposeGQL extends Apollo.Query<GetAllReceptionPurposeQuery, GetAllReceptionPurposeQueryVariables> {
    override document = GetAllReceptionPurposeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateReceptionDocument = gql`
    mutation CreateReception($data: CreateReceptionInput!) {
  createReception(data: $data) {
    anamnesis
    assignment
    clinicalSigns
    cost
    diagnosis
    employeeId
    petId
    purposeId
    discount
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReceptionGQL extends Apollo.Mutation<CreateReceptionMutation, CreateReceptionMutationVariables> {
    override document = CreateReceptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetReceptionDocument = gql`
    query GetReception($receptionId: Int!) {
  reception(receptionId: $receptionId) {
    id
    anamnesis
    assignment
    clinicalSigns
    cost
    diagnosis
    petId
    discount
    pet {
      alias
      DOB
      kind
      gender
      id
      client {
        id
        fullName
        telephoneNumber
      }
    }
    employee {
      id
      fullName
    }
    purpose {
      id
      purposeName
    }
    goods {
      quantity
      goods {
        name
        id
        categoryId
        measure
        price
        category {
          id
        }
      }
    }
    services {
      quantity
      service {
        id
        typeId
        name
        price
        type {
          id
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReceptionGQL extends Apollo.Query<GetReceptionQuery, GetReceptionQueryVariables> {
    override document = GetReceptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateReceptionDocument = gql`
    mutation UpdateReception($data: UpdateReceptionInput!, $receptionId: Int!) {
  updateReception(data: $data, receptionId: $receptionId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateReceptionGQL extends Apollo.Mutation<UpdateReceptionMutation, UpdateReceptionMutationVariables> {
    override document = UpdateReceptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllAnalyzeTypesDocument = gql`
    query GetAllAnalyzeTypes {
  allTypeAnalyzesResearch {
    id
    typeName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAnalyzeTypesGQL extends Apollo.Query<GetAllAnalyzeTypesQuery, GetAllAnalyzeTypesQueryVariables> {
    override document = GetAllAnalyzeTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAnalyzesResearchDocument = gql`
    mutation createAnalyzesResearch($data: CreateAnalyzesResearchInput!) {
  createAnalyzesResearch(data: $data) {
    id
    typeId
    petId
    data
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAnalyzesResearchGQL extends Apollo.Mutation<CreateAnalyzesResearchMutation, CreateAnalyzesResearchMutationVariables> {
    override document = CreateAnalyzesResearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAnalyzesResearchDocument = gql`
    query GetAnalyzesResearch($analyzesResearchId: Int!) {
  analyzesResearch(analyzesResearchId: $analyzesResearchId) {
    id
    data
    createdAt
    pet {
      alias
      DOB
      kind
      gender
      id
      client {
        id
        fullName
        telephoneNumber
      }
    }
    type {
      id
      typeName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAnalyzesResearchGQL extends Apollo.Query<GetAnalyzesResearchQuery, GetAnalyzesResearchQueryVariables> {
    override document = GetAnalyzesResearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAnalyzesResearchDocument = gql`
    mutation UpdateAnalyzesResearch($data: UpdateAnalyzesResearchInput!, $analyzesResearchId: Int!) {
  updateAnalyzesResearch(analyzesResearchId: $analyzesResearchId, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAnalyzesResearchGQL extends Apollo.Mutation<UpdateAnalyzesResearchMutation, UpdateAnalyzesResearchMutationVariables> {
    override document = UpdateAnalyzesResearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAnalyzesResearchDocument = gql`
    mutation DeleteAnalyzesResearch($analyzesResearchId: Int!) {
  deleteResearch(analyzesResearchId: $analyzesResearchId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAnalyzesResearchGQL extends Apollo.Mutation<DeleteAnalyzesResearchMutation, DeleteAnalyzesResearchMutationVariables> {
    override document = DeleteAnalyzesResearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllGoodsDocument = gql`
    query GetAllGoods {
  allGoods {
    id
    name
    measure
    quantity
    price
    category {
      id
      categoryName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllGoodsGQL extends Apollo.Query<GetAllGoodsQuery, GetAllGoodsQueryVariables> {
    override document = GetAllGoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGoodsDocument = gql`
    mutation CreateGoods($data: CreateGoodsInput!) {
  createGoods(data: $data) {
    id
    name
    measure
    quantity
    price
    category {
      id
      categoryName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGoodsGQL extends Apollo.Mutation<CreateGoodsMutation, CreateGoodsMutationVariables> {
    override document = CreateGoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllGoodsCategoryDocument = gql`
    query GetAllGoodsCategory {
  allGoodsCategory {
    id
    categoryName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllGoodsCategoryGQL extends Apollo.Query<GetAllGoodsCategoryQuery, GetAllGoodsCategoryQueryVariables> {
    override document = GetAllGoodsCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGoodsDocument = gql`
    mutation UpdateGoods($goodsId: Int!, $data: UpdateGoodsInput!) {
  updateGoods(goodsId: $goodsId, data: $data) {
    id
    name
    measure
    quantity
    price
    category {
      id
      categoryName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGoodsGQL extends Apollo.Mutation<UpdateGoodsMutation, UpdateGoodsMutationVariables> {
    override document = UpdateGoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteGoodsDocument = gql`
    mutation DeleteGoods($goodsId: Int!) {
  deleteGoods(goodsId: $goodsId) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteGoodsGQL extends Apollo.Mutation<DeleteGoodsMutation, DeleteGoodsMutationVariables> {
    override document = DeleteGoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetRecordsByDatesRangeDocument = gql`
    query GetRecordsByDatesRange($data: BetweenDateInput!) {
  receptionRecordBetweenDate(data: $data) {
    client {
      id
      fullName
      telephoneNumber
    }
    employee {
      id
      fullName
    }
    purpose {
      id
      purposeName
    }
    id
    dateTimeStart
    dateTimeEnd
    kindOfAnimal
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRecordsByDatesRangeGQL extends Apollo.Query<GetRecordsByDatesRangeQuery, GetRecordsByDatesRangeQueryVariables> {
    override document = GetRecordsByDatesRangeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateReceptionRecordDocument = gql`
    mutation CreateReceptionRecord($data: CreateReceptionRecordInput!) {
  createReceptionRecord(data: $data) {
    client {
      id
      fullName
      telephoneNumber
    }
    employee {
      id
      fullName
    }
    purpose {
      id
      purposeName
    }
    id
    dateTimeStart
    dateTimeEnd
    kindOfAnimal
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReceptionRecordGQL extends Apollo.Mutation<CreateReceptionRecordMutation, CreateReceptionRecordMutationVariables> {
    override document = CreateReceptionRecordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateReceptionRecordDocument = gql`
    mutation UpdateReceptionRecord($receptionRecordId: Int!, $data: UpdateReceptionRecordInput!) {
  updateReceptionRecord(receptionRecordId: $receptionRecordId, data: $data) {
    client {
      id
      fullName
      telephoneNumber
    }
    employee {
      id
      fullName
    }
    purpose {
      id
      purposeName
    }
    id
    dateTimeStart
    dateTimeEnd
    kindOfAnimal
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateReceptionRecordGQL extends Apollo.Mutation<UpdateReceptionRecordMutation, UpdateReceptionRecordMutationVariables> {
    override document = UpdateReceptionRecordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteReceptionRecordDocument = gql`
    mutation DeleteReceptionRecord($receptionRecordId: Int!) {
  deleteReceptionRecord(receptionRecordId: $receptionRecordId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteReceptionRecordGQL extends Apollo.Mutation<DeleteReceptionRecordMutation, DeleteReceptionRecordMutationVariables> {
    override document = DeleteReceptionRecordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDateReceptionRecordDocument = gql`
    mutation UpdateDateReceptionRecord($receptionRecordId: Int!, $data: BetweenDateInput!) {
  updateDateReceptionRecord(receptionRecordId: $receptionRecordId, data: $data) {
    client {
      id
      fullName
      telephoneNumber
    }
    employee {
      id
      fullName
    }
    purpose {
      id
      purposeName
    }
    id
    dateTimeStart
    dateTimeEnd
    kindOfAnimal
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDateReceptionRecordGQL extends Apollo.Mutation<UpdateDateReceptionRecordMutation, UpdateDateReceptionRecordMutationVariables> {
    override document = UpdateDateReceptionRecordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ServiceAddedSubscribeDocument = gql`
    subscription serviceAddedSubscribe {
  serviceAdded {
    id
    name
    price
    type {
      id
      typeName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ServiceAddedSubscribeGQL extends Apollo.Subscription<ServiceAddedSubscribeSubscription, ServiceAddedSubscribeSubscriptionVariables> {
    override document = ServiceAddedSubscribeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetWorkSchedulesBetweenDateDocument = gql`
    query GetWorkSchedulesBetweenDate($data: BetweenDateInput!) {
  getWorkSchedulesBetweenDate(data: $data) {
    employee {
      id
      fullName
    }
    id
    date
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWorkSchedulesBetweenDateGQL extends Apollo.Query<GetWorkSchedulesBetweenDateQuery, GetWorkSchedulesBetweenDateQueryVariables> {
    override document = GetWorkSchedulesBetweenDateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateWorkScheduleDocument = gql`
    mutation CreateWorkSchedule($data: CreateWorkScheduleInput!) {
  createWorkSchedule(data: $data) {
    employee {
      id
      fullName
    }
    id
    date
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateWorkScheduleGQL extends Apollo.Mutation<CreateWorkScheduleMutation, CreateWorkScheduleMutationVariables> {
    override document = CreateWorkScheduleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteWorkScheduleDocument = gql`
    mutation DeleteWorkSchedule($workScheduleId: Int!) {
  deleteWorkScheduleById(workScheduleId: $workScheduleId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteWorkScheduleGQL extends Apollo.Mutation<DeleteWorkScheduleMutation, DeleteWorkScheduleMutationVariables> {
    override document = DeleteWorkScheduleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteWorkScheduleAllByIdDocument = gql`
    mutation DeleteWorkScheduleAllById($employeeId: Int!) {
  deleteWorkScheduleAllEmployeeById(employeeId: $employeeId) {
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteWorkScheduleAllByIdGQL extends Apollo.Mutation<DeleteWorkScheduleAllByIdMutation, DeleteWorkScheduleAllByIdMutationVariables> {
    override document = DeleteWorkScheduleAllByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }