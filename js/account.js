"use strict";
/*
提供使用者直觀的操作介面，進行帳戶的建立、修改、刪除與登入管
理，同時負責驗證使用者的身份，確保系統的安全性。
 建立使用者資料。
 修改使用者資料。
 刪除使用者資料。
 驗證使用者資料。
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
    // permission click events
    $("#selPermiss .dropdown-item").each(function() {
        $(this).click(function(e) {        
            $("#selPermiss button").attr("data-value", $(e.target).attr("data-value"));
            $("#selPermiss button").html(e.target.innerHTML);
        }); 
    });
    // status click events
    $("#selStatus .dropdown-item").each(function() {
        $(this).click(function(e) {        
            $("#selStatus button").attr("data-value", $(e.target).attr("data-value"));
            $("#selStatus button").html(e.target.innerHTML);
        });
    });


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
                case "ALL":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>`
                    );
                    $("#selName button").attr("data-value", "ALL");
                    $("#selName button").html("全部");

                    $("#selType ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>`
                    );
                    $("#selType button").attr("data-value", "ALL");
                    $("#selType button").html("全部");
                    break;
                case "A":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>
                        <li><a class="dropdown-item" href="#" data-value="A0001">電磁閥</a></li>
                        <li><a class="dropdown-item" href="#" data-value="A0002">流量控制器</a></li>
                        <li><a class="dropdown-item" href="#" data-value="A0003">氣動&機械閥</a></li>`
                    );
                    break;
                case "B":
                    $("#selName ul").html(
                        `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0001">三點組合</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0002">電空比例閥</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0003">壓力錶</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0004">增壓器</a></li>
                        <li><a class="dropdown-item" href="#" data-value="B0005">壓縮空氣乾燥機</a></li>`
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
                        case "ALL":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>`
                            );
                            $("#selType button").attr("data-value", "ALL");
                            $("#selType button").html("全部");
                            break;
                        case "A0001":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0001">MVSC-220</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0002">MVSC-260</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0003">MVSC-300</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0004">MVSC-460</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0005">MVSC1-150</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0006">MVSC1-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0007">MVSC1-220</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0008">MVSD1-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0009">MVSD-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0010">MVSD2-180</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0010">MVSE-510</a></li>`);
                                break;
                        case "A0002":
                            $("#selType ul").html(
                                `<li><a class="dropdown-item" href="#" data-value="ALL">全部</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0001">MVPH</a></li>
                                <li><a class="dropdown-item" href="#" data-value="a0002">MVPM</a></li>`);
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

    //$('#tableUser').empty();
    //$('#tableUser').html(myHtml);

    $('#tableUser').DataTable().destroy();
    $('#tableUser').DataTable({
        "processing": true,
        "serverSide": false,
        /*"ajax": {
            "url": "api/user/list",
            "type": "POST",
            "data": function ( d ) {
                d.group = $("#selGroup button").attr("data-value");
                d.name = $("#selName button").attr("data-value");
                d.type = $("#selType button").attr("data-value");
                d.status = $("#selStatus button").attr("data-value");
            }
        },*/
        /*"columns": [
            { "data": "account" },
            { "data": "name" },
            { "data": "permiss" },
            { "data": "email" },
            { "data": "status" },
            { "data": "action" }
        ],*/
        "order": [[ 0, "asc" ]],
        language: {
            url: 'js/datatables-zhTW.json',
        },
        scrollX: true,
    });

    $('#tablePermiss').DataTable().destroy();
    $('#tablePermiss').DataTable({
        "processing": true,
        "serverSide": false,
        "order": [[0, "asc"]],
        language: {
            url: 'js/datatables-zhTW.json'
        },
        scrollX: true
    });

});

function clearDropdownlist(id, doNotClearLI) {
    $("#" + id + " button").removeAttr("data-value");
    $("#" + id + " button").html("--請選擇--");
    if(doNotClearLI == false) {
        $("#" + id + " ul").html("");
    }
}


function openAddUserConfirm() {
    clearModal("addUserModal");
    $("#addUserModal .modal-title").text("新增");
    $("#addUserModal .btnResetpwd").css("display", "none");
    $("#txtAccount").removeAttr("disabled");

    var modal = new bootstrap.Modal(document.getElementById('addUserModal'));    
    modal.show();
}

function openEditUserConfirm(obj) {
    clearModal("addUserModal");
    $("#addUserModal .modal-title").text("編輯");
    $("#addUserModal .btnResetpwd").css("display", "block");    
    var id = $(obj).parents("tr").find("td")[0].innerText;
    var name = $(obj).parents("tr").find("td")[1].innerText;
    var permiss = $(obj).parents("tr").find("td")[2];
    var permissId = $(permiss).find("input[type=hidden]").val();
    var email = $(obj).parents("tr").find("td")[3].innerText;
    var status = $(obj).parents("tr").find("td")[4];
    var statusName = $(status).find("span").html();
    var statusVal = $(status).find("input[type=hidden]").val();
    $("#txtAccount").val(id).attr("disabled", "disabled");
    $("#txtName").val(name);
    $("#txtEmail").val(email);
    $("#selPermiss button.dropdown-toggle").text(permiss.innerText)
    $("#selPermiss button.dropdown-toggle").attr("data-value", permissId);    
    $("#selStatus button.dropdown-toggle").html(statusName);
    $("#selStatus button.dropdown-toggle").attr("data-value", statusVal);    

    var modal = new bootstrap.Modal(document.getElementById('addUserModal'));    
    modal.show();
}

function openDeleteUserConfirm(obj) {
    var id = $(obj).parents("tr").find("td")[0].innerText;
    var name = $(obj).parents("tr").find("td")[1].innerText;

    var deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    $("#myDelUserName").html(name + "("+ id + ")");
    deleteModal.show();
}

function goAddUser() {
    if ($("#addUserModal .modal-title").text() == "新增") {

    } else {

    }
}

function goDeleteUser() {

}

function openAddPermissConfirm() {
    clearModal("addPermissModal");
    $("#addPermissModal .modal-title").text("新增");
    $("#txtPermissId").removeAttr("disabled");

    var modal = new bootstrap.Modal(document.getElementById('addPermissModal'));
    modal.show();
}

function openEditPermissConfirm(obj) {
    clearModal("addPermissModal");
    $("#addPermissModal .modal-title").text("編輯");
    var id = $(obj).parents("tr").find("td")[0].innerText;
    var name = $(obj).parents("tr").find("td")[1].innerText;
    var note = $(obj).parents("tr").find("td")[2].innerText;
    var arrDevices = $($(obj).parents("tr").find("td")[3]).find(".btnForkView");
    $("#txtPermissId").val(id).attr("disabled", "disabled");
    $("#txtPermissName").val(name);
    $("#txtPermissNote").val(note);
        
    for(var i=0; i<arrDevices.length; i++) {
        const tmpGroupVal = $(arrDevices[i]).attr("data-value-group");
        const tmpGroup =  $(arrDevices[i]).attr("data-text-group");
        const tmpNameVal = $(arrDevices[i]).attr("data-value-name");
        const tmpName = $(arrDevices[i]).attr("data-text-name");
        const tmpTypeVal = $(arrDevices[i]).attr("data-value-type");
        const tmpType = $(arrDevices[i]).attr("data-text-type");
        $("#selGroup button").attr("data-value", tmpGroupVal);
        $("#selGroup button").html(tmpGroup);
        $("#selName button").attr("data-value", tmpNameVal);
        $("#selName button").html(tmpName);
        $("#selType button").attr("data-value", tmpTypeVal);
        $("#selType button").html(tmpType);

        //find selGroup item
        //$("#selGroup li").find("[data-value='" + tmpGroupVal + "']").click();

        addDevicePermiss();
    }
    clearDropdownlist("selType");
    clearDropdownlist("selName");
    clearDropdownlist("selGroup", true);

    var modal = new bootstrap.Modal(document.getElementById('addPermissModal'));
    modal.show();
}

function openDeletePermissConfirm(obj) {
    var id = $(obj).parents("tr").find("td")[0].innerText;
    var name = $(obj).parents("tr").find("td")[1].innerText;

    var deleteModal = new bootstrap.Modal(document.getElementById('deletePermissModal'));
    $("#myDelPermissName").html(name + "("+ id + ")");
    deleteModal.show();
}

function goAddPermiss() {
    if ($("#addUserModal .modal-title").text() == "新增") {

    } else {

    }
}

function goDeletePermiss() {

}

function addDevicePermiss() {
    const tmpGroupVal = $("#selGroup button").attr("data-value");
    const tmpGroup = $("#selGroup button").html();
    const tmpNameVal = $("#selName button").attr("data-value");
    const tmpName = $("#selName button").html();
    const tmpTypeVal = $("#selType button").attr("data-value");
    const tmpType = $("#selType button").html();
    
    //檢查重複
    var exists = $('#addPermissModal .btnFork[data-value-group="' + tmpGroupVal + '"][data-value-name="' + tmpNameVal + '"][data-value-type="' + tmpTypeVal + '"]')[0];
    if(exists) {
        return;
    }

    let tmp = '<button class="btnFork" ';
    tmp += ' data-value-group="' + tmpGroupVal + '" ';
    tmp += ' data-value-name="' + tmpNameVal + '" ';
    tmp += ' data-value-type="' + tmpTypeVal + '">';
    if (tmpGroupVal == "ALL") {
        tmp += tmpGroup;
    } else if (tmpNameVal == "ALL") {
        tmp += tmpGroup + "-" + tmpName;
    } else if(tmpTypeVal == "ALL") {
        tmp += tmpName + "-" + tmpType;
    } else {
        tmp += tmpType;
    }
    tmp += '<span class="icon" onclick="removeDevicePermiss(\'' + tmpGroupVal + '\',\'' + tmpNameVal + '\',\'' + tmpTypeVal + '\');">×</span>';
    tmp += '</button>';

    $("#devPermiss").append(tmp);
}

function removeDevicePermiss(groupVal, nameVal, typeVal) {
    $('.btnFork[data-value-group="' + groupVal + '"][data-value-name="' + nameVal + '"][data-value-type="' + typeVal + '"]')[0].remove();
}
