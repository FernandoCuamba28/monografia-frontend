<template>
  <div class="dynamic-tables">
   
   
     <h2 class="page-title">
      Utilizadores
      <div class="float-right">
        <b-button v-b-modal.add variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Utilizador</b-button
        >
      </div>
    </h2>
 <div
      v-if="loading"
      class="d-flex flex-column justify-content-center align-items-center"
      style="margin-top: 17%"
    >
      <div>
        <b-spinner
          variant="normal"
          show
          style="width: 3rem; height: 3rem"
          v-model="loading"
          label="Loading..."
        >
        </b-spinner>
      </div>
      <div class="mt-2">
        <span> A Carregar...</span>
      </div>
    </div>

    
   <div
            v-if="(utilizadores.length <= 0) && (loading==false)"
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <h1>Sem Utilizadores</h1>
            </div>
            <div>
              <img :src="empty" height="450" alt="" />
            </div>
          </div>
    <b-row>
      <b-col lg="3" md="6" xs="12" 
         v-for="utilizador in utilizadores"
              :key="utilizador.id"
      >
       
        <Widget class="widget-padding-sm widget-sm pt-5" bodyClass="widget-body-container">
              <div class="text-center">
              <i class="fal fa-user text-primary fa-3x mb-2"></i>
             

                
                     <h6 class="fw-normal text-primary">{{utilizador.nomeCargo}}</h6>
                 
             
              
              <div class="widget-footer-center">
                <div class="mb-sm">{{utilizador.nome}}</div>
                <div class="mb-sm">{{utilizador.estado}}</div>
                </div>
                
              </div>
              <div class="widget-footer-bottom">
                <p>
                  <button
                   class="btn btn-gray btn-block" @click="verDetalhes(utilizador)">Ver Detalhes</button>
                </p>
              </div>
            </Widget>
            
      </b-col>
</b-row>
    <!-- <Widget>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="utilizador in utilizadores"
              :key="utilizador.id"
            >
              <td>{{ utilizador.nome }}</td>
              <td>
                {{ utilizador.email }}
              </td>
              <td>{{ utilizador.contacto }}</td>
              <td>{{ utilizador.nomeCargo }}</td>
              <td>
                <b-badge variant="info" pill>{{ utilizador.estado }}</b-badge>
              </td>
              <td>{{ utilizador.tipo }}</td>
              
              <td >
                <b-button variant="danger" size="sm"
                  ><i class="fa fa-trash"></i
                ></b-button>
              </td>
              <td>
                <b-button variant="info" size="sm"
                  ><i class="fa fa-eye"></i
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Widget> -->

    <b-modal
      id="add"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Adicionar Utilizador"
      cancel-variant="default"
      ref="add"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
          <b-form @submit="onSubmit">
            <fieldset>
              <b-form-group
                horizontal
                label="Nome:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Nome"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Nome'),
                  }"
                  type="text"
                  id="Nome"
                  v-model="name"
                />
                <span class="text-danger" v-if="errors.has('Nome')">
                  {{ errors.first("Nome") }}
                </span>
              </b-form-group>
             
              <b-form-group
                horizontal
                label="Email:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('email'),
                  }"
                  type="email"
                  id="email"
                  v-model="email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first("email") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Telefone:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="contacto"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('contacto'),
                  }"
                  type="number"
                  id="contacto"
                  v-model="contacto"
                />
                <span class="text-danger" v-if="errors.has('contacto')">
                  {{ errors.first("contacto") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Senha:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Senha"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Senha'),
                  }"
                  type="text"
                  id="Senha"
                  v-model="password"
                />
                <span class="text-danger" v-if="errors.has('Senha')">
                  {{ errors.first("Senha") }}
                </span>
              </b-form-group>
              <b-form-group
              horizontal
              label="Tipo:"
              label-for="default-select"
              :label-cols="3"
            >
              
                  <v-select
                    id="default-select"
                    v-model="tipo"
                    :options="['Admin', 'Operador']"
                  />
                
            </b-form-group>
              <b-form-group
              horizontal
              label="Função:"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Maritial State"
            >
              <v-select
                v-validade="'required'"
                :options="roles"
                label="nome"
                v-model="selectedRole"
              />
            </b-form-group>
            </fieldset>
            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                @click="saveData"
                class="btn-rounded float-right"
              >
                <i class="fa fa-save mr-1"></i>
                 Gravar<b-spinner v-show="process" small></b-spinner>
              </b-button>
              <b-button
                type="button"
                variant="default"
                class="btn-rounded"
                @click="close"
              >
                Cancelar
              </b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-modal>
     <b-modal
      id="ver"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Ver Detalhes"
      cancel-variant="default"
      ref="ver"
    >
    
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
        <span>Erro ao actualizar</span>
      </b-alert>
          <b-form @submit="onSubmit">
            <fieldset>
              <b-form-group
                horizontal
                label="Nome:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Nome"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Nome'),
                  }"
                  type="text"
                  id="Nome"
                  v-model="utilizador.nome"
                />
                <span class="text-danger" v-if="errors.has('Nome')">
                  {{ errors.first("Nome") }}
                </span>
              </b-form-group>
             
              <b-form-group
                horizontal
                label="Email:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('email'),
                  }"
                  type="email"
                  id="email"
                  v-model="utilizador.email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first("email") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Telefone:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="contacto"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('contacto'),
                  }"
                  type="text"
                  id="contacto"
                  v-model="utilizador.contacto"
                />
                <span class="text-danger" v-if="errors.has('contacto')">
                  {{ errors.first("contacto") }}
                </span>
              </b-form-group>
           
              <b-form-group
              horizontal
              label="Tipo:"
              label-for="default-select"
              :label-cols="3"
            >
              
                  <v-select
                    id="default-select"
                    v-model="utilizador.tipo"
                    :options="['Admin', 'Operador']"
                  />
                
            </b-form-group>
              <b-form-group
              horizontal
              label="Cargo:"
              :label-cols="3"
              label-breakpoint="md"
              label-for="Maritial State"
            >
              <v-select
                v-validade="'required'"
                :options="roles"
                label="nome"
                v-model="utilizador.nomeCargo"
              />
            </b-form-group>
            </fieldset>
            <div class="form-action bg-transparent px-0">
              <!-- <b-button
                type="submit"
                variant="success"
                @click="editar"
                class="btn-rounded float-right"
              >
                <i class="fa fa-edit mr-1"></i> Actualizar <b-spinner v-show="process" small></b-spinner>
              </b-button> -->
              <b-button
                type="button"
                variant="danger"
                class="btn-rounded"
                v-if="utilizador.estado=='Activo'"
                @click="activeOrDeactive(utilizador)"
              > <i class="fa fa-lock"></i>
                Desactivar
              </b-button>
              <b-button v-else
                type="button"
                variant="primary"
                class="btn-rounded"
                @click="activeOrDeactive(utilizador)"
              ><i class="fa fa-unlock"></i>
                Activar

              </b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import http from "../../../http-common";
import vSelect from "vue-select";

export default {
  name: "Dynamic",
  components: { Widget, vSelect },
  data() {
    return {
      error:"",
      utilizadores: [],
      name: "",
      email: "",
      password: "",
      tipo: "",
      contacto: "",
      cargo_id: "",
      err: false,
      msg: "",
      roles:[],
      selectedRole:"",
      process: false,
        empty: require("../../assets/noData.png"),
       loading: false,
       utilizador:{
         nome:"",
          id:"",
          nomeCargo:"",
          cargo_id:"",
          email:"",
          tipo:"",
          contacto:"",
          
       }

       ,
    };
  },

  created() {
    this.getData();
    this.getRoles();
  },

  methods: {
     close() {
      this.$refs["add"].hide();
      this.$refs["ver"].hide();
    },
    onSubmit(e) {
      e.preventDefault();
      // console.log(e);
      this.$validator.validateAll();
    },
    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
 this.loading = true;
      setTimeout(function () {
        this.loading = false;
      }, 1000);
      http
        .get("/user", config)
        .then((result) => {
          this.loading = false;
          this.utilizadores = result.data.Users.reverse();
          // console.log(this.utilizadores);
        })
        .catch((error) => {
          error;
           this.loading = false;
        });
    },
     
    async saveData() {
      this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        tipo: this.tipo,
        contacto: this.contacto,
        cargo_id: this.selectedRole.id,
      };
      this.$validator.validateAll();
      await http
        .post("/register", data, config)
        .then((success) => {
          success;
          this.getData();
           this.process = false;
          this.$refs["add"].hide();
          this.name = "",
      this.email= "",
      this.password= "",
      this.tipo= "",
      this.contacto= "",
      this.cargo_id= "",
      this.selectedRole=""
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Utilizador criado com sucesso!",
          });
        })
        .catch((error) => {
          this.process = false;
          this.err = true;
          this.msg = "Erro ao criar utilizador";
        });
    },


 verDetalhes(utilizador) {
      this.utilizador = utilizador;
      this.$refs["ver"].show();
    },
    async editar() {
        this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      // alert(this.utilizador.nome)
      const data = {
        nome: this.utilizador.nome,
        email: this.utilizador.email,
        contacto: this.utilizador.contacto,
        cargo_id: this.role.id,
      };
      // this.$validator.validateAll();
      await http
        .put(`/user/${this.utilizador.id}`, data, config)
        .then((success) => {
            this.process = false;
          success;
          this.getData();
          this.$refs["add"].hide();
          this.name = "",
      this.email= "",
      this.password= "",
      this.tipo= "",
      this.contacto= "",
      this.cargo_id= "",
      this.selectedRole=""
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Utilizador actualizado com sucesso!",
          });
        })
        .catch((error) => {
            this.process = false;
          this.err = true;
          this.msg = "Erro ao criar utilizador";
        });
    },



     activeOrDeactive(utlizador){
            let token = localStorage.getItem("token");
            this.$swal.fire({
                title: 'Você tem certeza??',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0dd9d0',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText:'NÃO'
                }).then((result) => {
                if (result.isConfirmed) {
                    let config = {
                        headers: {
                         authorization: "Bearer " + token,
                        },
                    }
                     http.delete(`user/${this.utilizador.id}`,config)
                    .then((success) =>{
                        success
                        this.getData()
                        this.$refs["ver"].hide();
                        this.loading=false
                        this.$swal.fire({
                        icon: 'success',
                        confirmButtonColor: '#0dd9d0',
                        title:'Sucesso!',
                    })
                    }).catch((err) =>{
                        err
                    })
                    
                }
              })
        },

   getRoles() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/cargo", config)
        .then((result) => {
          this.roles = result.data.Cargos;
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style src="./Dynamic.scss" lang="scss" />
