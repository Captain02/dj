package

        com.sgccmt.web.modules.people;

import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.util.RJQ;
import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.system.domain.SysUser;
import com.sgccmt.web.modules.notice.NoticeService;
import com.sgccmt.web.modules.sysconfirm.ConfirmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 信息操作处理
 *
 * @author sxd
 * @date 2020-03-29
 */
@Controller
@RequestMapping("/people/people")
public class PeopleController extends BaseJQController //BaseController
{
    private String prefix = "people";
    @Autowired
    PeopleService peopleService;
    @Autowired
    ConfirmService confirmService;
    @Autowired
    NoticeService noticeService;

    @RequestMapping(value = "")
    public String people() {
        return prefix + "/people";
    }

    /**
     * 列表
     * sxd
     */
    @ResponseBody
    @GetMapping("/list")
    public RJQ selpeoplePage(Page page, HttpServletRequest request) throws Exception {


        PageData pageData = this.getPageData();
        page.setPd(pageData);
        List<PageData> list = peopleService.selectPeopleList(page);
        return RJQ.ok().put("page", page).put("data", list);
    }

    /**
     * 列表
     * sxd
     */
    @ResponseBody
    @GetMapping("/sexNum")
    public RJQ selpeoplePage(HttpServletRequest request) throws Exception {
        PageData pageData = this.getPageData();
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        if (pageData.get("deptId")== null) {
            pageData.put("deptId", userinfo.getDeptId());

        }
        List<PageData> list = peopleService.selectUserSexNum(pageData);

        return RJQ.ok().put("data", list);
    }

    @ResponseBody
    @GetMapping("/ageNum")
    public RJQ selectPeopleAgeNum(HttpServletRequest request) throws Exception {

        PageData pageData = this.getPageData();
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        if (pageData.get("deptId") == null) {
            pageData.put("deptId", userinfo.getDeptId());

        }
        List<PageData> list = peopleService.selectPeopleAgeNum(pageData);
        return RJQ.ok().put("data", list);
    }

    /**
     * 根据id获取数据
     * sxd
     */
    @ResponseBody
    @GetMapping("/findByid")
    public RJQ getpeopleInfo() throws Exception {
        PageData pageData = this.getPageData();
        PageData data = peopleService.selectPeopleById(pageData);
        return RJQ.ok().put("data", data);
    }


    /**
     * 新增
     * sxd
     */
    @ResponseBody
    @PostMapping("/adddata")
    public RJQ savepeopleData(@RequestBody PageData pageData) throws Exception {

        peopleService.insertPeople(pageData);
        return RJQ.ok();
    }

    /**
     * 修改
     * sxd
     */
    @ResponseBody
    @PostMapping("/updatedata")
    public RJQ editpeopleData(@RequestBody PageData pageData, HttpServletRequest request) throws Exception {
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        Long userId = userinfo.getUserId();
        int flag = 1;
        if (userId != 1 && !pageData.getInteger("deptid").equals(pageData.getInteger("deptids"))) {
            pageData.put("content", "管理员请求将" + pageData.getString("name") + "调到" + pageData.getString("DeptName"));
            pageData.put("peopleId", pageData.get("id"));
            confirmService.insertConfirm(pageData);
            pageData.put("deptid", null);

            flag = 2;
        } else if (userId == 1 && !pageData.getInteger("deptid").equals(pageData.getInteger("deptids"))) {
            PageData pageData1 = new PageData();
            pageData1.put("title", "人员调动");
            pageData1.put("content", pageData.get("name") + "从" + pageData.getString("DeptName") + "调到" + pageData.getString("DeptNames"));
            noticeService.insertNotice(pageData1);
        }
//        peopleService.updatePeople(pageData);


        return RJQ.ok().put("flag", flag);
    }

    /**
     * 批量删除
     * sxd
     */
    @ResponseBody
    @PostMapping("/del")
    public RJQ delpeopleDataList(@RequestBody Integer[] ids) throws Exception {
        PageData pageData = this.getPageData();
        for (Integer id : ids) {
            pageData.put("id", id);
            peopleService.deletePeopleByIds(pageData);
        }
        return RJQ.ok();
    }

}
