"use strict";
/*
分析設備的操作數據，提供即時的設備操作邏輯檢測與異常警示，同時
分析操作數據以生成設備效能評估報告，提供即時的稼動率統計與查
詢功能。
 分析電磁閥的操作資訊
 收集電磁閥的各個方面的操作需求，會根據所使用的電磁閥的型號，相對應的操作資訊與邏輯檢測，並生成整體的評估報告。
 產生評估報告，評估報告包含檢測數據以及異常的警示資訊。
 能透過邏輯檢測得知設備異常，並即時警示。
 能夠即時顯示設備的稼動率資訊。
*/
$(function() {
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    $('#tableOperate').DataTable().destroy();
    $('#tableOperate').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

    $('[data-toggle="tooltip"]').tooltip({
        customClass: 'tooltip-custom'
    });
});



