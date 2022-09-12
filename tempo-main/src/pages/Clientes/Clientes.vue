<template>
  <div class="dynamic-tables">
    <h2 class="page-title">
      Clientes

      <div class="float-right">
        <b-button
          v-if="userRole == 'Admin'"
          variant="success"
          class="width-100 mb-3 mr-3"
          v-b-modal.add
          >Adicionar</b-button
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
    <div v-else>
      <b-row v- class="mb-2">
        <b-col md="9"></b-col>
        <b-col md="3">
          <input
            class="form-control"
            v-model="filters.name.value"
            placeholder="Pesquisar"
          />
        </b-col>
      </b-row>
      <Widget>
        <div class="table-responsive">
          <v-table
            class="table table-hover"
            :filters="filters"
            :data="clientes"
            :currentPage.sync="currentPage"
            :pageSize="10"
            @totalPagesChanged="totalPages = $event"
          >
            <thead slot="head">
              <tr>
                <th>Instituição</th>
                <th>Contacto</th>
                <th>Email</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody slot="body" slot-scope="{ displayData }">
              <tr
                style="font-size: 16px"
                v-for="row in displayData"
                :key="row.id"
              >
                <td>
                  <b-button
                    v-b-tooltip.hover
                    :title="' Visualizar ' + row.nome"
                    block
                    variant="outlined"
                    size="sm"
                    :to="{
                      name: 'PerfilCliente',
                      params: { clienteId: row.id },
                    }"
                    style="font-size: 16px; text-align: left"
                  >
                    <a href=""> {{ row.nome }} </a>
                  </b-button>
                  <!-- {{ cliente.nome }}</td> -->
                </td>

                <td>{{ row.contacto }}</td>
                <td>{{ row.email }}</td>
                <td>
                  {{ row.endereco }}
                </td>
                <!-- <td>
                <b-button variant="danger" class="mr-3" size="sm"
                  ><i class="fa fa-trash"></i
                ></b-button>
                <b-button
                  variant="info"
                  size="sm"
                  :to="{
                    name: 'PerfilCliente',
                    params: { clienteId: cliente.id },
                  }"
                  ><i class="fa fa-eye"></i
                ></b-button>
              </td> -->
              </tr>
            </tbody>
          </v-table>
          <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
          />
        </div>
      </Widget>
    </div>

    <div
      v-if="clientes.length <= 0 && loading == false"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <div>
        <h1>Sem Clientes</h1>
      </div>
      <div>
        <img :src="empty" height="450" alt="" />
      </div>
    </div>
    <b-modal
      id="add"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Adicionar Clientes"
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
                  v-model="nome"
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
                  type="number"
                  id="Telefone"
                  v-model="contacto"
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
                  v-model="email"
                />
                <span class="text-danger" v-if="errors.has('Email')">
                  {{ errors.first("Email") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Endereço"
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
                  v-model="endereco"
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
                @click="saveData"
                class="btn-rounded float-right"
              >
                <i class="fa fa-save mr-1"></i> Gravar <b-spinner v-show="process" small></b-spinner>
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
import http from "../../../http-common";
import SmartTable from "vuejs-smart-table";

export default {
  name: "clientes",
  components: { Widget, SmartTable },
  data() {
    return {
      clientes: [],
      nome: "",
      contacto: "",
      email: "",
      endereco: "",
process: false,
      msg: "",
      err: false,
      currentPage: 1,
      totalPages: 0,
      userRole: "",
      loading: false,
      empty: require("../../assets/noData.png"),
      filters: {
        name: { value: "", keys: ["nome"] },
      },
      currentPage: 1,
      totalPages: 0,
    };
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getData();
      this.getCurrentUser();
    },
    close() {
      this.$refs["add"].hide();
    },
    onSubmit(e) {
      e.preventDefault();
      console.log(e);
      this.$validator.validateAll();
    },

    getCurrentUser() {
      let authUser = localStorage.getItem("user");
      var authUserObject = JSON.parse(authUser);
      this.userRole = authUserObject.tipo;
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
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
        .get("/cliente", config)
        .then((result) => {
          this.clientes = result.data.Clientes.reverse();
          this.loading = false;
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
        nome: this.nome,
        endereco: this.endereco,
        contacto: this.contacto,
        email: this.email,
      };
      this.$validator.validateAll();
      await http
        .post("/cliente", data, config)
        .then((success) => {
          success;
           this.process = false;
          this.getData();
          this.loading=false;
          this.$refs["add"].hide();
          this.nome = "",
            this.contacto = "",
            this.email = "",
            this.endereco = "",
            this.$swal({
              success: true,
              position: "center",
              showConfirmButton: false,
              timer: 3000,

              icon: "success",
              title: "Sucesso",
              text: "Cargo criado!",
            });
        })
        .catch((error) => {
          this.process = false;
          this.err = true;
          this.msg = "Erro ao criar cliente";
        });
    },
  },
};
</script>

<style src="./Dynamic.scss" lang="scss" />
