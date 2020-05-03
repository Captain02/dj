$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'confirm/confirm/list',
        datatype: "json",
        colModel: [
            {label: '用户id', name: 'id', index: 'id', width: 0, key: true, hidden: true},
            {label: '内容', name: 'content', index: 'content', width: 80},
            {label: '部门id', name: 'deptid', index: 'deptid', width: 80, hidden: true},
            {label: '用户id', name: 'peopleId', index: 'peopleId', width: 80, hidden: true},

            {
                label: '操作', name: 'deptid', index: 'deptid', width: 20, align: 'center',
                formatter: function (cellValue, grid, rows, state) {
                    debugger
                    return "<a  class=\"btn btn-warning\" href=\"javascript:void(0)\" onclick=\"update(" + rows.peopleId + "," + rows.deptid + "," + rows.id + ")\" ><i class=\"fa fa-plus\"></i>是</a><a  class=\"btn btn-danger btn-del\" href=\"javascript:void(0)\" onclick=\"no(" + rows.id + ")\" ><i class=\"fa fa-remove\"></i>否</a>"


                }
            }

        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
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
            order: null,
            name: null,
            images: null,
            sex: null,
            nation: null,
            place: null,
            type: null,
            personid: null,
            workid: null,
            education: null,
            birthday: null,
            worddate: null,
            rcpcdate: null,
            zcpcdate: null,
            deptid: null,
            work: null,
            address: null,
            telephone: null,
            other: null,
        },
        showList: true,
        title: null,
        index: null,
        edit: {
            id: null,
            order: null,
            name: null,
            images: null,
            sex: null,
            nation: null,
            place: null,
            type: null,
            personid: null,
            workid: null,
            education: null,
            birthday: null,
            worddate: null,
            rcpcdate: null,
            zcpcdate: null,
            deptid: null,
            peopleId: null,
            work: null,
            address: null,
            telephone: null,
            other: null,
            deptids: null,
            DeptName: null,
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
        this.bindsearchdropdown();
        this.binddropdown();
    },
    methods: {
        no: function (ids) {
            debugger
            var r = layer.confirm('您确定要拒绝这次调动吗?', {btn: ['确定', '取消'], title: "提示"}, function () {
                if (r) {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "/confirm/confirm/del",
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
        }
        ,
        updatedata:function (peopleId, deptId,id) {
            vm.edit.id=peopleId;
            vm.edit.deptid=deptId;

            $.ajax({
                url: baseURL + "confirm/confirm/updatedata",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(vm.edit),
                success: function (result) {
                    vm.dels(id);
                    layer.close(vm.index)
                },
                btn2: function () {
                    vm.reload();
                }
            })
        },
        dels:function (ids) {
            $.ajax({
                type: "POST",
                url: baseURL + "/confirm/confirm/del",
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
        },
        binddropdown: function () {
            //字典表下拉框
            this.dropdown = BindDropDownControlsdyx('sys_dict_data', 'dict_code', 'dict_label', 'sys_user_sex')
            // // 普通下拉框
            // this.dropdown = BindDropDownControls('people', 'id', 'name');
        },
        // 搜索下拉
        bindsearchdropdown: function () {
            // BindDropDownControl('selectuserid', 'testsg', 'id', 'tname')
        },

        <!--新增修改-->
        saveOrUpdate: function (id) {
            var url ="people/people/updatedata";
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
                    'order': vm.q.order,
                    'name': vm.q.name,
                    'images': vm.q.images,
                    'sex': vm.q.sex,
                    'nation': vm.q.nation,
                    'place': vm.q.place,
                    'type': vm.q.type,
                    'personid': vm.q.personid,
                    'workid': vm.q.workid,
                    'education': vm.q.education,
                    'birthday': vm.q.birthday,
                    'worddate': vm.q.worddate,
                    'rcpcdate': vm.q.rcpcdate,
                    'zcpcdate': vm.q.zcpcdate,
                    'deptid': vm.q.deptid,
                    'work': vm.q.work,
                    'address': vm.q.address,
                    'telephone': vm.q.telephone,
                    'other': vm.q.other,
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
            var r = layer.confirm('您确定要删除该用户吗?', {btn: ['确定', '取消'], title: "提示"}, function () {
                if (r) {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "/people/people/del",
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
            9
            vm.q.order = null;
            vm.q.name = null;
            vm.q.images = null;
            vm.q.sex = null;
            vm.q.nation = null;
            vm.q.place = null;
            vm.q.type = null;
            vm.q.personid = null;
            vm.q.workid = null;
            vm.q.education = null;
            vm.q.birthday = null;
            vm.q.worddate = null;
            vm.q.rcpcdate = null;
            vm.q.zcpcdate = null;
            vm.q.deptid = null;
            vm.q.work = null;
            vm.q.address = null;
            vm.q.telephone = null;
            vm.q.other = null;
        },
        reload: function () {
            vm.edit.order = null;
            vm.edit.name = null;
            vm.edit.images = null;
            vm.edit.sex = null;
            vm.edit.nation = null;
            vm.edit.place = null;
            vm.edit.type = null;
            vm.edit.personid = null;
            vm.edit.workid = null;
            vm.edit.education = null;
            vm.edit.birthday = null;
            vm.edit.worddate = null;
            vm.edit.rcpcdate = null;
            vm.edit.zcpcdate = null;
            vm.edit.deptid = null;
            vm.edit.work = null;
            vm.edit.address = null;
            vm.edit.telephone = null;
            vm.edit.other = null;
            layer.closeAll();
            $("#jqGrid").trigger("reloadGrid");
        }
    }
});

function update(peopleId, deptId,id) {

    vm.updatedata(peopleId, deptId,id);

}

function no(id) {
    vm.no(id);
}