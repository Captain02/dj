$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'playback/listxx',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'ID', index: 'ID', width: 0, key: true, hidden: true},
            {label: '工程名称', name: 'ProjectName', index: 'ProjectName', width: 220},
            {label: '采集时间', name: 'CJTime', index: 'CJTime', width: 130},
            {label: '雷达通道数', name: 'RadarChannelNum', index: 'RadarChannelNum', width: 80},
            {label: '照相机状态', name: 'CameraEnabled_label', index: 'CameraEnabled', width: 80},
            {label: '视频文件数', name: 'VideoFileCount', index: 'VideoFileCount', width: 80},
            {label: '视频A状态', name: 'VideoAEnabled_label', index: 'VideoAEnabled', width: 80},
            {label: '视频B状态', name: 'VideoBEnabled_label', index: 'VideoBEnabled', width: 80},
            {label: '视频C状态', name: 'VideoCEnabled_label', index: 'VideoCEnabled', width: 80},
            {label: '视频D状态', name: 'VideoDEnabled_label', index: 'VideoDEnabled', width: 80},
            {label: 'GPS状态', name: 'GPSEnabled_label', index: 'GPSEnabled', width: 70},
            {label: '创建日期', name: 'CreateDate', index: 'CreateDate', width: 140},
            {label: '工程本地路径', name: 'LocalPath', index: 'LocalPath', width: 480},
            {label: '所属道路', name: 'streetName', index: 'LocalPath', width: 90},
            {label: '项目id', name: 'ProjectDirectoryID', width: 240, editable: true, hidden: true},
            {label: '建筑组成id', name: 'JZZCID', width: 240, editable: true, hidden: true},

        ],
        viewrecords: true,
        height: "100%",
        rowNum: 15,
        rowList: [15, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        shrinkToFit: false,
        autoScroll: true,
        multiselect: true,
        loadui: "Disable",
        //multiboxonly:true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalResult"
        },
        prmNames: {
            page: "currentPage",
            rows: "showCount",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            // $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
        },
        beforeSelectRow: function () {
            $("#jqGrid").jqGrid('resetSelection');
            return (true);
        }
    });
    $(window).on("load", function () {

        $(window).on('load', function () {

            // $('.selectpicker').selectpicker({
            //     'selectedText': 'cat',
            //     noneSelectedText: '请选择',
            //     width: '500px',
            // });

        });
        /* page_resize();
         $(window).resize(function(){
             setTimeout("page_resize()", 10);
         });*/
    });
});

function page_resize() {
    var _height = $(window).height();
    $("#jqGrid").jqGrid('setGridHeight', _height * 0.7);
}

function comparison() {
    // layer.alert("敬请期待!!")
}

function playback() {
    debugger
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    $.ajax({
        url: baseURL + "/rsProjectProjectinfo/rsProjectProjectinfo/findByid",
        type: "GET",
        data: {
            ID: id,
        },
        success: function (result) {

            var path = encodeURI(result.data.LocalPath);
            if (getBrowserEngine() == "IE") {
                path = encodeURI(path);
            }
            window.location = "RadarSystem://@playback@" + path + "@" + id + "@";
        }
    })
}

// 获取浏览器内核
function getBrowserEngine() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf('Trident') !== -1 || userAgent.indexOf('MSIE') !== -1) { //表示使用的是IE的内核
        return 'IE';
    } else if (userAgent.indexOf('Firefox') !== -1) {
        return "Firefox";
    } else if (userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome';
    } else if (userAgent.indexOf('Safari') !== -1) {
        return 'Safari';
    } else {
        return;
    }
}

var vm = new Vue({
    el: '#rrapp',

    data: {
        backdata: null,
        q: {
            ID: null,
            ProjectDirectoryID: 0,
            ProjectName: null,
            ParentID: null,
            LocalPath: null,
            NetworkPath: null,
            JZZCID: null,
            CJTime: null,
            LayoutFlag: null,
            RadarChannelNum: null,
            CameraEnabled: null,
            VideoFileCount: null,
            VideoAEnabled: null,
            VideoBEnabled: null,
            VideoCEnabled: null,
            VideoDEnabled: null,
            GPSEnabled: null,
            CreateDate: null,
            UpdateDate: null,
            AddUserID: null,
            DeptID: null,
            Memo: null,
        },
        showList: true,
        title: null,
        index: null,
        basicfile: null,
        layeredit: {
            ProjectDirectoryID: null,
            ProjectName: null,
            LocalPath: null,
            CJTime: null,
            LayoutFlag: null,
            RadarChannelNum: null,
            CameraEnabled: null,
            VideoFileCount: null,
            VideoAEnabled: null,
            VideoBEnabled: null,
            VideoCEnabled: null,
            VideoDEnabled: null,
            GPSEnabled: null,
        },
        edit: {
            ID: null,
            ProjectDirectoryID: null,
            ProjectName: null,
            ParentID: null,
            LocalPath: null,
            NetworkPath: null,
            CJTime: null,
            LayoutFlag: null,
            RadarChannelNum: null,
            CameraEnabled: null,
            VideoFileCount: null,
            VideoAEnabled: null,
            VideoBEnabled: null,
            VideoCEnabled: null,
            VideoDEnabled: null,
            GPSEnabled: null,
            CreateDate: null,
            UpdateDate: null,
            AddUserID: null,
            DeptID: null,
            Memo: null,
        },
        dropdown: [
            {
                id: null,
                name: null,
            }
        ],
        dropdown1: [
            {
                id: null,
                name: null,
            }
        ],
        openOrclose: [],
    },
    created: function () {
        this.binddropdown();
        this.bindsearchdropdown();
    },
    methods: {

        conmmitDataInfo: function () {
            vm.layeredit.ProjectDirectoryID = vm.q.ProjectDirectoryID
            vm.layeredit.backdata = vm.backdata
            if (vm.layeredit.ProjectDirectoryID == 0 || vm.layeredit.ProjectDirectoryID == null) {
                alert('请选择上级目录')
                window.location.reload()
                return
            }
            $.ajax({
                url: baseURL + '/rsProjectProjectinfo/rsProjectProjectinfo/conmmitDataInfo',
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(vm.layeredit),
                success: function (result) {
                    console.log(result)
                    vm.reload()
                }
            })
        },
        submitFile: function () {
            $.ajax({
                url: baseURL + 'rsProjectProjectinfo/rsProjectProjectinfo/singleUpload/',
                type: "POST",
                data: {
                    url: vm.basicfile
                },
                success: function (result) {
                    console.log(result)
                }
            })
        },
        binddropdown: function () {
            //字典表下拉框
            this.dropdown1 = BindDropDownControlsdy('sys_dict_data', 'dict_', 'dict_label', '起重机类型管理')
            // 普通下拉框
            this.dropdown = BindDropDownControls('people', 'id', 'name');
            this.openOrclose = BindDropDownControlsdy('sys_dict_data', 'dict_value', 'dict_label', '开启或关闭')
        },
        // 搜索下拉
        bindsearchdropdown: function () {
            BindDropDownControl('selectuserids', 'rs_project_projectinfo', 'ID', 'ProjectName')
        },
        selectDataById: function (x) {
            // alert(x)
            vm.q.JZZCID = x
            vm.queryProjectDirectoryID();

        },
        // 搜索
        queryProjectDirectoryID: function () {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'ProjectName': vm.q.ProjectName,
                    'JZZCID': vm.q.JZZCID
                },
                page: page
            }).trigger("reloadGrid");
        },
        // 添加页面
        addPage: function () {
            vm.reload();
            vm.index = layer.open({
                type: 1,
                area: ['95%', '95%'],
                content: $('#editLayer'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                btn: ['确定', '取消'],
                yes: function () {
                    vm.saveOrUpdate();
                },
                btn2: function () {
                    vm.reload();
                }
            });
        },
        <!--修改页面-->
        editPage: function (x) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            $.ajax({
                url: baseURL + 'rsProjectProjectinfo/rsProjectProjectinfo/findByid',
                type: "GET",
                data: {
                    ID: id,
                },
                success: function (result) {
                    vm.edit.ID = result.data.ID;
                    vm.edit.ProjectName = result.data.ProjectName;
                    vm.edit.ParentID = result.data.ParentID;
                    vm.edit.LocalPath = result.data.LocalPath;
                    vm.edit.NetworkPath = result.data.NetworkPath;
                    vm.edit.CJTime = result.data.CJTime;
                    vm.edit.LayoutFlag = result.data.LayoutFlag;
                    vm.edit.RadarChannelNum = result.data.RadarChannelNum;
                    vm.edit.CameraEnabled = result.data.CameraEnabled;
                    vm.edit.VideoFileCount = result.data.VideoFileCount;
                    vm.edit.VideoAEnabled = result.data.VideoAEnabled;
                    vm.edit.VideoBEnabled = result.data.VideoBEnabled;
                    vm.edit.VideoCEnabled = result.data.VideoCEnabled;
                    vm.edit.VideoDEnabled = result.data.VideoDEnabled;
                    vm.edit.GPSEnabled = result.data.GPSEnabled;
                    vm.edit.CreateDate = result.data.CreateDate;
                    vm.edit.UpdateDate = result.data.UpdateDate;
                    vm.edit.AddUserID = result.data.AddUserID;
                    vm.edit.DeptID = result.data.DeptID;
                    vm.edit.Memo = result.data.Memo;
                }
            })
            vm.index = layer.open({
                type: 1,
                area: ['95%', '95%'],
                content: $('#editLayer'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                btn: ['确定', '取消'],
                yes: function (id) {
                    vm.saveOrUpdate(id);
                },
                btn2: function () {
                    vm.reload();
                }
            });
        },
        <!--新增修改-->
        saveOrUpdate: function (id) {
            var url = "rsProjectProjectinfo/rsProjectProjectinfo/updatedata";
            $.ajax({
                url: baseURL + url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(vm.layeredit),
                success: function (result) {
                    vm.reload();
                    layer.close(vm.index)
                },
                btn2: function () {
                    vm.reload();
                }
            })
        },
        // 搜索
        query: function () {
            debugger
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {

                    'ProjectName': vm.q.ProjectName,
                    'ID': $("#selectuserids").val(),
                    'ParentID': vm.q.ParentID,
                    'LocalPath': vm.q.LocalPath,
                    'NetworkPath': vm.q.NetworkPath,
                    'CJTime': vm.q.CJTime,
                    'LayoutFlag': vm.q.LayoutFlag,
                    'RadarChannelNum': vm.q.RadarChannelNum,
                    'CameraEnabled': vm.q.CameraEnabled,
                    'VideoFileCount': vm.q.VideoFileCount,
                    'VideoAEnabled': vm.q.VideoAEnabled,
                    'VideoBEnabled': vm.q.VideoBEnabled,
                    'VideoCEnabled': vm.q.VideoCEnabled,
                    'VideoDEnabled': vm.q.VideoDEnabled,
                    'GPSEnabled': vm.q.GPSEnabled,
                    'CreateDate': vm.q.CreateDate,
                    'UpdateDate': vm.q.UpdateDate,
                    'AddUserID': vm.q.AddUserID,
                    'DeptID': vm.q.DeptID,
                    'Memo': vm.q.Memo,
                },
                page: page
            }).trigger("reloadGrid");
        },
        // 删除

        // 重置
        reset: function () {
            document.getElementById("selectuserids").options.selectedIndex = 0; //回到初始状态
            $("#selectuserids").selectpicker('refresh');//对下拉框进行重置刷新
            vm.q.ProjectName = null;
            vm.q.ParentID = null;
            vm.q.LocalPath = null;
            vm.q.NetworkPath = null;
            vm.q.CJTime = null;
            vm.q.LayoutFlag = null;
            vm.q.RadarChannelNum = null;
            vm.q.CameraEnabled = null;
            vm.q.VideoFileCount = null;
            vm.q.VideoAEnabled = null;
            vm.q.VideoBEnabled = null;
            vm.q.VideoCEnabled = null;
            vm.q.VideoDEnabled = null;
            vm.q.GPSEnabled = null;
            vm.q.CreateDate = null;
            vm.q.UpdateDate = null;
            vm.q.AddUserID = null;
            vm.q.DeptID = null;
            vm.q.Memo = null;
            $("#gen-form")[0].reset();
        },
        reload: function () {
            vm.edit.ProjectName = null;
            vm.edit.ParentID = null;
            vm.edit.LocalPath = null;
            vm.edit.NetworkPath = null;
            vm.edit.CJTime = null;
            vm.edit.LayoutFlag = null;
            vm.edit.RadarChannelNum = null;
            vm.edit.CameraEnabled = null;
            vm.edit.VideoFileCount = null;
            vm.edit.VideoAEnabled = null;
            vm.edit.VideoBEnabled = null;
            vm.edit.VideoCEnabled = null;
            vm.edit.VideoDEnabled = null;
            vm.edit.GPSEnabled = null;
            vm.edit.CreateDate = null;
            vm.edit.UpdateDate = null;
            vm.edit.AddUserID = null;
            vm.edit.DeptID = null;
            vm.edit.Memo = null;
            // $("#editLayer")[0].reset();
            layer.closeAll();
            $("#jqGrid").trigger("reloadGrid");
        }
    }
});