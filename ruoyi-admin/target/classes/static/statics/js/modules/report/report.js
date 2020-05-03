

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
        no:function (ids) {
            var r = layer.confirm('您确定要删除该用户吗?', {btn: ['确定', '取消'], title: "提示"}, function () {
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
        /*归属部门-新增-选择部门树*/
        selectDeptTrees: function () {
            var treeId = $("#treeIds").val();
            var deptId = $.common.isEmpty(treeId) ? "100" : $("#treeIds").val();
            var url = baseURL + "system/dept/selectDeptTree/" + deptId;
            var options = {
                title: '选择部门',
                width: "380",
                url: url,
                callBack: vm.doSubmits
            };
            $.modal.openOptions(options);
        },
        selectDataById: function (x) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {

                    'deptid': x,

                },
                page: page
            }).trigger("reloadGrid");
        },
        doSubmits: function (index, layero) {
            debugger
            var tree = layero.find("iframe")[0].contentWindow.$._tree;
            var body = layer.getChildFrame('body', index);
            $("#treeIds").val(body.find('#treeId').val());
            $("#treeNames").val(body.find('#treeName').val());
            if ($("#treeIds").val() == null) {
                alert("为空")
            }
            vm.edit.deptid = $("#treeIds").val();
            vm.edit.DeptName = $("#treeNames").val();
            layer.close(index);
        },
        // 添加页面
        addPage: function () {
            vm.reload();
            vm.index = layer.open({
                type: 1,
                area: ['60%', '60%'],
                shadeClose: false,
                shade: 0,
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
                url: baseURL + 'people/people/findByid',
                type: "GET",
                data: {
                    id: id,
                },
                success: function (result) {
                    vm.edit.id = result.data.id;
                    vm.edit.order = result.data.order;
                    vm.edit.name = result.data.name;
                    vm.edit.images = result.data.images;
                    vm.edit.sex = result.data.sex;
                    vm.edit.nation = result.data.nation;
                    vm.edit.place = result.data.place;
                    vm.edit.type = result.data.type;
                    vm.edit.personid = result.data.personid;
                    vm.edit.workid = result.data.workid;
                    vm.edit.education = result.data.education;
                    vm.edit.birthday = result.data.birthday;
                    vm.edit.worddate = result.data.worddate;
                    vm.edit.rcpcdate = result.data.rcpcdate;
                    vm.edit.zcpcdate = result.data.zcpcdate;
                    vm.edit.deptid = result.data.deptid;
                    vm.edit.deptids = result.data.deptid;
                    vm.edit.DeptName = result.data.DeptName;
                    vm.edit.work = result.data.work;
                    vm.edit.address = result.data.address;
                    vm.edit.telephone = result.data.telephone;
                    vm.edit.other = result.data.other;
                }
            })
            vm.index = layer.open({
                type: 1,
                shade: 0,
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
            var url = id == null ? "people/people/adddata" : "people/people/updatedata";
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
        reset: function () {9
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
            $("#gen-form")[0].reset();
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
            $("#editLayer")[0].reset();
            layer.closeAll();
            $("#jqGrid").trigger("reloadGrid");
        }
    }
});

function update(peopleId, deptId) {

    alert("是" + peopleId + "xx" + deptId)
}

function no(id) {
    vm.no(id);
}