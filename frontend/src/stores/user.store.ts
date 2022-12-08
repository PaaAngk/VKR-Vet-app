import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import { User, UserAuthInfo } from "@/core/types/user.types";
import JwtService from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";

export enum Role {
  Admin,
  Doctor,
}

interface User {
  username: string;
  // role: Role;
}

interface UserAuthInfo {
  errors: any;
  user: User;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserAuthInfo => {
    return {
      errors: {},
      user: {} as User,
      isAuthenticated: !!JwtService.getToken(),
    };
  },

  getters: {
    /**
     * Get current user object
     * @returns User
     */
    currentUser(state): User {
      return state.user;
    },

    /**
     * Verify user authentication
     * @returns boolean
     */
    isUserAuthenticated(): boolean {
      return this.isAuthenticated;
    },

    /**
     * Get authentification errors
     * @returns array
     */
    getErrors() {
      return this.errors;
    },
  },
  actions: {
    setAuth(user) {
      this.isAuthenticated = true;
      this.user = user;
      this.errors = {};
      JwtService.saveToken(user.api_token);
    },

    purgeAuth() {
      this.isAuthenticated = false;
      this.user = {} as User;
      this.errors = [];
      JwtService.destroyToken();
    },

    login(credentials) {
      console.log(credentials)
      return ApiService.post("auth/login", credentials)
        .then(({ data }) => {
          this.setAuth(data);
          console.log(data);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
          console.log(response.data.errors);
        });
    },

    logout() {
      console.log('sdfsdf')
      this.purgeAuth();
    },

    verifyAuth(payload) {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("profile", payload)
          .then(({ data }) => {
            this.setAuth(data);
          })
          .catch(({ response }) => {
            this.error(response.data.errors);
            this.purgeAuth();
          });
      } else {
        this.purgeAuth();
      }
    },
  },
});
