$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'grade/grade/list',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: 'id', width: 0, key: true, hidden: true},
            {label: '等级', name: 'grade', index: 'grade', width: 80},
            {label: '折扣', name: 'discount', index: 'discount', width: 80},


        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
    $(window).on('load', function () {

        $('.selectpicker').selectpicker({
            'selectedText': 'cat',
            noneSelectedText: '请选择'
        });
    });
});

var vm = new Vue({
    el: '#rrapp',

    data: {
        q: {
            grade: null,
            discount: null,
            update_user: null,
            memo1: null,
            memo2: null,
        },
        showList: true,
        title: null,
        index: null,
        edit: {
            id: null,
            grade: null,
            discount: null,
            update_user: null,
            memo1: null,
            memo2: null,
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
        ]
    },
    created: function () {
        this.binddropdown();
    },
    methods: {
        binddropdown: function () {
            //字典表下拉框
            this.dropdown = BindDropDownControlsdy('sys_dict_data', 'dict_code', 'dict_label', '起重机类型管理')
            // 普通下拉框
            this.dropdown1 = BindDropDownControls('testsg', 'id', 'tname');
        },

        // 添加页面
        addPage: function () {
            vm.reload();
            vm.index = layer.open({
                type: 1,
                area: ['60%', '60%'],
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
                url: baseURL + 'grade/grade/findByid',
                type: "GET",
                data: {
                    id: id,
                },
                success: function (result) {
                    vm.edit.id = result.data.id;
                    vm.edit.grade = result.data.grade;
                    vm.edit.discount = result.data.discount;
                    vm.edit.update_user = result.data.update_user;
                    vm.edit.memo1 = result.data.memo1;
                    vm.edit.memo2 = result.data.memo2;
                }
            })
            vm.index = layer.open({
                type: 1,
                area: ['60%', '60%'],
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
            var url = id == null ? "grade/grade/adddata" : "grade/grade/updatedata";
            $.ajax({
                url: baseURL + url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(vm.edit),
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
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'grade': vm.q.grade,
                    'discount': vm.q.discount,
                    'update_user': vm.q.update_user,
                    'memo1': vm.q.memo1,
                    'memo2': vm.q.memo2,
                },
                page: page
            }).trigger("reloadGrid");
        },
        // 删除
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }
            var r = layer.confirm('您确定要删除该数据吗?', {btn: ['确定', '取消'], title: "提示"}, function () {
                if (r) {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "/grade/grade/del",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code = 1) {
                                vm.reload();
                            } else {
                                alert("删除失败")
                            }

                        }
                    });
                }
            });
        },
        // 重置
        reset: function () {
            vm.q.grade = null;
            vm.q.discount = null;
            vm.q.update_user = null;
            vm.q.memo1 = null;
            vm.q.memo2 = null;
            $("#gen-form")[0].reset();
        },
        reload: function () {
            vm.edit.grade = null;
            vm.edit.discount = null;
            vm.edit.update_user = null;
            vm.edit.memo1 = null;
            vm.edit.memo2 = null;
            $("#editLayer")[0].reset();
            layer.closeAll();
            $("#jqGrid").trigger("reloadGrid");
        }
    }
});