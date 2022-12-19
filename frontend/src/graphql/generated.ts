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
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
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

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  login: Auth;
  refreshToken: Token;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
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

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  helloWorld: Scalars['String'];
  me: User;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Doctor = 'DOCTOR',
  Manager = 'MANAGER'
}

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
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