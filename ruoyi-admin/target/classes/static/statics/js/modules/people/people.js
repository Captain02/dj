$(function () {
    jqgrid();
    piechart();
    zFunction();
});
function jqgrid() {
    $("#jqGrid").jqGrid({
        url: baseURL + 'people/people/list',
        datatype: "json",
        colModel: [
            {label: '用户id', name: 'id', index: 'id', width: 0, key: true, hidden: true},
            {label: '序号', name: 'order', index: 'order', width: 80, hidden: true},
            {label: '姓名', name: 'name', index: 'name', width: 80},
            {label: '照片', name: 'images', index: 'images', width: 80},
            {label: '性别', name: 'sexs', index: 'sexs', width: 80},
            {label: '年龄', name: 'age', index: 'age', width: 80},
            {label: '民族', name: 'nation', index: 'nation', width: 80},
            {label: '籍贯', name: 'place', index: 'place', width: 80},
            {label: '人员类别', name: 'type', index: 'type', width: 80},
            {label: '身份证号', name: 'personid', index: 'personid', width: 120},
            {label: '工号', name: 'workid', index: 'workid', width: 80},
            {label: '文化程度', name: 'education', index: 'education', width: 80},
            {label: '出生日期', name: 'birthday', index: 'birthday', width: 120},
            {label: '参加工作日期', name: 'worddate', index: 'worddate', width: 120},
            {label: '入党日期', name: 'rcpcdate', index: 'rcpcdate', width: 120},
            {label: '转正日期', name: 'zcpcdate', index: 'zcpcdate', width: 120},
            // {label: '所在党支部', name: 'deptid', index: 'deptid', width: 80},
            {label: '所在党支部', name: 'DeptName', index: 'DeptName', width: 150},
            {label: '工作单位', name: 'work', index: 'work', width: 80},
            {label: '家庭地址', name: 'address', index: 'address', width: 80},
            {label: '联系电话', name: 'telephone', index: 'telephone', width: 120},
            {label: '其他', name: 'other', index: 'other', width: 80}

        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
        }
    });
    $(window).on('load', function () {

        $('.selectpicker').selectpicker({
            'selectedText': 'cat',
            noneSelectedText: '请选择'
        });
    });


}
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
            age: null,
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
            age: null,
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
            DeptNames: null,
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
        selectDataById:function (x) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {

                    'deptid':x,

                },
                page: page
            }).trigger("reloadGrid");

            piechart(x);
            zFunction(x);
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
                    vm.edit.age = result.data.age;
                    vm.edit.type = result.data.type;
                    vm.edit.personid = result.data.personid;
                    vm.edit.workid = result.data.workid;
                    vm.edit.education = result.data.education;
                    vm.edit.birthday = result.data.birthday;
                    vm.edit.worddate = result.data.worddate;
                    vm.edit.rcpcdate = result.data.rcpcdate;
                    vm.edit.zcpcdate = result.data.zcpcdate;
                    vm.edit.deptid = result.data.deptid;
                    vm.edit.deptids= result.data.deptid;
                    vm.edit.DeptName= result.data.DeptName;
                    vm.edit.DeptNames= result.data.DeptName;
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
            debugger
            var url = id == null ? "people/people/adddata" : "people/people/updatedata";
            $.ajax({
                url: baseURL + url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(vm.edit),
                success: function (result) {
                    debugger

                    vm.reload();
                    if(result.flag==2){
                        layer.alert("调动部门请求已发送给超级管理员");
                    }
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
                    'age': vm.q.age,
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
                            debugger
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
            vm.q.age = null;
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
            vm.edit.deptids = null;
            vm.edit.work = null;
            vm.edit.DeptNames = null;
            vm.edit.age = null;
            vm.edit.address = null;
            vm.edit.telephone = null;
            vm.edit.other = null;
            $("#editLayer")[0].reset();
            layer.closeAll();
            $("#jqGrid").trigger("reloadGrid");
        }
    }
});


// 饼状图

function piechart(x) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart1'));
    // 指定图表的配置项和数据
    option = {
        // 标题
        title: {
            text: '男女分布',
            x: 'left'
        },

        color: ['#ff2b24', '#ffa829', '#f6ff62', '#2e7caf'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {

            bottom: 5,
            left: 'center',
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 30,
            icon: "circle",
            data: (function () {
                var arr = [];
                $.ajax({
                    type: "GET",
                    async: false, //同步执行
                    url: "/people/people/sexNum",
                    data: {
                        deptId: x,
                    },
                    dataType: "json",//返回数据形式为json
                    success: function (result) {
                        if (result) {
                            for (var i = 0; i < result.data.length; i++) {
                                arr.push(result.data[i].sex
                                );
                            }
                        }

                    },
                    error: function (errorMsg) {
                        alert("不好意思,图表请求数据失败啦!11");
                        service1.hideLoading();
                    }
                })
                return arr;
            })(),
        },
        stillShowZeroSum: false,
        series: [
            {
                // 标题
                name: '',
                // 类型
                type: 'pie',
                // 饼状大小
                radius: '50%',
                // 居中
                center: ['50%', '40%'],
                // data: [
                //     {value: 1, name: '后台_bug'},
                //     {value: 3, name: 'IOS_bug'},
                //     {value: 7, name: 'Android_bug'},
                //     {value: 4, name: 'H5_bug'},
                // ],
                data: (function () {
                    var arr = [];
                    $.ajax({
                        type: "GET",
                        async: false, //同步执行
                        url: "/people/people/sexNum",
                        data: {
                            deptId: x
                        },
                        dataType: "json",//返回数据形式为json
                        success: function (result) {
                            if (result) {
                                for (var i = 0; i < result.data.length; i++) {
                                    arr.push({
                                        name: result.data[i].sex,
                                        value: result.data[i].nums
                                    });
                                }
                            }

                        },
                        error: function (errorMsg) {
                            alert("不好意思,图表请求数据失败啦!222");

                        }
                    })
                    return arr;
                })()
                // itemStyle: {
                //     emphasis: {
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(128, 128, 128, 0.5)'
                //     }
                // }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.on('click', function (params) {
        switch (params.name) {
            case '报警':
                vm.getCallNum();
                break;
            case '火警':
                vm.getFireNum();
                break;
            case '预警':
                vm.getDownNum();
                break;
            case '故障':
                vm.getfailtNum();
                break;

        }
        // alert("饼图点击事件");window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));

    })
}

// 柱状图
function zFunction(x) {
    var service1 = echarts.init(document.getElementById('chart2'));
    option1 = {
        // 标题
        title: {
            text: '年龄分布',
            x: 'left'
        },
        color: ['#FFFF00'],
        // 图列提示框，默认不显示
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        // x轴竖
        xAxis: [
            {
                type: 'category',
                // 底下内容
                data: [],
                axisTick: {
                    alignWithLabel: true
                },

                axisLine: {
                    lineStyle: {
                        width: 1
                    }
                    , axisLabel: {

                        fontSize: 8,//字体大小
                    },
                },
            }
        ],

        // y轴横
        yAxis:
            [
                {
                    type: 'value',
                    name: '个',
                    //     min: '0',
                    //     max: '12',
                    //     axisLabel: {show: true, interval: 'auto', formatter: '{value}(个)'},
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1
                        }
                    },
                }
            ],
        // 值
        series: [
            {
                type: 'bar',
                barWidth: '60%',
                // 对应的柱状显示长度
                data: [],
                barMaxWidth: 30,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            // 柱状上颜色
                            {offset: 0, color: '#FFFF00'},
                            // 柱状下颜色
                            {offset: 1, color: '#FF0000'}
                        ]),
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                fontSize: 14
                            }
                        }
                    },
                }
            }
        ]
    };
    service1.showLoading();
    var names = [];    //类别数组（实际用来盛放X轴坐标值）
    var nums = [];    //销量数组（实际用来盛放Y坐标值）
    $.ajax({
        type: "GET",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "/people/people/ageNum",    //请求发送到TestServlet处
        data: {
            deptId: x,

        },    //返回数据形式为json
        success: function (result) {
            debugger
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for (var i = 0; i < result.data.length; i++) {
                    names.push(result.data[i].age+"岁");    //挨个取出类别并填入类别数组
                    nums.push(result.data[i].num);    //挨个取出销量并填入销量数组
                }
                service1.hideLoading();    //隐藏加载动画
                service1.setOption({        //加载数据图表
                    xAxis: {
                        color: '#FFFF00',
                        data: names,
                        // axisLabel: {
                        //     interval:0,
                        //     rotate:40
                        // }
                    },
                    yAxis: {
                        // type: 'value'
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '数量',
                        type: 'bar',
                        data: nums
                    }]
                });

            }

        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            service1.hideLoading();
        }
    })
    service1.setOption(option1);


}