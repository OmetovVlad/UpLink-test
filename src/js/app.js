import * as flsFunctions from "./modules/functions.js"
flsFunctions.isWebp();

import $ from "jquery";

//INPUT +/-
// - Ввод через input
$(".count_input input").keyup(function () {
    var value = $(this).val().replace(/[^\d]/g, '');
    var inputInsert = $(this).data("insert");

    if ($(this).data("min") !== undefined){
        console.log("Задан min");
        var inputMin = $(this).data("min");
    }else{
        var inputMin = 1;
    }

    if (value < inputMin){
        var value = inputMin;
        $(this).val(value + " " + inputInsert);
    }
    $(this).val(value + " " + inputInsert);

    Calculate();
}).keyup()

// - Работа с кнопками +/-
$(".count_input .arithmetic").click(function (){
    var inputInsert = $(this).parent(".count_input").find("input").data("insert");

    var arithmetic = Number($(this).data("arithmetic"));
    var value = Number($(this).parent(".count_input").find("input").val().replace(/[^\d]/g, ''));

    if ($(this).parent(".count_input").find("input").data("min") !== undefined){
        var inputMin = Number($(this).parent(".count_input").find("input").data("min"));
    }else{
        var inputMin = 1;
    }

    console.log(inputMin);

    if (value + arithmetic < inputMin){
        value = inputMin;
    }else{
        value = value + arithmetic;
    }

    $(this).parent(".count_input").find("input").val(value + " " + inputInsert);

    Calculate();
})

//SELECT
// - Откыть/закрыть
$(".select .select_head").click(function (){
    if ( $(this).parents(".select").hasClass("open") ){
        // Закрываем открытый
        $(this).parent(".select").removeClass("open");
    }else{
        // Закрываем открытый, при открытии нового
        $(".select").removeClass("open");
        $(this).parent(".select").addClass("open");
    }
})

// - Выбранный radio передаем в шапку select'а
$('.select').on('change', 'input[type="radio"]', function() {
    var selectHead = $(this).parents(".select").find(".select_head").find(".selected_text").find("span");
    var selectedText = $(this).parents("label").find("span").text();

    selectHead.text(selectedText);

    $(".select").removeClass("open");

    Calculate();
});

// - Закрываем при клике мимо все select
$(document).mouseup( function(e){
    var select = $(".select");
    if ( !select.is(e.target) && select.has(e.target).length === 0 ) {
        select.removeClass("open");
    }
});

// SELECT - исключение цвета
$('.room').on('change', 'input[name="material"]', function() {
    if ( $(this).hasClass("tissular") ){

        $(this).parents(".room").find(".no_tissular").addClass("hide");

        $(this).parents(".room").find(".colors .options_list label:first-child input").prop('checked', true);

        var selectHeadText = $(this).parents(".room").find(".colors .options_list label:first-child span").text();

        $(this).parents(".room").find(".colors .select_head .selected_text span").text(selectHeadText);

    } else{
        $(this).parents(".room").find(".no_tissular").removeClass("hide");
    }

    Calculate();
});

//РАСЧЕТ СТОИМОСТИ
function Calculate(){
    var price = new Array(Array(2), Array(2));
    price[0][0] = 1390;
    price[0][1] = 1600;
    price[1][0] = 2250;

    var area = Number($(".count_input input[name='area']").val().replace(/[^\d]/g, ''));
    var corners = Number($(".count_input input[name='corners']").val().replace(/[^\d]/g, ''));

    var material = Number($(".select input[name='material']:checked").val());
    var color = Number($(".select input[name='color']:checked").val());

    var result = price[material][color] * area + corners * 100;

    $(".room_form").find(".result .calculate").text(prettify(result, " "));
}

// - Разбитие числа по триплетам
function prettify (num, separator, floatSeparator) {
    var n = num.toString();
    if (floatSeparator) {
        n = n.replace(".", floatSeparator);
    }
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}