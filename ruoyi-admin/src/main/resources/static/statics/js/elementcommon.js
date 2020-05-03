//jqGrid的配置信息
// $.jgrid.defaults.width = 1000;
// $.jgrid.defaults.responsive = true;
// $.jgrid.defaults.styleUI = 'Bootstrap';

var baseURL = "../../";
//
// //工具集合Tools
// window.T = {};
//
// // 获取请求参数
// // 使用示例
// // location.href = http://localhost:8080/index.html?id=123
// // T.p('id') --> 123;
// var url = function(name) {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  unescape(r[2]); return null;
// };
// T.p = url;
//
// //全局配置
// // $.ajaxSetup({
// //     dataType: "json",
// //     cache: false
// // });
//
// // //重写alert
// // window.alert = function(msg, callback){
// // 	parent.layer.alert(msg, function(index){
// // 		parent.layer.close(index);
// // 		if(typeof(callback) === "function"){
// // 			callback("ok");
// // 		}
// // 	});
// // }
// //
// // //重写confirm式样框
// // window.confirm = function(msg, callback){
// // 	parent.layer.confirm(msg, {btn: ['确定','取消']},
// // 	function(){//确定事件s
// // 		if(typeof(callback) === "function"){
// // 			callback("ok");
// // 		}
// // 	});
// // }
//
// //选择一条记录
// function getSelectedRow() {
//     var grid = $("#jqGrid");
//     var rowKey = grid.getGridParam("selrow");
//     if(!rowKey){
//         alert("请选择一条记录");
//         return ;
//     }
//
//     var selectedIDs = grid.getGridParam("selarrrow");
//     if(selectedIDs.length > 1){
//         alert("只能选择一条记录");
//         return ;
//     }
//
//     return selectedIDs[0];
// }
//
// //选择多条记录
// function getSelectedRows() {
//     var grid = $("#jqGrid");
//     var rowKey = grid.getGridParam("selrow");
//     if(!rowKey){
//         alert("请选择一条记录");
//         return ;
//     }
//
//     return grid.getGridParam("selarrrow");
// }
//
//
//
// //判断是否为空
// function isBlank(value) {
//     return !value || !/\S/.test(value)
// }
//
// //获取地址栏传参
// function getQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return (r[2]);
//     return null;
// }
// //获得行数据
// function getRowsDatas(rowid){
//     var rowData = $("#jqGrid").jqGrid('getRowData',rowid);
//
//     return rowData;
// }
function  BindDropDownControlData(controlid,data) {
    var str = "";
    // 循环
    // for (var i = vm.dropdown.length - 1; i >= 0; i--) {
    for (var i = 0; i < data.length; i++) {
        str += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
        // 获得用户表第2个id和username
    }
    var ddlcontrol=$("#"+controlid);
    ddlcontrol.html(str);
    ddlcontrol.selectpicker('refresh');//动态刷新
}
function  BindDropDownControl(controlid,tablename,valuefieldname,namefieldname) {
    $.ajax({
        url: baseURL + "/common/GetCommonDropDown/"+tablename+"/"+valuefieldname+"/"+namefieldname,
        type: "GET",
        data: {},
        success: function (result) {
            BindDropDownControlData(controlid,result.data);
        }
    })
}
function texttest(a) {
    alert(a)
}
function  BindDropDownControls(tablename,valuefieldname,namefieldname) {
    var self = this;
    $.ajax({
        url: baseURL + "/common/GetCommonDropDownData/"+tablename+"/"+valuefieldname+"/"+namefieldname,
        type: "GET",
        data: {},
        success: function (result) {
            vm.dropdown = result.data;
        }
    })
}
function  BindDropDownControlsdy(tablename,valuefieldname,namefieldname,dict_type) {
    var self = this;
    var selectModuleValue = null
    $.ajax({
        url: baseURL + "/common/GetCommonDropDownDatady/"+tablename+"/"+valuefieldname+"/"+namefieldname+"/"+dict_type,
        type: "GET",
        async:false,
        data: {
        },
        success: function (result) {
            selectModuleValue = result.data;

            // return result.data;
        }
    })

    return selectModuleValue;
}
