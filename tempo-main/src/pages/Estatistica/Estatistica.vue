<template>
  <div class="widgets-page">
    <h1 class="page-title">Painel de Controle
    </h1>


    
    <b-row>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-users text-primary" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Total de utilizadores</h6>
                <p class="h2 m-0 fw-normal">{{totalUtilizadores}}</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Activos</h6>
                <p class="value5">{{utilizadoresActivos}}</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Inactivos</h6>
                <p class="value5">{{utilizadoresInactivos}}</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-users text-success" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Total de Clientes</h6>
                <p class="h2 m-0 fw-normal">{{totalClientes}}</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Activos</h6>
                <p class="value5">{{clientesActivos}}</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Inactivos</h6>
                <p class="value5">{{clientesInactivos}}</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
      
    
    
      <b-col md="12">
       <Widget>
<GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
       </Widget>
       </b-col>
    </b-row>
    
  
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import http from "../../../http-common";
import { GChart } from 'vue-google-charts'

export default {
  name: 'estatistica',
  components: {
    Widget,
   
    GChart
  },
  data() {
    return {
      carouselFirstGroup: true,
      flipFirstGroup: true,
      animationInterval: null,
      allItems:[],
relatorio:[],
total:[],
         clientesActivos:0,
         clientesInactivos:0,
         totalClientes:0,
         totalUtilizadores:0,
         utilizadoresActivos:0,
         utilizadoresInactivos:0,
     loading:false,
      chartData:[],
    
      
      chartOptions: {
        chart: {
          title: 'Tempo gasto (em segundos)',
        }
      }
    }
  },
  mounted() {
    this.animationInterval = setInterval(() => {
      this.initialize();
      this.slideWidget();
      this.flipWidget();
      
    }, 1000 * 4);
  },
  methods: {

initialize(){
  this.getData();
},
     getData() {
       
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
     
      http
        .get("/dashboard", config)
        .then((result) => {
          this.relatorio = result.data.Relatorios;
         this.clientesActivos= result.data.clientesActivos;
         this.clientesInactivos=result.data.clientesInactivos;
         this.totalClientes=result.data.totalClientes;
         this.totalUtilizadores=result.data.totalUtilizadores;
         this.utilizadoresActivos=result.data.utilizadoresActivos;
         this.utilizadoresInactivos=result.data.utilizadoresInactivos;

  this.chartData=[
    ['City', 'Tempo gasto:'],...this.relatorio.map(d => [ d.cliente, d.segundos])
  ]
        })
        .catch((error) => {
          error;
           this.loading = false;
        });
    },

    
    flipWidget() {
      this.flipFirstGroup = !this.flipFirstGroup
    },
    slideWidget() {
      this.carouselFirstGroup = !this.carouselFirstGroup
    }
  },
  beforeDestroy() {
    clearInterval(this.animationInterval);
  }
};
</script>

<style src="./Widgets.scss" lang="scss" />
