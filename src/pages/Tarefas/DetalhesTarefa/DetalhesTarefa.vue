<template>
  <div class="widgets-page">
    <h2 class="page-title">
      Tarefa
      <small>{{tarefas.codigo}}</small>
      <div class="float-right" v-if="userRole=='Admin'">
        <b-button v-b-modal.responsavel variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Consultor</b-button>
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
    <b-row v-else>
      <b-col lg="6" xs="12">
        <Widget class="widget-padding-md ">
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
                <b-dropdown-item-button class="text-success" @click="verDetalhes(tarefas)">
                  <i class="fa fa-edit text-success"></i>
                  Editar 
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  <i class="fa fa-trash text-danger"></i>
                  Apagar
                </b-dropdown-item-button>
              </b-nav-item-dropdown>
             
              
              
            </b-nav>
          </div>
          <div class="text-center mb-3">
            <i class="fad fa-thumbtack fa-7x"></i>
          </div>

          <b-list-group>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Cliente:
              <span>{{ tarefas.Nome_Cliente }}</span>
            </b-list-group-item>
             <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Dossier:
              <span>{{ tarefas.titulo_do_dossier }}</span>
            </b-list-group-item>
            
            <b-list-group-item
              class="d-flex justify-content-between align-items-left"
            >
              Codigo:
              <span>{{ tarefas.codigo }}</span>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex justify-content-between align-items-left"
            >
              Prazo:
              <span>{{ tarefas.prazo }}</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              <span>{{ tarefas.descricao }}</span>
            </b-list-group-item>

           
          </b-list-group>
           <div class="float-right">
                 <b-button v-b-modal.add variant="primary" class="mr-3" size="sm"
          ><i class="fa fa-check"></i> Concluir Tarefa</b-button
        ></div>
        </Widget>
      </b-col>

      <b-col lg="6" xs="12">
        <Widget class="widget-padding-lg text-white widget-md">
          
    <b-row>
      <b-col>
<!-- <h4 style="color:black;">Responsaveis</h4>  -->
           

      </b-col>
    </b-row>
          <b-row>
           
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nome</th>
                  <th v-if="userRole=='Admin'">acção</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="responsavel in responsaveis" :key="responsavel.id">
                  <td>{{responsavel.id}}</td>
                  <td>{{responsavel.nome}}</td>
                  
                  <td v-if="userRole=='Admin'">
                    <b-button
                      variant="danger"
                      size="sm"
                      @click="remover(responsavel)"
                      ><i class="fa fa-trash"></i></b-button
                    >
                  </td>
                </tr>
                
              </tbody>
            </table>
             <!-- <b-col>
             <h2 class="page-title">
      <div class="float-right" v-if="userRole=='Admin'">
        <b-button v-b-modal.responsavel variant="success" class="mr-3" size="sm"
          ><i class="fa fa-plus"></i> Adicionar Responsavel</b-button
        >
      </div>
    </h2>
    </b-col> -->
          </b-row>
           
        </Widget>
      </b-col>
    </b-row>

  
    <b-modal
      id="add"
      size="md"
      title="Concluir Tarefa"
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
                label="Data Inicial:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                 required
                v-validate="'required'"
                  name="Data Inicial"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Data Inicial'),
                  }"
                  type="datetime-local"
                  id="Data Inicial"
                  v-model="data_inicial"
                />
                 <span class="text-danger" v-if="errors.has('Data Inicial')">
                  {{ errors.first("Data Inicial") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Data Final:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Data Final"
              >
                <input
                required
                v-validate="'required'"
                  name="Data Final"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Data Final'),
                  }"
                  type="datetime-local"
                  id="Titulo"
                  v-model="data_final"
                />
                 <span class="text-danger" v-if="errors.has('Data Final')">
                  {{ errors.first("Data Final") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Tipo de atendimento:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Tipo de atendimento"
              >
                <v-select
                required
                v-validate="'required'"
                  id="Tipo de atendimento"
                  v-model="tipo_atendimento"
                  :options="[
                    'Remoto',
                    'Presencial(Operador)',
                    'Presencial(Cliente)',
                  ]"
                />
                <span class="text-danger" v-if="errors.has('Tipo de atendimento')">
                  {{ errors.first("Tipo de atendimento") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Valor extra:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Valor extra"
              >
                <input
                  v-validate="'required'"
                  name="Valor extra"
                  :class="{
                    'form-control': true,
                    'is-invalid': errors.has('Valor extra'),
                  }"
                  type="number"
                  id="Valor extra"
                  v-model="valor_extra"
                />
                <span class="text-danger" v-if="errors.has('Valor extra')">
                  {{ errors.first("Valor extra") }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Despesas Adicionais:"
                :label-cols="3"
                label-breakpoint="md"
                label-for="Despesas Adicionais"
              >
                <b-form-textarea
                  v-model="despesasAdicionais"
                  :rows="3"
                  id="Despesas Adicionais"
                />
                <span class="text-danger" v-if="errors.has('Despesas Adicionais')">
                  {{ errors.first("Despesas Adicionais") }}
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
                <i class="fa fa-save mr-1"></i> Concluir <b-spinner v-show="process" small></b-spinner>
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
      id="responsavel"
      size="md"
      body-class="bg-white"
      hide-footer
      title="Adicionar responsavel"
      cancel-variant="default"
      ref="responsavel"
    >
      <b-row>
        <b-col lg="12" xs="12">
          <b-form @submit.prevent="">
             <b-alert show dismissible variant="danger" v-model="err">
        <span>Erro, selecione um utilizador</span>
      </b-alert>
            <fieldset>
              <b-form-group
              horizontal
              label="Utilizadores:"
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
            <div class="form-action bg-transparent px-0">
              <b-button
                type="submit"
                variant="success"
                @click="salvarResponsavel"
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
   <b-modal
      id="edit"
      size="md"
      title="Actualizar Tarefa"
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
                  v-model="tarefa.descricao"
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
                  v-model="tarefa.prazo"
                />
                <span class="text-danger" v-if="errors.has('Prazo')">
                  {{ errors.first("Prazo") }}
                </span>
              </b-form-group>

            </fieldset>
          </b-form>
          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              @click="editar"
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
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import http from "../../../../http-common";
import vSelect from "vue-select";

export default {
  name: "Widgets",
  components: {
    Widget,
    vSelect,
  },
  data() {
    return {
      process: false,
      tarefas: [],
      titulo: "",
      tipo_servico: "",
      cliente_id: "",
      err: false,
      msg: "",
      dossies: [],
      cliente: [],
responsavel:"",
      tipo_atendimento: "",
      data_inicial: "",
      data_final: "",
      valor_extra: "",
      despesasAdicionais: "",
      responsaveis: [],
      utilizadores:[],
      selectedUtilizador:"",
      assistencia_id:"",
      responsavel_id:"",
      userRole:"",
      loading: false,
      tarefa:
        {
          id:"",
          descricao:"",
          prazo:"",
        }
      ,
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
      this.getResponsaveis();
      this.getUtilizadores();
      this.getCurrentUser();
          },


             remover(responsavel) {
      this.responsavel = responsavel;
      this.$swal
        .fire({
          title: "Remover " + responsavel.nome +" desta tarefa?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#0dd9d0",
          cancelButtonColor: "#d33",
          confirmButtonText: "SIM",
          cancelButtonText: "NÃO",
        })
        .then((result) => {
          if (result.isConfirmed) {
            let token = localStorage.getItem("token");
             let config = {
                        headers: {
                         authorization: "Bearer " + token,
                        },
                    }
                     http.delete(`responsavel/${responsavel.id}`,config)
                    .then((success) =>{
                        success
                        this.getResponsaveis();
                         this.$swal.fire({
                        icon: 'success',
                        confirmButtonColor: '#0dd9d0',
                        title:'Removido com sucesso!',
                    })
                    }).catch((err) =>{
                        err
                        this.$swal.fire({
                        icon: 'error',
                        confirmButtonColor: '#0dd9d0',
                        title:'Erro ao remover!',
                    }) 
                    })
                   
          }
        });
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
        .get(`/assistencia/${this.$route.params.tarefaId}`, config)
        .then((result) => {
          this.tarefas = result.data.Assistencias;
          this.loading = false;
        })
        .catch((error) => {
          error;
          this.tarefas = result.data.Assistencias;
        });
    },

    async salvarResponsavel() {
       this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
    
        assistencia_id:this.tarefas.id,
        responsavel_id:this.selectedUtilizador.id,
      };
      await http
        .post(`/responsavel`,data, config)
        .then((success) => {
          success;
           this.process = false;
          this.getResponsaveis();
          this.$refs["responsavel"].hide();

          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Adicionado com Sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = error.response.data.message;
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
        tipo_atendimento: this.tipo_atendimento,
        despesasAdicionais: this.despesasAdicionais,
        data_inicial: this.data_inicial,
        data_final: this.data_final,
        valor_extra: this.valor_extra,
        
      };
      this.$validator.validateAll();
      await http
        .put(`/assistencia/${this.$route.params.tarefaId}`,data, config)
        .then((success) => {
          success;
           this.process = false;
          this.getData();
          this.$refs["add"].hide();

          this.$swal({
            success: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,

            icon: "success",
            title: "Sucesso",
            text: "Assistencia concluida com Sucesso!",
          });
           this.$router.push({ name: 'Tarefas' })
        })
        .catch((error) => {
             this.process = false;
          this.err = true;
          this.msg = "Ocorreu algum erro";
        });
    },

  getCurrentUser(){
      let authUser = localStorage.getItem('user');
      var authUserObject = JSON.parse(authUser);
      this.userRole = authUserObject.tipo;
      console.log(this.userRole)
    
    },
    getResponsaveis() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get(`/assistenciaResponsaveis/${this.$route.params.tarefaId}`, config)
        .then((result) => {
          this.responsaveis = result.data.Responsaveis;
        })
        .catch((error) => {
          error;
        });
    },
  // getUtilizadores() {
  //     let token = localStorage.getItem("token");
  //     let config = {
  //       headers: {
  //         authorization: "Bearer " + token,
  //       },
  //     };

  //     http
  //       //  .get(`/user/${this.$route.params.tarefaId}`, config)
  //       .get(`/user`,{params:{assistencia_id:"28"}}, config)
  //       .then((result) => {
  //         this.utilizadores = result.data.Users.reverse();
  //         // console.log(this.utilizadores);
  //       })
  //       .catch((error) => {
  //         error;
  //       });
  //   },

 verDetalhes(tarefas) {
      this.tarefa = tarefas;
      this.$refs["edit"].show();
      // alert(this.editTarefa)
    },

     async editar() {
        this.process = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
          
        },
      };
      const data = {
        descricao: this.tarefa.descricao,
        prazo: this.tarefa.prazo,

      };
      this.$validator.validateAll();
      // alert(this.tarefa.descricao)
      await http
        .put(`/assistencia/${this.$route.params.tarefaId}`,data, config)
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
            text: "Tarefa actualizada com sucesso!",
          });
        })
        .catch((error) => {
           this.process = false;
          this.err = true;
          this.msg = "Erro ao Editar Tarefa";
        });
    },

getUtilizadores() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get(`/listUsers/${this.$route.params.tarefaId}`, config)
        .then((result) => {
          this.utilizadores = result.data.Users;
          // console.log(this.utilizadores);
        })
        .catch((error) => {
          error;
        });
    },
 


  },
};
</script>


<style src="./DetailIndividual.scss" lang="scss" scoped />
