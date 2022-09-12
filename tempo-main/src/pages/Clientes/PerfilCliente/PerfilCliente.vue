<template>
  <div class="widgets-page">
    <h2 class="page-title">
      Cliente
      <small>{{ cliente.nome }}</small>
      <div class="float-right" >
        <b-button v-if="cliente.estado=='Activo'" v-b-modal.add variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Dossier</b-button
        >
        <b-button v-else @click="alerta" variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar  Dossier</b-button
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
    <b-row v-else class="d-flex justify-content-center">
      <b-col lg="4" xs="12">
        <Widget class="widget-padding-md widget-md">
          <div class="d-flex justify-content-end align-items-center mt-0">
            <b-nav>
              <b-nav-item-dropdown
                class="settingsDropdown d-sm-down-none"
                no-caret
                right
              >
                <template slot="button-content">
                  <i class="fas fa-ellipsis-h fa-x"></i>
                </template>
                <b-dropdown-item-button class="text-success" v-b-modal.edit>
                  <i class="fa fa-edit text-success"></i>
                  Editar
                </b-dropdown-item-button>
                <b-dropdown-item-button v-if="cliente.estado=='Activo'" @click="activeOrDeactive(cliente)">
                  <i class="fa fa-lock text-danger"></i>
                  Desactivar
                </b-dropdown-item-button>
                  <b-dropdown-item-button v-else @click="activeOrDeactive(cliente)">
                  <i class="fa fa-unlock text-success"></i>
                  Activar
                </b-dropdown-item-button>
              </b-nav-item-dropdown>
            </b-nav>
          </div>
          <div class="text-center mb-3">
            <i class="fad fa-user-tie fa-7x text-primary"></i>
          </div>

          <b-list-group>
            <b-list-group-item
              class="d-flex justify-content-between align-items-left"
            >
              Cliente:
              <span>{{ cliente.nome }}</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Endereco:
              <span>{{ cliente.endereco }}</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Telefone:
              <span>{{ cliente.contacto }}</span>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Email:
              <span>{{ cliente.email }}</span>
            </b-list-group-item>
             <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Estado:
              <span>{{ cliente.estado }}</span>
            </b-list-group-item>
          </b-list-group>
        </Widget>
      </b-col>

      
    </b-row>
    <b-row>
      <b-col lg="3" md="6" xs="12" v-for="dossier in dossies" :key="dossier.id">
        <Widget class="widget-padding-sm" bodyClass="widget-body-container">
          <div class="text-center">
            <i class="fad fa-folders text-primary fa-4x"></i>

            <b-button
              v-b-tooltip.hover
              :title="' Visualizar ' + dossier.titulo"
              block
              variant="outlined"
              size="sm"
              :to="{ name: 'Dossier', params: { dossierId: dossier.id } }"
            >
              <h4 class="fw-normal">{{ dossier.titulo }}</h4>
            </b-button>

            <div class="widget-footer-center">
              <div class="mb-sm">{{ dossier.tipo_servico }}</div>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
     <b-modal
      id="edit"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Actualizar Clientes"
      cancel-variant="default"
      ref="edit"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
        <span>Erro ao Actualizar</span>
      </b-alert>
          <b-form @submit.prevent="">
            <fieldset>
              <b-form-group
                horizontal
                label="Nome"
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
                  v-model="cliente.nome"
                />
                <span class="text-danger" v-if="errors.has('Nome')">
                  {{ errors.first("Nome") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Telefone"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Telefone"
              >
                <input
                  v-validate="'required|numeric'"
                  name="Telefone"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Telefone'),
                  }"
                  type="text"
                  id="Telefone"
                  v-model="cliente.contacto"
                />
                <span class="text-danger" v-if="errors.has('Telefone')">
                  {{ errors.first("Telefone") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Email"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Email"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Email'),
                  }"
                  type="text"
                  id="Email"
                  v-model="cliente.email"
                />
                <span class="text-danger" v-if="errors.has('Email')">
                  {{ errors.first("Email") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Endereco"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Endereco"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Endereco'),
                  }"
                  type="text"
                  id="Endereco"
                  v-model="cliente.endereco"
                />
                <span class="text-danger" v-if="errors.has('Endereco')">
                  {{ errors.first("Endereco") }}
                </span>
              </b-form-group>
            </fieldset>
            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                @click="edit"
                class="btn-rounded float-right"
              >
                <i class="fa fa-edit mr-1"></i> Actualizar
                <b-spinner v-show="process" small></b-spinner>
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
      id="add"
      size="md"
      title="Adicionar Dossier"
      body-bg-variant="white"
      hide-footer
      ref="add"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-form>
            <b-alert show dismissible variant="danger" v-model="err">
              <span>{{ msg }}</span>
            </b-alert>
            <fieldset>
              <b-form-group
                horizontal
                label="Titulo:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Titulo"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Titulo'),
                  }"
                  type="text"
                  id="Titulo"
                  v-model="titulo"
                />
                <span class="text-danger" v-if="errors.has('Titulo')">
                  {{ errors.first("Titulo") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Tipo de Serviço:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Tipo de Serviço"
              >
                <input
                  v-validate="'required'"
                  name="Tipo de Serviço"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('servico'),
                  }"
                  type="text"
                  id="servico"
                  v-model="tipo_servico"
                />
                <span class="text-danger" v-if="errors.has('servico')">
                  {{ errors.first("servico") }}
                </span>
              </b-form-group>
            </fieldset>
            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                @click.prevent="saveData"
                class="btn-rounded float-right"
              >
                <i class="fa fa-save mr-1"></i> Gravar
                <b-spinner v-show="process" small></b-spinner>
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
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import http from "../../../../http-common";

export default {
  name: "Widgets",
  components: {
    Widget,
  },
  data() {
    return {
      cliente: [],
      titulo: "",
      tipo_servico: "",
      cliente_id: "",
      err: false,
      msg: "",
      dossies: [],
      loading: false,
      process: false,
      clinete:[
        {
          nome:"",
          contacto:"",
          email:"",
          endereco:"",
        }
      ]
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    close() {
      this.$refs["add"].hide();
    },
    initialize() {
      this.getData();
      this.getDossier();
    },
    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get(`/cliente/${this.$route.params.clienteId}`, config)
        .then((result) => {
          this.cliente = result.data.Clientes;
        })
        .catch((error) => {
          error;
        });
    },

    alerta(){
this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "info",
            title: "Falha",
            text: "Habilite o cliente para adicionar dossier!",
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
        titulo: this.titulo,
        tipo_servico: this.tipo_servico,
        cliente_id: this.cliente.id,
      };
      await http
        .post("/dossier", data, config)
        .then((success) => {
          this.process = false;
          success;
          this.getData();
          this.getDossier();
          this.loading=false,
          this.$refs["add"].hide();
          this.titulo="",
        this.tipo_servico="",
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Dossier Criado com Sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao gravar";
        });
    },
activeOrDeactive(cliente){
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
                     http.delete(`cliente/${this.cliente.id}`,config)
                    .then((success) =>{
                        success
                        this.getData()
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

async edit() {
  this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        nome: this.cliente.nome,
        endereco: this.cliente.endereco,
        contacto: this.cliente.contacto,
        email:this.cliente.email,

      };
      await http
        .put(`/cliente/${this.cliente.id}`,data, config)
        .then((success) => {
          success;
          this.getData();
         this.process = false;
          this.$refs["edit"].hide();
 
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Cliente actualizado com Sucesso!",
          })
          this.cliente.nome="",
        this.cliente.endereco="",
     this.cliente.contacto="",
        this.cliente.email=""
          ;
         
        })
        .catch((error) => {
          this.process = false;
          this.err = true;
        });
    },
    getDossier() {
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
        .get(`/cliente/dossier/${this.$route.params.clienteId}`, config)
        .then((result) => {
          this.dossies = result.data.Dossiers.reverse();
          this.loading = false;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },
  },
};
</script>


<style src="./DetailIndividual.scss" lang="scss" scoped />
