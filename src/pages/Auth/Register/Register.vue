<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-gray"></i>
       Connect Beta
        <i class="fa fa-circle text-warning"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Crie uma conta</h3>" customHeader>
        <p class="widget-auth-info">
          Por favor preencha todos os campos
        </p>
        <form class="mt" @submit.prevent="register">
          <b-alert class="alert-sm" variant="danger" v-model="err" dismissible>
            {{msg}}
          </b-alert>
           <div class="form-group">
            <input class="form-control no-border"
                   ref="Nome" type="text" required name="nome"
                   placeholder="Nome" v-model="nome"/>
          </div>
           <div class="form-group">
            <input class="form-control no-border"
                   ref="apelido" type="text" required name="apelido"
                   placeholder="Apelido" v-model="apelido"/>
          </div>
           <div class="form-group">
            <input class="form-control no-border"
                   ref="telefone" type="text" required name="telefone"
                   placeholder="Telefone" v-model="telefone"/>
          </div>
          <div class="form-group">
            <input class="form-control no-border"
                   ref="email" type="email" required name="email"
                   placeholder="Email" v-model="email"/>
          </div>
          <div class="form-group">
            <input class="form-control no-border"
                   ref="password" type="password" required name="password"
                   placeholder="Senha" v-model="senha"/>
          </div>
          <!-- <div class="form-group">
            <input class="form-control no-border"
                   ref="confirmPassword" @blur="checkPassword" type="password" required
                   name="confirmPassword"
                   placeholder="Confirm"/>
          </div> -->
          <b-button type="submit" variant="inverse" class="auth-btn mb-3" size="sm" @click="register">Registrar</b-button>
         
        </form>
        <p class="widget-auth-info">
          Ja tem uma conta? Faca login!
        </p>
        <router-link class="d-block text-center" to="login">Entrar com sua conta</router-link>
      </Widget>
    </b-container>
    <!-- <footer class="auth-footer">
      2019 &copy; Sing App - React Admin Dashboard Template.
    </footer> -->
  </div>
</template>
<script>
  import Widget from '../../../components/Widget/Widget';
    import http from '../../../../http-common'

  export default {
    name: 'RegisterPage',
    components: {Widget},
    data(){
      return{
        process:false,
        nome:'',
        apelido: '',
        senha: '',
        email: '',
        telefone:'',
        err:false,
        msg:'',
      }
    },
   
    methods: {
        async register(){
          this.process=true;
          const data = {
            nome: this.nome,
            apelido: this.apelido,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
            role:'1',
            
          }
          this.$validator.validateAll();
          await http.post('/usuario',data)
          .then((success)=>{
            success
            localStorage.setItem('user', JSON.stringify(data));
            // console.log('teste'+ localStorage.getItem('user'))
            this.$router.push('/login')
          }).catch((error)=>{
            error
            this.process=false
            this.err = true
            this.msg = error.response.data.message

            // console.error(this.msg = error.response.data.message)
          }
        )
        },  
    },
  }
</script>