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
  receptionId: Scalars['String'];
};

export type AnalyzesResearch = {
  __typename?: 'AnalyzesResearch';
  Pet?: Maybe<Pet>;
  TypeAnalyzesResearch?: Maybe<TypeAnalyzesResearch>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  petId?: Maybe<Scalars['String']>;
  type: TypeAnalyzesResearch;
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

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  /** Client full name. */
  fullName: Scalars['String'];
  id: Scalars['String'];
  pets?: Maybe<Array<Pet>>;
  telephoneNumber: Scalars['String'];
};

export type ClientConnection = {
  __typename?: 'ClientConnection';
  edges?: Maybe<Array<ClientEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ClientEdge = {
  __typename?: 'ClientEdge';
  cursor: Scalars['String'];
  node: Client;
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

export type CreateAnalyzesResearchInput = {
  data?: InputMaybe<Scalars['String']>;
  petId: Scalars['String'];
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
  price: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type CreatePetInput = {
  DOB?: InputMaybe<Scalars['DateTime']>;
  alias: Scalars['String'];
  breed?: InputMaybe<Scalars['String']>;
  castration?: InputMaybe<Scalars['Boolean']>;
  clientId: Scalars['String'];
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
  employeeId: Scalars['Int'];
  goodsListReceptionInput?: InputMaybe<Array<GoodsListReceptionInput>>;
  petId: Scalars['String'];
  purposeId: Scalars['Int'];
  serviceListReceptionInput?: InputMaybe<Array<ServiceListReceptionInput>>;
};

export type CreateServiceInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  typeId: Scalars['Int'];
};

export type CreateServiceTypeInput = {
  typeName: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  fullName: Scalars['String'];
  id: Scalars['Int'];
  receptions?: Maybe<Array<Reception>>;
  role?: Maybe<Role>;
};

export type Goods = {
  __typename?: 'Goods';
  GoodsList?: Maybe<Array<GoodsList>>;
  category?: Maybe<GoodsCategory>;
  categoryId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
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
  goodsId: Scalars['Int'];
  quantity: Scalars['Int'];
  receptionId: Scalars['String'];
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
  createService: Service;
  login: Auth;
  refreshToken: Token;
  updateUser: User;
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


export type MutationCreateServiceArgs = {
  data: CreateServiceInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Pet = {
  __typename?: 'Pet';
  DOB?: Maybe<Scalars['String']>;
  alias: Scalars['String'];
  analyzesResearchs?: Maybe<Array<AnalyzesResearch>>;
  breed?: Maybe<Scalars['String']>;
  castration?: Maybe<Scalars['String']>;
  client?: Maybe<Client>;
  clientId?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['DateTime']>;
  diagnosis?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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
  analyzesResearch: AnalyzesResearch;
  clientDetail: Client;
  clientsWithSearch: Array<Client>;
  hello: Scalars['String'];
  helloWorld: Scalars['String'];
  me: User;
  pet: Pet;
  publishedClients: ClientConnection;
  reception: Reception;
};


export type QueryAnalyzesResearchArgs = {
  analyzesResearchId: Scalars['String'];
};


export type QueryClientDetailArgs = {
  clientId: Scalars['String'];
};


export type QueryClientsWithSearchArgs = {
  search: Scalars['String'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};


export type QueryPetArgs = {
  petId: Scalars['String'];
};


export type QueryPublishedClientsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<ClientOrder>;
  skip?: InputMaybe<Scalars['Int']>;
  telephone?: InputMaybe<Scalars['String']>;
};


export type QueryReceptionArgs = {
  receptionId: Scalars['String'];
};

export type Reception = {
  __typename?: 'Reception';
  Employee?: Maybe<Employee>;
  Pet?: Maybe<Pet>;
  Purpose?: Maybe<ReceptionPurpose>;
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
  employeeId?: Maybe<Scalars['Int']>;
  goods?: Maybe<Array<Maybe<GoodsList>>>;
  id: Scalars['String'];
  petId?: Maybe<Scalars['String']>;
  purpose: ReceptionPurpose;
  purposeId?: Maybe<Scalars['Int']>;
  services?: Maybe<Array<Maybe<ServiceList>>>;
};

export type ReceptionPurpose = {
  __typename?: 'ReceptionPurpose';
  id?: Maybe<Scalars['Int']>;
  purposeName: Scalars['String'];
  receptions?: Maybe<Array<Reception>>;
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
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  type: ServiceType;
  typeId?: Maybe<Scalars['Int']>;
};

export type ServiceList = {
  __typename?: 'ServiceList';
  Reception?: Maybe<Reception>;
  Service?: Maybe<Service>;
  quantity: Scalars['Int'];
  receptionId: Scalars['String'];
  service: Service;
  serviceId: Scalars['Int'];
};

export type ServiceListReceptionInput = {
  quantity: Scalars['Int'];
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

export type UpdateUserInput = {
  fullName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  login: Scalars['String'];
  role: Role;
};

export type CurrentUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, fullName?: string | null, login: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: any, user: { __typename?: 'User', id: number, login: string, fullName?: string | null } } };

export type GetClientQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetClientQuery = { __typename?: 'Query', clientsWithSearch: Array<{ __typename?: 'Client', id: string, fullName: string, telephoneNumber: string, pets?: Array<{ __typename?: 'Pet', id: string, alias: string }> | null }> };

export type CreateClientMutationVariables = Exact<{
  data: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, fullName: string, telephoneNumber: string, address?: string | null } };

export type ClientDetailQueryVariables = Exact<{
  clientId: Scalars['String'];
}>;


export type ClientDetailQuery = { __typename?: 'Query', clientDetail: { __typename?: 'Client', id: string, fullName: string, address?: string | null, telephoneNumber: string, pets?: Array<{ __typename?: 'Pet', id: string, alias: string, kind?: string | null, gender?: string | null, DOB?: string | null, breed?: string | null }> | null } };

export type CreatePetMutationVariables = Exact<{
  data: CreatePetInput;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet: { __typename?: 'Pet', id: string, alias: string, kind?: string | null, gender?: string | null, DOB?: string | null, breed?: string | null } };

export type GetPetDetailQueryVariables = Exact<{
  petId: Scalars['String'];
}>;


export type GetPetDetailQuery = { __typename?: 'Query', pet: { __typename?: 'Pet', id: string, alias: string, DOB?: string | null, breed?: string | null, castration?: string | null, color?: string | null, diagnosis?: string | null, gender?: string | null, kind?: string | null, notes?: string | null, nutrition?: string | null, weight?: number | null, receptions?: Array<{ __typename?: 'Reception', id: string, diagnosis?: string | null, createdAt?: any | null, cost?: number | null, purpose: { __typename?: 'ReceptionPurpose', purposeName: string } }> | null, analyzesResearchs?: Array<{ __typename?: 'AnalyzesResearch', id: string, createdAt?: any | null, type: { __typename?: 'TypeAnalyzesResearch', typeName?: string | null } }> | null } };

export type GetAllServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServiceQuery = { __typename?: 'Query', allServices: Array<{ __typename?: 'Service', id?: number | null, name?: string | null, price?: number | null, type: { __typename?: 'ServiceType', id?: number | null, typeName?: string | null } }> };

export type GetAllServiceTypeWithServiceNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServiceTypeWithServiceNameQuery = { __typename?: 'Query', allServiceType: Array<{ __typename?: 'ServiceType', id?: number | null, typeName?: string | null, service?: Array<{ __typename?: 'Service', id?: number | null, name?: string | null, price?: number | null }> | null }> };

export type GetAllGoodsCategoryWithGoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGoodsCategoryWithGoodsQuery = { __typename?: 'Query', allGoodsCategory: Array<{ __typename?: 'GoodsCategory', categoryName?: string | null, goods?: Array<{ __typename?: 'Goods', id?: number | null, name: string, price?: number | null, measure?: string | null, quantity?: number | null }> | null }> };

export type GetAllEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmployeesQuery = { __typename?: 'Query', allEmployees: Array<{ __typename?: 'Employee', id: number, fullName: string }> };

export type GetAllReceptionPurposeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReceptionPurposeQuery = { __typename?: 'Query', allReceptionPurpose: Array<{ __typename?: 'ReceptionPurpose', id?: number | null, purposeName: string }> };

export type CreateReceptionMutationVariables = Exact<{
  data: CreateReceptionInput;
}>;


export type CreateReceptionMutation = { __typename?: 'Mutation', createReception: { __typename?: 'Reception', anamnesis?: string | null, assignment?: string | null, clinicalSigns?: string | null, cost?: number | null, diagnosis?: string | null, employeeId?: number | null, petId?: string | null, purposeId?: number | null } };

export const CurrentUserProfileDocument = gql`
    query currentUserProfile {
  me {
    id
    fullName
    login
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
export const GetClientDocument = gql`
    query GetClient($search: String!) {
  clientsWithSearch(search: $search) {
    id
    fullName
    telephoneNumber
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
  export class GetClientGQL extends Apollo.Query<GetClientQuery, GetClientQueryVariables> {
    override document = GetClientDocument;
    
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
    query ClientDetail($clientId: String!) {
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
    query GetPetDetail($petId: String!) {
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
export const GetAllServiceTypeWithServiceNameDocument = gql`
    query GetAllServiceTypeWithServiceName {
  allServiceType {
    id
    typeName
    service {
      id
      name
      price
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllServiceTypeWithServiceNameGQL extends Apollo.Query<GetAllServiceTypeWithServiceNameQuery, GetAllServiceTypeWithServiceNameQueryVariables> {
    override document = GetAllServiceTypeWithServiceNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllGoodsCategoryWithGoodsDocument = gql`
    query GetAllGoodsCategoryWithGoods {
  allGoodsCategory {
    categoryName
    goods {
      id
      name
      price
      measure
      quantity
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllGoodsCategoryWithGoodsGQL extends Apollo.Query<GetAllGoodsCategoryWithGoodsQuery, GetAllGoodsCategoryWithGoodsQueryVariables> {
    override document = GetAllGoodsCategoryWithGoodsDocument;
    
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