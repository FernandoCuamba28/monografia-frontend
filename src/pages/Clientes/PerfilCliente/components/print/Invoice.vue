<template>
  <b-row>
    <b-col lg='12' id="factura" class="factura" >
      <b-row class='invoice-page'>
        <b-col xs='4' md="12" cols="4">
          <Widget>
              <header>

                <b-row>
                  <b-col md="6" xs="12" class="b-col-print-6">
                    <img src="../../../../../assets/invoice-logo.png" alt="Logo" class='invoiceLogo' />
                  </b-col>
                  <b-col md="6" xs="12" class="b-col-print-6">
                    <h4 class="text-right">
                      #<span class="fw-semi-bold">9.45613</span> /
                      <small>17 May 2014</small>
                    </h4>
                    <div class="text-muted fs-larger text-right">
                      Some Invoice number description or whatever
                    </div>
                  </b-col>
                </b-row>
              </header>
              <section class='invoiceBody'>
                <b-row class="mb-lg">
                  <b-col sm='6' class="b-col-print-6">
                    <h5 class="text-muted no-margin">Informacoes da empresa</h5>
                    <h3 class="company-name m-t-1">
                      Gawati
                    </h3>
                    <address>
                      <strong>Maputo-Mocambique</strong><br />
                      Av. Samora Machel<br />
                      Segundo andar, flat 5<br />
                      <abbr title="Work email">e-mail:</abbr>
                      <a href="mailto:#">mabillas@pavulla.com</a><br />
                      <abbr title="Work Phone">Telefone:</abbr>+258 84 xx xx xxx<br />
                      <abbr title="Work Fax">fax:</abbr> (+21) xxx-xxx-xxx
                    </address>
                  </b-col>

                  <b-col sm='6' class="b-col-print-6 text-right">
                    <h5 class="text-muted no-margin">Informacoes do CLiente</h5>
                    <h3 class="client-name m-t-1">
                      Muarucha Assane
                    </h3>
                    <address>
                      <strong>Consultant</strong> at
                      <a href="#">Allspana</a><br />
                      <abbr title="Work email">e-mail:</abbr>
                      <a href="mailto:#">maryna@allspana.by</a><br />
                      <abbr title="Work Phone">Telefone:</abbr> +258 84 21 93 081<br />
                      
                      Av. 25 de Setembro<br />
                      Segundo andar, flat 5<br />
                    </address>
                  </b-col>
                </b-row>

                <table class="table table-striped">
                  <thead>
                    <tr>
                      
                      <th>L. Anterior</th>
                      <th class="hidden-sm-down d-print-none">L. Actual</th>
                      <th>Consumo</th>
                      <th>Valor</th>
                      <th>Multa</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1432</td>
                      <td class="hidden-sm-down d-print-none">
                        1435
                      </td>
                      <td>2</td>
                      <td class="hidden-sm-down d-print-none">0</td>
                      <td>400</td>
                      <td>400</td>
                    </tr>
                   
                    
                   
                  </tbody>
                </table>

                <b-row>
                  <b-col xs='12' md='8' class="b-col-print-6">
                    <p>
                      <strong>Nota:</strong>
                      A fatura de agua devera ser paga ate ao dia 7 do proximo mes
                    </p>
                  </b-col>
                  <!-- <b-col md='4' xs='12' class="b-col-print-6">
                    <b-row class="text-right justify-content-end">
                      <b-col xs='6' />
                      <b-col sm='3'>
                        <p>Subtotal</p>
                        <p>Tax(10%)</p>
                        <p class="no-margin"><strong>Total</strong></p>
                      </b-col>
                      <b-col sm='3'>
                        <p>1,598.88</p>
                        <p>159.89</p>
                        <p class="no-margin"><strong>1,758.77</strong></p>
                      </b-col>
                    </b-row>
                  </b-col> -->
                </b-row>
                <!-- <p class="text-right mt-lg mb-xs">
                  Marketing Consultant
                </p>
                <p class="text-right">
                  <span class="fw-semi-bold">Bob Smith</span>
                </p> -->
                <b-button-toolbar class="mt-lg justify-content-end d-print-none">
                  <b-button @click="imprimir" variant="inverse" class="mr-2">
                    <i class="fa fa-print" />
                    &nbsp;&nbsp;
                    Imprimir
                  </b-button>
                  
                </b-button-toolbar>
              </section>
          </Widget>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Widget from '@/components/Widget/Widget';
// import jsPDF from 'jspdf'
// import html2canvas from "html2canvas";
export default {
  name: 'InvoicePage',
  components: { Widget },

  methods:{
  //   imprimir(){
  //   window.html2canvas = html2canvas;
  //   var doc = new jsPDF("p","pt","a3");
  //   doc.html(document.querySelector("#factura"),{
  //     callback: function(pdf){
  //       pdf.save("Factura.pdf");

  //     }
  //   })
  // }
  }
};
</script>


<style src="./Invoice.scss" lang="scss" scoped />

<style scoped>
.factura{
  width: 8.5in;
  height: 11in;
}
</style>