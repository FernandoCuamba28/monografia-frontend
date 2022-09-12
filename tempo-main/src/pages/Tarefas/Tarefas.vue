<template>
  <div class="widgets-page">
     <h2 class="page-title">
      Tarefas

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
            v-if="(assistencias.length <= 0) && (loading==false)"
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <h1>Sem Tarefas Pendentes</h1>
            </div>
            <div>
              <img :src="empty" height="450" alt="" />
            </div>
          </div>
    <b-row >
      <b-col
        lg="3"
        md="6"
        xs="12"
        v-for="assistencia in assistencias"
        :key="assistencia.id"
      >
        <Widget
          class="widget-padding-sm widget-sm pt-5"
          bodyClass="widget-body-container"
        >
          <div class="text-center">
            <i class="fal fa-thumbtack text-primary fa-3x"></i>
            
              <h6 class="fw-normal">{{ assistencia.prazo }}</h6>
            

            <div class="widget-footer-center" style="overflow: hidden;">
              <div class="mb-md"> {{ assistencia.descricao }}</div>
            </div>
          </div>
          <div class="widget-footer-bottom mt-2">
            <p>
              <b-button
                :to="{
                  name: 'DetalhesTarefa',
                  params: { tarefaId: assistencia.id },
                }"
                class="btn btn-gray btn-block"
                >Ver Detalhes</b-button>
                
            </p>
          </div>
        </Widget>
      </b-col>
    </b-row>

    
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import http from "../../../http-common";
import vSelect from "vue-select";

export default {
  name: "Widgets",
  components: {
    Widget,
    vSelect,
  },
  data() {
    return {
        loading: false,
      descricao: "",
      prazo: "",
      dossier_id: "",
      responsavel_id: "",
      assistencias: [],
      titulo: "",
      tipo_servico: "",
      cliente_id: "",
      err: "",
      msg: "",
       empty: require("../../assets/noData.png"),
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
        .get("/assistenciaPendentes", config)
        .then((result) => {
          this.assistencias = result.data.Assistencia;
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


<style src="./Tarefas.scss" lang="scss" scoped />
