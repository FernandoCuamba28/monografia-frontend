<template>

  <div class="widgets-page">
    
    <h4 class="page-title" >
      Dossier
      <small>{{ dossier.titulo }}</small>
      <div class="float-right">
        <b-button  v-if="dossier.estado_cliente=='Activo'" v-b-modal.add variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Tarefa</b-button
        >
        <b-button v-else @click="alerta" variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar  Tarefa</b-button
        >
      </div>
    </h4>

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
      <b-col lg="6" xs="12" class="justify-content-around">
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
                <b-dropdown-item-button class="text-success" @click="abrirDossier(dossier)">
                  <i class="fa fa-edit text-success"></i>
                  Editar
                </b-dropdown-item-button>
                <!-- <b-dropdown-item-button>
                  <i class="fa fa-trash text-danger"></i>
                  Apagar
                </b-dropdown-item-button> -->
              </b-nav-item-dropdown>
            </b-nav>
          </div>
          <div class="text-center mb-3">
            <!-- <i class="fad fa-folders  fa-7x"></i> -->
            <i class="fad fa-tasks fa-7x"></i>
          </div>

          <b-list-group>
             <b-list-group-item
              class="d-flex justify-content-between align-items-left"
            >
              Cliente:
              <span>{{ dossier.cliente_nome }}</span>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Dossier:
              <span>{{ dossier.titulo }}</span>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Tipo de Serviço:
              <span>{{ dossier.tipo_servico }}</span>
            </b-list-group-item>
          

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Criado por:
              <span>{{ dossier.criado_por}}</span>
              
            </b-list-group-item>
          </b-list-group>
        </Widget>
      </b-col>
   
      <b-col lg="12" md="12">
        <Widget class="widget-padding-lg ">
          <b-row>
             <b-col md="6" lg="4">
               
              <b-form-group
                horizontal
                label="Periodo de:"
                :label-cols="5"
                label-breakpoint="lg"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="inicio"
                class="form-control"
                  type="date"
                  
                  v-model="data_inicial"
                />
                
              </b-form-group>
            </b-col>
            <b-col md="6" lg="4">
              <b-form-group
                horizontal
                label="a:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="fim"
                  class="form-control"
                  type="date"
                  v-model="data_final"
                />
                
              </b-form-group>
             
            </b-col>
            
            <b-col md="6" lg="2">
              <b-button @click="getAssistencias" block variant="success">
                <i class="fa fa-filter"></i>
               Filtrar
              </b-button>
            </b-col>             
             <b-col md="6" lg="2">
              <b-button @click="limpar" block variant="gray">
                <i class="fa fa-trash"></i>
                limpar
              </b-button>
              
            </b-col>
          </b-row>
        </Widget>
      </b-col>
  
      <b-col lg="12" xs="12">
        <Widget class="widget-padding-lg text-white">
          <b-row>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead style="font-size:12px">
                  <tr>
                    <th>código</th>
                    <th>Data Inicial</th>
                    <th class="hidden-sm-down d-print-none">Data Final</th>

                    <th class="hidden-sm-down d-print-none">Descrição</th>
                    <th>Tipo de atendimento</th>
                    <th>duração</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="assistencia in assistencias" :key="assistencia.id">
                    <td>{{ assistencia.codigo }}</td>

                    <td>{{ assistencia.data_inicial }}</td>
                    <td>{{ assistencia.data_final }}</td>

                    <td class="hidden-sm-down d-print-none">
                      {{ assistencia.descricao }}
                    </td>
                    <td>{{ assistencia.tipo_atendimento }}</td>
                    <td>
                      {{ convertHMS(assistencia.duracao) }}
                    </td>

                    
                    <td>
                      <b-button size="sm" variant="outile"
                   @click="abrirAssistencia(assistencia)"
                        ><i class="fa fa-edit fa-2x text-success"></i
                      ></b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-row>
        </Widget>
        <h2 class="page-title" >
      <div class="float-right">
                 
           
             <b-button
              style="color: white"
              @click="exportPDF"
              variant="primary"
              class="mr-2"
              
            >
              <i class="fa fa-print" />
              &nbsp;&nbsp; Imprimir
            </b-button>
             <b-button
              style="color: white"
              @click="exportSemTotal"
              variant="primary"
              class="mr-2"
            
            >
              <i class="fa fa-print" />
              &nbsp;&nbsp; Imprimir sem o total
            </b-button>
               </div>
 </h2>
      </b-col>
 
    </b-row>
    <b-row>
      <b-col lg="3" md="6" xs="12" v-for="dossier in dossies" :key="dossier.id">
        <a
          :href="{
            name: 'Dossier',
            params: { dossierId: dossier.id },
          }"
          style="text-decoration: none; color: inherit"
        >
          <Widget class="widget-padding-sm" bodyClass="widget-body-container">
            <div class="text-center">
              <i class="fad fa-folders text-secondary fa-4x"></i>

              <h4 class="fw-normal">{{ dossier.titulo }}</h4>

              <div class="widget-footer-center">
                <div class="mb-sm">{{ dossier.tipo_servico }}</div>
              </div>
            </div>
          </Widget>
        </a>
      </b-col>
    </b-row>
 
  <b-modal
      id="edit"
      size="md"
      title="Actualizar Assistencia"
      body-bg-variant="white"
      hide-footer
      ref="edit"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
          <b-form>
            <fieldset>
              <!-- <b-form-group
                horizontal
                label="Data Inicial:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  name="Data Inicial"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Data Inicial'),
                  }"
                  type="date"
                  id="Data Inicial"
                  v-model="assistencia.data_inicial"
                   
                />
                
              </b-form-group>
              <b-form-group
                horizontal
                label="Data Final:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Data Final"
              >
                <input
                  name="Data Final"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Data Final'),
                  }"
                  type="datetime-local"
                  id="Titulo"
                  v-model="assistencia.data_final"
                />
                
              </b-form-group> -->
              <b-form-group
                horizontal
                label="Tipo de atendimento:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Tipo de Serviço"
              >
                <v-select
                  id="default-select"
                  v-model="assistencia.tipo_atendimento"
                  :options="[
                    'Remoto',
                    'Presencial(Operador)',
                    'Presencial(Cliente)',
                  ]"
                />
                <span class="text-danger" v-if="errors.has('servico')">
                  {{ errors.first("servico") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Valor extra:"
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
                  type="number"
                  id="servico"
                  v-model="assistencia.valor_extra"
                />
                <span class="text-danger" v-if="errors.has('servico')">
                  {{ errors.first("servico") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Despesas Adicionais:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Tipo de Serviço"
              >
                <b-form-textarea
                  v-model="assistencia.despesasAdicionais"
                  :rows="3"
                  id="default-textarea"
                />
                <span class="text-danger" v-if="errors.has('servico')">
                  {{ errors.first("servico") }}
                </span>
              </b-form-group>
            </fieldset>
            <fieldset>
              <b-form-group
                horizontal
                label="Descrição:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                
                <b-form-textarea
                 name="Descrição"
                v-validate="'required'"
                  v-model="assistencia.descricao"
                  :rows="3"
                    id="default-textarea"
                
                />
                <span class="text-danger" v-if="errors.has('Descrição')">
                  {{ errors.first("Descrição") }}
                </span>
              </b-form-group>
              
            </fieldset>
          </b-form>
          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              @click="editarAssistencia"
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
        </b-col>
      </b-row>
      
    </b-modal>

  <b-modal
      id="editarDossier"
      size="md"
      title="Actualizar Dossier"
      body-bg-variant="white"
      hide-footer
      ref="editarDossier"
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
                  v-model="dossier.titulo"
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
                  v-model="dossier.tipo_servico"
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
                @click.prevent="editarDossier"
                class="btn-rounded float-right"
              >
                <i class="fa fa-save mr-1"></i> Actualizar
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
      title="Adicionar Tarefa"
      body-bg-variant="white"
      hide-footer
      ref="add"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-alert show dismissible variant="danger" v-model="err">
        <span>{{ msg }}</span>
      </b-alert>
          <b-form>
            <fieldset>
              <b-form-group
                horizontal
                label="Descrição:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                
                <b-form-textarea
                 name="Descrição"
                v-validate="'required'"
                  v-model="descricao"
                  :rows="3"
                    id="default-textarea"
                
                />
                <span class="text-danger" v-if="errors.has('Descrição')">
                  {{ errors.first("Descrição") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Prazo:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Prazo"
              >
                <input
                  v-validate="'required'"
                  name="Prazo"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Prazo'),
                  }"
                  type="date"
                  id="Prazo"
                  v-model="prazo"
                />
                
              </b-form-group>
              <b-form-group
                horizontal
                label="Consultores:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Maritial State"
              >
                <v-select
                  v-validade="'required'"
                  :options="utilizadores"
                  label="nome"
                  v-model="selectedUtilizador"
                />
              </b-form-group>
            </fieldset>
          </b-form>
          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              @click="saveData"
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
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>


import Widget from "@/components/Widget/Widget";
import http from "../../../../../http-common";
import vSelect from "vue-select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';

export default {
  name: "Widgets",
  components: {
    Widget,
    vSelect,
  },
  data() {
    return {
      data:"",
      assistencias: [],
      descricao: "",
      prazo: "",
      dossier_id: "",
      responsavel_id: "",
      dossier: [],
      dossies: [],
      titulo: "",
      tipo_servico: "",
      cliente_id: "",
      err: false,
      msg: "",
      selectedUtilizador: "",
      utilizadores: [],
      resps: [],
      valor_extra:0,
      duracao:0,
      honorarios:"500065",
      teste:"",
      total:0,
      honorariosValor:0,
      process: false,
      userName:"",
         loading: false,
         data_inicial:"",
         data_final:"",
         assistencia:{
           id:"",
           data_inicial:"",
           data_final:"",
           tipo_atendimento:"",
           valor_extra:"",
           despesasAdicionais:"",
           descricao:"",
         },
        
         
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {


    
    exportPDF() {
      
      require("jspdf-autotable");
      this.getData();
      this.loading = false;
      var vm = this;
      var img = new Image()
      var coluna = [
        {title:"cliente", dataKey:""},
        {title:"", dataKey:""}

      ];
      

      var columns = [
        { title: "Código", dataKey: "codigo" },
        { title: "Data Inicial", dataKey: "data_inicial" },
        { title: "Data Final", dataKey: "data_final" },
        { title: "Descricao", dataKey: "descricao" },
        { title: "Tipo de atendimento", dataKey: "tipo_atendimento" },
        { title: "Duração (s)", dataKey: "duracao" },
      ];
      var doc = new jsPDF("p", "pt");
      
      const logo = require('../../../../assets/connect.png')

var imgLogo = new Image()
imgLogo.src = logo
doc.addImage(imgLogo, 'PNG', 40, 25, 50, 40)

      doc.setFontSize(10)
      doc.text("Cliente:                      "+ vm.dossier.cliente_nome , 40, 80);
      doc.text("Dossier:                     "+ vm.dossier.titulo, 40, 95);
      doc.text("Emitido por:               "+ vm.userName, 40, 115);
      doc.text("Periodo de:                "+vm.data_inicial+" -- "+ vm.data_final, 40, 135);
      doc.setFontSize(9)
      doc.text("Honorários:          "+vm.data, 280, 115);
      doc.text(""+vm.honorariosValor, 530, 115);
      doc.text("Despesas:           ", 280, 135);
      doc.text(""+vm.valor_extra, 530, 135);
      doc.text("Total a pagar:           ", 280, 155);
      doc.text(""+vm.total, 530, 155);
      doc.autoTable(columns, vm.assistencias, {
        margin: { top: 180 },
      });
      doc.save("tarefas.pdf");
    },
   
    exportSemTotal() {
      require("jspdf-autotable");
      this.getData();
      this.loading = false;
      var vm = this;
      var img = new Image()
      var coluna = [
        {title:"cliente", dataKey:""},
        {title:"", dataKey:""}

      ];
      

      var columns = [
        { title: "Código", dataKey: "codigo" },
        { title: "Data Inicial", dataKey: "data_inicial" },
        { title: "Data Final", dataKey: "data_final" },
        { title: "Descrição", dataKey: "descricao" },
        { title: "Tipo de atendimento", dataKey: "tipo_atendimento" },
        { title: "Duração (s)", dataKey: "duracao" },
      ];
      var doc = new jsPDF("p", "pt");
      
      const logo = require('../../../../assets/connect.png')

var imgLogo = new Image()
imgLogo.src = logo
doc.addImage(imgLogo, 'PNG', 40, 25, 50, 40)

      doc.setFontSize(10)
      doc.text("Cliente:                      "+ vm.dossier.cliente_nome , 40, 80);
      doc.text("Dossier:                     "+ vm.dossier.titulo, 40, 95);
      doc.text("Emitido por:               "+ vm.userName, 40, 115);
      doc.text("Periodo de:                "+vm.data_inicial+" -- "+ vm.data_final, 40, 135);
      doc.setFontSize(9)
      doc.text("Honorários:          "+vm.data, 280, 115);
      doc.text(""+vm.honorariosValor, 530, 115);
      doc.text("Despesas:           ", 280, 135);
      doc.text(""+vm.valor_extra, 530, 135);
      // doc.text("Total a pagar:           ", 280, 155);
      // doc.text(""+vm.total, 530, 155);
      doc.autoTable(columns, vm.assistencias, {
        margin: { top: 180 },
      });
      doc.save("tarefas.pdf");
    },
    close() {
      this.$refs["add"].hide();
    },
    initialize() {
      this.getCurrentUser();
      this.getData();
      this.getUtilizadores();
      this.getAssistencias();
      this.totalDuracao();
      
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
        .get(`/dossier/${this.$route.params.dossierId}`, config)
        .then((result) => {
          this.dossier = result.data.Dossier;
          this.loading = false;
        })
        .catch((error) => {
          error;
          this.loading = false;
        });
    },

limpar(){
  this.data_inicial=""
  this.data_final=""
  this.getAssistencias()
},

    getUtilizadores() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/user", config)
        .then((result) => {
          this.utilizadores = result.data.Users.reverse();
          // console.log(this.utilizadores);
        
        })
        .catch((error) => {
          error;
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
        descricao: this.descricao,
        prazo: this.prazo,
        dossier_id: this.dossier.dossier_id,
        responsavel_id: this.selectedUtilizador.id,
      };
      this.$validator.validateAll();
      await http
        .post("/assistencia", data, config)
        .then((success) => {
          success;
           this.process = false;
          this.$refs["add"].hide();
          (this.name = ""),
            (this.email = ""),
            (this.password = ""),
            (this.tipo = ""),
            (this.contacto = ""),
            (this.cargo_id = ""),
            (this.selectedRole = "");
          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Assistencia criada com sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao criar tarefa";
        });
    },

    getAssistencias() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
          params: {
                        dossier_id:this.$route.params.dossierId, 
                        data_inicial:this.data_inicial,
                        data_final:this.data_final,
                    },
          
      };

        const data={
        
        }

      http
        // .get(`/assistencia?dossier_id=` + this.$route.params.dossierId, config)
        .get(`/assistencia`, config) 
        .then((result) => {
          this.assistencias = result.data.Assistencias.data;
          this.assistencias.data_inicial = moment(this.assistencias.data_inicial).format('L')
          // console.log(this.dossier)
        ////////////////calcula o valor extra das assistencias das assistencias   
     this.valor_extra = this.assistencias.reduce(function(prev,curr){
    return curr.valor_extra + prev;

    
    },0)

     this.duracao = this.assistencias.reduce(function(prev,curr){
    return curr.duracao + prev;
    },0)


   this.data = this.convertHMS(this.duracao)
   this.honorariosValor = this.cacularPreco(this.assistencias)
   this.total = parseFloat(this.honorariosValor) + parseFloat(this.valor_extra)
      console.log(ok) 
        })
////////////////calcula a duracao total das assistencias 

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

    convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
    },

    cacularPreco(atendimentoDetais) {

  let valor_extra = atendimentoDetais.reduce(function(prev,curr){
    return curr.valor_extra + prev;
    },0);

  const presencial_cliente = atendimentoDetais.filter(a => a.tipo_atendimento===('Presencial(Cliente)').trim())
      .map(o => o.preco/2);

   const online = atendimentoDetais.filter(a => a.tipo_atendimento===('Remoto').trim())
       .map(o => o.preco/4);


   const presencial_operador = atendimentoDetais.filter(a => a.tipo_atendimento===('Presencial(Operador)').trim())
       .map(o => o.preco);

    let totalonline = online.reduce(function(prev,curr){
              return curr + prev;
          },0);

    let totalpresencialOperador = presencial_operador.reduce(function(prev,curr){
            return curr + prev;
        },0);

    let totalpresencialCliente = presencial_cliente.reduce(function(prev,curr){
          return curr + prev;
      },0);

    return (totalonline+totalpresencialOperador+totalpresencialCliente).toFixed(2);
},

getCurrentUser(){
      let authUser = localStorage.getItem('user');
      var authUserObject = JSON.parse(authUser);
      this.userRole = authUserObject.tipo;
      this.userName = authUserObject.name;
    
    
    },

abrirAssistencia(assistencia) {
      this.assistencia = assistencia;

      // this.assistencia.data_inicial = moment(this.assistencia.data_inicial).format('L')
      this.$refs["edit"].show();
    },

async editarAssistencia() {
    this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        descricao: this.assistencia.descricao,
        valor_extra: this.assistencia.valor_extra,
        despesasAdicionais: this.assistencia.despesasAdicionais,
        tipo_atendimento: this.assistencia.tipo_atendimento,
      };
      // this.$validator.validateAll();
      await http
        .put(`/assistencia/${this.assistencia.assistencia_id}`, data, config)
        .then((success) => {
           this.process = false;
          success;
          this.getData();
          this.$refs["edit"].hide();
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
            text: "Actualizado com sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao actualizar";
        });
    },


abrirDossier(dossier) {
      this.dossier = dossier;

      // this.assistencia.data_inicial = moment(this.assistencia.data_inicial).format('L')
      this.$refs["editarDossier"].show();
    },


async editarDossier() {
    this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        titulo: this.dossier.titulo,
        dossier_id:this.dossier.dossier_id,
        tipo_servico:this.dossier.tipo_servico,
      };
      // this.$validator.validateAll();
      await http
        .put(`/dossier/${this.dossier.dossier_id}`, data, config)
        .then((success) => {
           this.process = false;
          success;
          this.getData();
          this.loading=false
          this.$refs["editarDossier"].hide();
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
            text: "Actualizado com sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao actualizar";
        });
    },

    getResponsaveis() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        // .get(`/assistencia?dossier_id=` + this.$route.params.dossierId, config)
         .get(`/assistencia`, {
                    params: {
                        dossier_id:this.$route.params.dossierId
                    }
                    }, config) 
        .then((result) => {
          this.assistencias = result.data.Assistencias.data;
        })
        .catch((error) => {
          error;
        });
    },

  
  },
};
</script>


<style src="./Dossier.scss" lang="scss" scoped />
