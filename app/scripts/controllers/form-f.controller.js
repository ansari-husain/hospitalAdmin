'use strict';

angular.module('hospitaladminApp')
  .controller('formFController', function (DataService,$timeout) {
    var vm = this;

    vm.generatePdf = function(){
      html2canvas(document.getElementById('exportThis'), {
        onrendered: function (canvas) {
          var data = canvas.toDataURL();
          var docDefinition = {
            content: [{
              image: data,
              width: 500
            }]
          };
          pdfMake.createPdf(docDefinition).download("Score_Details.pdf");

        }
      });
    };

    vm.getDetail = function(){
      console.log(vm.patient);
    }
  });
