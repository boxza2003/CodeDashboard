"use strict";
/*
透過監控設備數據，依據數據預測設備保養週期與故障概率，生成維護
建議並實現維護歷史記錄的存儲與查詢。結合預測模型生成保養建
議，制定維護計劃，並提供故障預警功能。
 監控設備運行數據，根據預測模型判斷設備的健康狀況，並生成相應的保養建議。
 設備監控。
 預知保養計劃制定。
 故障預測。
 保養通知。
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

    $('#tableMonitor').DataTable().destroy();
    $('#tableMonitor').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

    $('#tableMalfunction').DataTable().destroy();
    $('#tableMalfunction').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

    $('#tableMaintain').DataTable().destroy();
    $('#tableMaintain').DataTable({
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

//保養計劃
function openMaintainPlan(obj) {
    var id = $(obj).parents("tr").find("td")[1].innerText;
    
    
 
    var modal = new bootstrap.Modal(document.getElementById('maintainPlanModal'));
    modal.show();
}
function openEditMaintainPlan() {

    var modal = new bootstrap.Modal(document.getElementById('maintainPlanModal'));
    modal.show();
}

//故障預測
function openMalfunctionPrediction(obj) {
    var id = $(obj).parents("tr").find("td")[1].innerText;
    

 
    var modal = new bootstrap.Modal(document.getElementById('malfunctionModal'));
    modal.show();
}

//保養通知
function openMaintainNotify(obj) {
    var id = $(obj).parents("tr").find("td")[1].innerText;
    
    
 
    var modal = new bootstrap.Modal(document.getElementById('immediateModal'));
    modal.show();
}
