"use strict";
/*
管理與監控設備運行狀態，收集包括設備的運行時間、狀態更新配置等
資訊，支援新增、刪除、配置和監控設備的功能。DMS 與資料庫緊密
聯繫，實現設備運行狀態的即時記錄與回傳，為管理員提供設備資訊
查詢和即時更新功能。
 即時數據收集。
 設備查詢功能。
 收集設備回傳資訊。
 紀錄設備的運行時間。
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

    //addModal dropdownlist
    // group click events
    $("#selGroup .dropdown-item").each(function() {
        $(this).click(function(e) {
            $("#selGroup button").attr("data-value", $(e.target).attr("data-value"));
            $("#selGroup button").html(e.target.innerHTML);
            //init type dropdownlist
            clearDropdownlist("selName");
            clearDropdownlist("selType");
            switch($(e.target).attr("data-value")) {
                case "A":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="A0001">電磁閥</a></li>
                        <li><a class="dropdown-item" href="#" data-value="A0002">流量控制器</a></li>
                        <li><a class="dropdown-item" href="#" data-value="A0003">氣動&機械閥</a></li>`
                    );
                    break;
                case "B":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="B0001">三點組合</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0002">電空比例閥</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0003">壓力錶</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0004">增壓器</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0005">壓縮空氣乾燥機</a></li>`
                    );
                    break;
                case "C":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="C0001">強力夾持氣壓缸</a></li>`
                    );
                    break;
                case "D":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="D0001">電動夾爪</a></li>`
                    );
                    break;
                case "E":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="E0001">氣動砂輪機–連桿浮動工具</a></li>`
                    );
                    break;
                default:
                    $("#selName ul").html("");
                    break;
            }

            
            // name click events
            $("#selName .dropdown-item").each(function() {
                $(this).click(function(e) {
                    $("#selName button").attr("data-value", $(e.target).attr("data-value"));
                    $("#selName button").html(e.target.innerHTML);
                    //init name dropdownlist
                    clearDropdownlist("selType");
                    switch($(e.target).attr("data-value")) {
                        case "A0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="a0001">MVSC-220</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0002">MVSC-260</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0003">MVSC-300</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0004">MVSC-460</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0005">MVSC1-150</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0006">MVSC1-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0007">MVSC1-220</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0008">MVSD1-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0009">MVSD-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0010">MVSD2-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0011">MVSE-510</a></li>`);
                                break;
                        case "A0002":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="a0001">MVPH</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0002">MVPM</a></li>`);
                            break
                        case "B0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="b0001">MACP200</a></li>`);
                            break
                        case "C0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="c0001">MCKD</a></li>`);
                            break
                        case "D0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="d0001">MEHC3</a></li>`);
                            break
                        case "E0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="e0001">TPG60</a></li>`);
                            break

                        default:
                            $("#selType ul").html("");
                            break;
                    }

                    // type click events
                    $("#selType .dropdown-item").each(function() {
                        $(this).click(function(e) {
                            $("#selType button").attr("data-value", $(e.target).attr("data-value"));
                            $("#selType button").html(e.target.innerHTML);
                        });
                    });
                });
            });
        });
    });

    $('#tableDevice').DataTable().destroy();
    $('#tableDevice').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

    $('#tableImmediate').DataTable().destroy();
    $('#tableImmediate').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

    
});

function clearDropdownlist(id) {
    $("#" + id + " button").removeAttr("data-value");
    $("#" + id + " button").html("--請選擇--");
    $("#" + id + " ul").html("");
}

function openAddDeviceConfirm() {
    clearModal("addDeviceModal");
    $("#addDeviceModal .modal-title").text("新增");
    $("#txtId").removeAttr("disabled");

    var modal = new bootstrap.Modal(document.getElementById('addDeviceModal'));
    modal.show();
}

function openEditDeviceConfirm(obj) {
    clearModal("addDeviceModal");
    $("#addDeviceModal .modal-title").text("編輯");  
    var group = $(obj).parents("tr").find("td")[0].innerText;
    var groupVal = $($(obj).parents("tr").find("td")[0]).attr("data-value");
    var name = $(obj).parents("tr").find("td")[1].innerText;
    var nameVal =  $($(obj).parents("tr").find("td")[1]).attr("data-value");
    var type = $(obj).parents("tr").find("td")[2].innerText;
    var typeVal =  $($(obj).parents("tr").find("td")[2]).attr("data-value");
    var id = $(obj).parents("tr").find("td")[3].innerText;
    var position = $(obj).parents("tr").find("td")[4].innerText;

    $("#txtId").val(id).attr("disabled", "disabled");
    $("#txtPosition").val(position);

    $("#selGroup .dropdown-item[data-value='" + groupVal + "']").click();
    //$("#selGroup button.dropdown-toggle").text(group);
    //$("#selGroup button.dropdown-toggle").attr("data-value", groupVal);
    $("#selName .dropdown-item[data-value='" + nameVal + "']").click();
    //$("#selName button.dropdown-toggle").text(name);
    //$("#selName button.dropdown-toggle").attr("data-value", nameVal);
    $("#selType .dropdown-item[data-value='" + typeVal + "']").click();
    //$("#selType button.dropdown-toggle").text(type);
    //$("#selType button.dropdown-toggle").attr("data-value", typeVal);

    var modal = new bootstrap.Modal(document.getElementById('addDeviceModal'));
    modal.show();
}

function openDeleteDeviceConfirm(obj) {
    var group = $(obj).parents("tr").find("td")[0].innerText;
    var name = $(obj).parents("tr").find("td")[1].innerText;
    var type = $(obj).parents("tr").find("td")[2].innerText;
    var id = $(obj).parents("tr").find("td")[3].innerText;

    var deleteModal = new bootstrap.Modal(document.getElementById('deleteDeviceModal'));
    $("#myDelDeviceName").html(group + "-" + name + "("+ type + ")" + "<br/>" + id);
    deleteModal.show();
}

//即時數據
/*function openImmediateData(obj) {
    var id = $(obj).parents("tr").find("td")[1].innerText;
    
    //前台?後台?整理數據

    var tmpHtml = "";
    if(id.indexOf("MVSC") > -1) {
        tmpHtml += '<div><textarea style="width:100%;height:100vh;max-height:420px;overflow-y:auto;" readonly="readonly">' + 
            '數據A：AAAAAAA\n' +
            '數據B：BBBBBB\n' +
            '數據C：CCCCCCCCC\n' +             
            '</textarea></div>';            
    } else if(id.indexOf("MACP200") > -1 ) {
        tmpHtml += '<div><textarea style="width:100%;height:100vh;max-height:420px;overflow-y:auto;" readonly="readonly">' + 
            '數據A：AAAAAAA\n' +
            '數據B：BBBBBB\n' +
            '數據C：CCCCCCCCC\n' + 
            '數據D：DDDDDDD\n' + 
            '數據E：EEEEE\n' + 
            '數據F：FFFFFFFFFFFFFFFFFFF\n' + 
            '數據G：GGGGGGGGGGGGGG\n' + 
            '</textarea></div>';   
    }
    $("#immediateModal .modal-body #pills-immediate-data").html(tmpHtml);
        
    var modal = new bootstrap.Modal(document.getElementById('immediateModal'));
    modal.show();
}*/
