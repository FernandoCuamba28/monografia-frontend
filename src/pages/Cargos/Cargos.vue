<template>
  <div class="dynamic-tables">
    <h1 class="page-title">
      Categorias
      <div class="float-right">
        <b-button v-b-modal.add variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Categoria</b-button
        >
      </div>
    </h1>
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
    <Widget v-else>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Função</th>
              <th>Preço/Hora(USD)</th>
              <th>Preço/Hora(MZN)</th>
              <!-- <th>Estado</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="cargo in cargos" :key="cargo.id">
              <td>{{ cargo.nome }}</td>
              <td>{{ cargo.preco }}</td>
              <td>{{ cargo.preco * 65 }}</td>
              <td>
                <!-- <b-badge variant="info" pill>{{ cargo.estado }}</b-badge> -->
              </td>
              <td>
                <b-button
                  variant="inline"
                  @click="open(cargo)"
                  class="mr-3"
                  size="sm"
                  ><i class="fa fa-edit fa-2x text-success"></i
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Widget>

    <div
            v-if="(cargos.length <= 0) && (loading==false)"
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <h1>Sem Cargos</h1>
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
      title="Adicionar Cargos"
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
                label="Preço"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Preço"
              >
                <input
                  v-validate="'required|numeric'"
                  name="Preço"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Preço'),
                  }"
                  type="number"
                  id="Preço"
                  v-model="preco"
                />
                <span class="text-danger" v-if="errors.has('Preço')">
                  {{ errors.first("Preço") }}
                </span>
              </b-form-group>
            </fieldset>
            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                @click="saveData"
                class="btn-rounded float-right"
              > <i class="fa fa-save"></i>
                Gravar <b-spinner v-show="process" small></b-spinner>
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
      id="edit"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Editar Cargos"
      cancel-variant="default"
      ref="edit"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
            <span>Erro ao editar</span>
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
                  v-model="cargo.nome"
                />
                <span class="text-danger" v-if="errors.has('Nome')">
                  {{ errors.first("Nome") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Preço"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Preço"
              >
                <input
                  v-validate="'required|numeric'"
                  name="Preço"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Preço'),
                  }"
                  type="number"
                  id="Preço"
                  v-model="cargo.preco"
                />
               
                <span class="text-danger" v-if="errors.has('Preço')">
                  {{ errors.first("Preço") }}
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
                <i class="fa fa-edit mr-1"></i> Actualizar <b-spinner v-show="process" small></b-spinner>
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

export default {
  name: "Cargos",
  components: { Widget },
  data() {
    return {
      cargos: [],
      nome: "",
      preco: "",
      msg: "",
      err: false,
      process: false,
      loading: false,
      empty: require("../../assets/noData.png"),
      cargo:[{
        preco:'',
        nome:'',
        id:'',
      }]
    };
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getData();
    },
    close() {
      this.$refs["add"].hide();
      this.$refs["edit"].show();
    },
    onSubmit(e) {
      e.preventDefault();
      console.log(e);
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
        .get("/cargo", config)
        .then((result) => {
          this.cargos = result.data.Cargos.reverse();
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
        preco: this.preco,
      };
      this.$validator.validateAll();
      await http
        .post("/cargo", data, config)
        .then((success) => {
          this.process = false;
          success;
          this.getData();
          this.$refs["add"].hide();
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
          this.msg = "Erro ao criar cargo";
        });
    },

    open(cargo) {
      this.$refs["edit"].show();
        this.cargo = cargo;
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
        nome: this.cargo.nome,
        preco: this.cargo.preco,
      };
      this.$validator.validateAll();
      await http

        .put(`/cargo/${this.cargo.id}`,data, config)
        .then((success) => {
          this.process = false;
          success;
          this.getData();
          this.loading = false;
          this.$refs["edit"].hide();
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Cargo actualizado com sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao ao actualizar cargo";
        });
    },
  },
};
</script>

<style src="./Dynamic.scss" lang="scss" />
