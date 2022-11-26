import * as flsFunctions from "./modules/functions.js"
flsFunctions.isWebp();

import $ from "jquery";

//Input +/-
$(".count_input input").keyup(function () {
    var value = $(this).val().replace(/[^\d]/g, '');
    var inputInsert = $(this).data("insert");

    if (value < 1){
        var value = 1;
        $(this).val(value + " " + inputInsert);
    }
    $(this).val(value + " " + inputInsert);
}).keyup()

$(".count_input .arithmetic").click(function (){
    var inputInsert = $(this).parent(".count_input").find("input").data("insert");

    var arithmetic = Number($(this).data("arithmetic"));
    var value = Number($(this).parent(".count_input").find("input").val().replace(/[^\d]/g, ''));

    if (value + arithmetic < 1){
        value = 1;
    }else{
        value = value + arithmetic;
    }

    $(this).parent(".count_input").find("input").val(value + " " + inputInsert);
})