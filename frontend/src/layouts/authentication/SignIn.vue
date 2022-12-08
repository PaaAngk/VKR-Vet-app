<template>
  <div
    class="flex flex-col flex-auto h-full items-center justify-center sign-in"
  >
    <div class="w-auto py-4 px-2 rounded-2xl bg-white">
      <div class="w-80 text-center">
        <!-- Title -->
        <div
          class="mb-6 text-4xl font-extrabold tracking-tight leading-tight justify-center"
        >
          Вход
        </div>
        <form @submit.prevent="handleSubmit" class="p-fluid">
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="username"
                v-model="v$.username.$model"
                :class="{ 'p-invalid': v$.username.$invalid && submitted }"
              />
              <label
                for="username"
                :class="{ 'p-error': v$.username.$invalid && submitted }"
                >Имя пользователя</label
              >
            </div>
            <small v-if="v$.username.$invalid && submitted" class="p-error">
              Необходимо ввести имя пользователя
            </small>
          </div>
          <div class="field mt-6">
            <div class="p-float-label">
              <Password
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                :feedback="false"
                :toggleMask="true"
              />
              <label
                for="username"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Пароль</label
              >
            </div>
            <small v-if="v$.password.$invalid && submitted" class="p-error">
              Необходимо ввести пароль
            </small>
          </div>

          <Button
            :disabled="submitted"
            type="submit"
            label="Войти"
            class="mt-2 bg-blue-600"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
// import { Actions } from "@/store/enums/StoreEnums";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user.store";

export default {
  name: "sign-in",
  components: {},
  setup() {
    const store = useUserStore();
    const router = useRouter();

    const submitted = ref(false);
    const state = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: { required },
      password: { required },
    };

    const v$ = useVuelidate(rules, state);

    const handleSubmit = async (form) => {
      submitted.value = true;

      if (v$.value.$invalid) {
        return;
      }
      // Clear existing errors
      store.logout();

      console.log(await store.login(Object(state)));
    };

    return { state, v$, submitted, handleSubmit };
  },
};
</script>

<style>
.sign-in {
  background-image: url("@/assets/img/9zly_8ztc_210511.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
