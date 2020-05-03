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
            DeptName: null,
        },
        notice:[],
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
        this.getGg()

    },
    methods: {
        getGg: function () {
debugger
            var self=this;
            $.ajax({
                url: ctx+ 'notice/notice/list',
                dataType: "json",//数据格式
                data:{

                },
                type: "get",//请求方式
                async: false,//是否异步请求
                success: function (data) {   //如何发送成功
                    if (data != null) {
                        // console.log(data.rows)
                        self.notice=data.data;
                    } else {
                        //ajaxError(data.Message);
                    }
                }
            });

        }
    }
});