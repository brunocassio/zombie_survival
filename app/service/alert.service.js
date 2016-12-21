angular.module('app')
    .service('AlertService', AlertService);

function AlertService(toastr){

    this.success = sucess;
    this.error = error;


    function sucess(mensagem, titulo){
        titulo = titulo || 'ok';
        toastr.success(mensagem, titulo);
    }

    function error(mensagem, titulo){
        titulo = titulo || 'erro';
        toastr.error(mensagem, titulo);
    }

}