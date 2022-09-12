<template>
  <div class="widgets-page">
    <h1 class="page-title">
      Cliente
      <small>Muarucha Assane</small>
      <div class="float-right">
        <b-button v-b-modal.imprimir variant="success" class="mr-3" size="sm"
          ><i class="fa fa-print"></i> Imprimir</b-button
        >
      </div>
    </h1>

    <b-row>
      <b-col lg="3" md="6" xs="12">
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <!-- <i class="fi flaticon-warning text-danger" /> -->
                  <i class="fa fa-exclamation-triangle text-danger" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">TOTAL DE DIVIDA</h6>
                <p class="h2 m-0 fw-normal">350</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Meses em Atraso</h6>
                <!-- <p class="value5">3</p> -->
              </b-col>
              <b-col xs="6">
                <h6 class="m-0"></h6>
                <p class="value5">4</p>
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
                  <!-- <i class="fi flaticon-warning text-danger" /> -->
                  <i class="fa fa-calendar text-gray" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Leitura anterior</h6>
                <p class="h4 m-0 fw-normal">25/02/2021</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Volume</h6>
                <p class="value5">1432 m3</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">M/dia</h6>
                <p class="value5">1.5m3</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
        <!-- <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <i class="fi flaticon-magic-wand text-danger" />
                </span>
              </b-col>
              <b-col xs="9">
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                    <div v-if="carouselFirstGroup" key="first">
                      <h6 class="m-0">VISITS TODAY</h6>
                      <p class="h2 m-0 fw-normal">12,324</p>
                    </div>
                    <div v-else key="second">
                      <h6 class="m-0">VISITS YESTERDAY</h6>
                      <p class="h2 m-0 fw-normal">11,885</p>
                    </div>
                  </transition>
                </div>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">New Visitors</h6>
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                      <p v-bind:key="carouselFirstGroup" class="value5">
                        {{carouselFirstGroup ? '1,332' : '20.1%'}}
                      </p>
                  </transition>
                </div>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Bounce Rate</h6>
                <div class="overflow-hidden">
                  <transition name="carousel" mode="out-in">
                    <p v-bind:key="carouselFirstGroup" class="value5">
                      {{carouselFirstGroup ? '217' : '2.3%'}}
                    </p>
                  </transition>
                </div>
              </b-col>
            </b-row>
          </div>
        </Widget> -->
      </b-col>
      <b-col lg="3" md="6" xs="12">
        <!-- <Widget>
          <div class="overflow-hidden">
            <transition name="carousel" mode="out-in">
              <div v-if="carouselFirstGroup" key="first">
                <b-row class="flex-nowrap">
                  <b-col xs="3">
                    <span class="widget-icon">
                      <i class="fi flaticon-notebook-4 text-info" />
                    </span>
                  </b-col>
                  <b-col xs="9">
                    <h6 class="m-0">ORDERS</h6>
                    <p class="h2 m-0 fw-normal">82,765</p>
                  </b-col>
                </b-row>
                <b-row class="flex-nowrap">
                  <b-col xs="6">
                    <h6 class="m-0">Avg. Time</h6>
                    <p class="value5">2:56</p>
                  </b-col>
                  <b-col xs="6">
                    <h6 class="m-0">Last Week</h6>
                    <p class="value5">374</p>
                  </b-col>
                </b-row>
              </div>
              <div v-else key="second">
                <b-row class="flex-nowrap">
                  <b-col xs="3">
                    <span class="widget-icon">
                      <i class="fi flaticon-shuffle text-info" />
                    </span>
                  </b-col>
                  <b-col xs="9">
                    <h6 class="m-0">PICKED ORDERS</h6>
                    <p class="h2 m-0 fw-normal">13.8%</p>
                  </b-col>
                </b-row>
                <b-row class="flex-nowrap">
                  <b-col xs="6">
                    <h6 class="m-0">Basic</h6>
                    <p class="value5">3,692</p>
                  </b-col>
                  <b-col xs="6">
                    <h6 class="m-0">Advanced</h6>
                    <p class="value5">1,441</p>
                  </b-col>
                </b-row>
              </div>
            </transition>
          </div>
        </Widget> -->
        <Widget>
          <div class="clearfix">
            <b-row class="flex-nowrap">
              <b-col xs="3">
                <span class="widget-icon">
                  <!-- <i class="fi flaticon-warning text-danger" /> -->
                  <i class="fa fa-calendar text-info" />
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">Leitura actual</h6>
                <p class="h4 m-0 fw-normal">25/03/2021</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <h6 class="m-0">Volume</h6>
                <p class="value5">1435 m3</p>
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">M/dia</h6>
                <p class="value5">1.3m3</p>
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
                  <!-- <i class="fi flaticon-diamond text-success" /> -->
                  <i class="fa fa-money text-success"></i>
                </span>
              </b-col>
              <b-col xs="9">
                <h6 class="m-0">TOTAL</h6>
                <p class="h2 m-0 fw-normal">1,448</p>
              </b-col>
            </b-row>
            <b-row class="flex-nowrap">
              <b-col xs="6">
                <!-- <h6 class="m-0">Consumo</h6>
                <p class="value5">6</p> -->
              </b-col>
              <b-col xs="6">
                <h6 class="m-0">Moeda</h6>
                <p class="value5">Metical</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="4" xs="12">
        <Widget class="widget-padding-md">
          <b-row>
            <b-col cols="10" md="8">
              <h4 class="mt-0">Dados do cliente</h4>
            </b-col>
            <b-col cols="2" md="4">
              <b-button v-b-modal.editar variant="success" class="mr-" size="xs"
                ><i class="fa fa-edit"></i> Editar</b-button
              >
            </b-col>
          </b-row>
          <b-list-group>
            <b-list-group-item
              class="d-flex justify-content-between align-items-left"
            >
              Cliente:
              <span>Muarucha Assane</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Endereco:
              <span>Muarucha Assane</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Telefone:
              <span>+258 84 xx xx xxx</span>
            </b-list-group-item>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              Email:
              <span>mmassene@pavulla.com</span>
            </b-list-group-item>
          </b-list-group>
        </Widget>
      </b-col>

      <b-col lg="8" xs="12">
        <Widget class="widget-padding-lg text-white">
          <b-row>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th class="hidden-sm-down d-print-none">Consumo</th>

                  <th class="hidden-sm-down d-print-none">Valor</th>
                  <th>Multa</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2019/08/27</td>
                  <td class="hidden-sm-down d-print-none">6</td>
                  <td>260</td>
                  <td class="hidden-sm-down d-print-none">100</td>
                  <td>900</td>
                  <td>
                    <b-button to="/app/client/individual/detail/invoice" block variant="danger" size="sm">Pendente</b-button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2019/08/27</td>
                  <td class="hidden-sm-down d-print-none">6</td>
                  <td>260</td>
                  <td class="hidden-sm-down d-print-none">100</td>
                  <td>900</td>
                  <td>
                    <b-button block variant="danger" size="sm">Pendente</b-button>
                  </td>
                </tr>
               <tr>
                  <td>1</td>
                  <td>2019/08/27</td>
                  <td class="hidden-sm-down d-print-none">6</td>
                  <td>260</td>
                  <td class="hidden-sm-down d-print-none">100</td>
                  <td>900</td>
                  <td>
                    <b-button block variant="success" size="sm">Pago</b-button>
                  </td>
                </tr>
               <tr>
                  <td>1</td>
                  <td>2019/08/27</td>
                  <td class="hidden-sm-down d-print-none">6</td>
                  <td>260</td>
                  <td class="hidden-sm-down d-print-none">100</td>
                  <td>900</td>
                  <td>
                    <b-button block variant="success" size="sm">Pago</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-row>
        </Widget>
      </b-col>
    </b-row>
    <b-modal
      id="editar"
      size="lg"
      title="Editar cliente"
      body-bg-variant="white"
      hide-header
      hide-footer
    >
      <b-form>
        <legend class="text-info">
          <h5>
            <i class="fa fa-user"></i>
            <strong class="pl-2">Editar Cliente</strong>
          </h5>
        </legend>
        <b-row>
          <b-col md="4">
            <b-form-group label="Contador" label-for="contador">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Nome" label-for="search-field">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="2">
            <b-form-group label="NUIT" label-for="Nuit">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Telefone" label-for="telefone">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="8">
            <b-form-group label="Email" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Bairro" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Quarteirao" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Casa" label-for="email">
              <b-row>
                <b-col md="12">
                  <b-form-input type="text" id="normal-field" />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group horizontal>
              <b-button variant="gray" class="ml-0 mr-3">Cancelar</b-button>
              <b-button variant="success" type="submit">Actualizar</b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      id="imprimir"
      size="lg"
      title="Impimir Fatura"
      body-bg-variant="white"
      hide-footer
    >
      <Print />
    </b-modal>
  </div>
</template>

<script>
import Print from "./components/print/Invoice";
import Skycon from "@/components/Skycon/Skycon";
import Widget from "@/components/Widget/Widget";
import FlotCharts from "./components/flot-charts/FlotCharts";
import Nasdaq from "./components/nasdaq/Nasdaq";
import YearsMap from "./components/years-map/YearsMap";
import RealtimeTraffic from "./components/realtime-traffic/RealtimeTraffic";
import ChangesChart from "./components/changes-chart/ChangesChart";

export default {
  name: "Widgets",
  components: {
    Widget,
    FlotCharts,
    Skycon,
    Nasdaq,
    YearsMap,
    RealtimeTraffic,
    ChangesChart,
    Print,
  },
  data() {
    return {
      carouselFirstGroup: true,
      flipFirstGroup: true,
      animationInterval: null,
    };
  },
  mounted() {
    this.animationInterval = setInterval(() => {
      this.slideWidget();
      this.flipWidget();
    }, 1000 * 4);
  },
  methods: {
    flipWidget() {
      this.flipFirstGroup = !this.flipFirstGroup;
    },
    slideWidget() {
      this.carouselFirstGroup = !this.carouselFirstGroup;
    },

  

  },
  beforeDestroy() {
    clearInterval(this.animationInterval);
  },
};
</script>


<style src="./DetailIndividual.scss" lang="scss" scoped />
