<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Connect Plus
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login</h3>" customHeader>
        <!-- <p class="widget-auth-info">
          <img :src="img" class="img-logo" width="60" max-width="20" max-height="20" />
        </p>
         -->
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" v-model="err" dismissible>
            {{ msg }}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="email" required type="email" name="email" placeholder="Email" v-model="email" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password" required type="password" name="password" placeholder="Senha" v-model="senha" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="info" @click="login">
            Login
            <b-spinner v-show="process" small></b-spinner>
            </b-button>
          
        </form>
        <!-- <p class="widget-auth-info">
         Nao tem uma conta? Cadastre-se!
        </p> -->
        <!-- <router-link class="d-block text-center" to="register">Crie uma conta</router-link> -->
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2022 &copy; Tempo de atedimento - Made by <a href="https://connectplus.co.mz/">Connect Plus</a>
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import http from '../../../../http-common'

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      // img: require("../../../assets/khuma-logo2.png"),
      email: "",
      password: "",
      msg: "",
      err: false,
      process: false,
      type: 'password',
    };
  },
  methods: {
  


    login() {
      this.process = true;
      let data = {
        email: this.email,
        password: this.senha,
      };
      http
        .post('/login', data)
        .then((success) => {
          success;

            localStorage.setItem('user', JSON.stringify(success.data.data.user));
            localStorage.setItem("token", success.data.data.token);
          console.log(success.data.data.token)
          this.$router.push({ name: 'Estatistica' })
          .catch(error => {
   console.info(error.message)
})
        })
        .catch((error) => {
          error;
          this.process = false;
          this.err = true;
          this.msg = "Senha ou email incorrento"
        });
    },
    
  },
};
</script>
