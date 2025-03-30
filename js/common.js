"use strict";

$(function() {



});


function clearModal(id) {
    var obj = $("#" + id);

    if(obj) {
        //custom dropdownlist
        obj.find("button[data-value]").text("--請選擇--");
        obj.find("button[data-value]").removeAttr("data-value");

        obj.find('input, textarea, select').each(function() {
            var type = $(this).attr('type');
            
            if (type === "checkbox" || type === "radio") {
                $(this).prop("checked", false);
            } else {
                $(this).val("");
            }
        });

        obj.find("#selName li").each(function() {
            $(this).html("");
        });

        obj.find("#selType li").each(function() {
            $(this).html("");
        });

        obj.find(".divFork").html("");
    } else {
        console.log("Fail: Can not find id=" + id + " element.");
    }
}