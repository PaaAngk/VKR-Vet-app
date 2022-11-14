import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { User, UserAuthInfo } from "@/core/types/user.types";
import JwtService from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";

export const useUserStore = defineStore("user", {
  state: () : UserAuthInfo => {
    return {
      errors : {},
      user : {} as User,
      isAuthenticated : !!JwtService.getToken()
    }
  },

  getters: {
    /**
     * Get current user object
     * @returns User
     */
    currentUser(state) : User{
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
    }
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
      return ApiService.post("login", credentials)
        .then(({ data }) => {
          this.set_auth(data);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },

    logout() {
      this.purge_auth()
    },

    VERIFY_AUTH(payload) {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("verify_token", payload)
          .then(({ data }) => {
            this.context.commit(Mutations.SET_AUTH, data);
          })
          .catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR, response.data.errors);
            this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        this.context.commit(Mutations.PURGE_AUTH);
      }
    },

  }



});
