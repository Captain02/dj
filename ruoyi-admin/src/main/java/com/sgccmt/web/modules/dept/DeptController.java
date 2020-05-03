package com.sgccmt.web.modules.dept;

import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.web.modules.people.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("depts/depts")
public class DeptController extends BaseJQController {

    @Autowired
    DeptService deptService;
    private String prefix = "modules/dept";
    @Autowired
    PeopleService peopleService;

    @RequestMapping(value = "")
    public String people() {
        return prefix + "/mydept";
    }


    //    获取建筑组成树
    @ResponseBody
    @GetMapping("/getXtJzZc")
    public List<PageData> getXtJzZc() throws Exception {
        Page page = new Page();
        PageData pageData = new PageData();
//        pageData.put("ID",1);
        page.setPd(pageData);
        page.setShowCount(Integer.MAX_VALUE);
        page.setCurrentPage(1);
        List<PageData> data = deptService.selectXtJzZcList(page);
        return data;
    }


}
