package

        com.sgccmt.web.modules.sysconfirm;

import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.util.RJQ;
import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.system.domain.SysUser;
import com.sgccmt.system.service.ISysUserService;
import com.sgccmt.web.modules.notice.NoticeService;
import com.sgccmt.web.modules.people.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 信息操作处理
 *
 * @author sxd
 * @date 2020-03-29
 */
@Controller
@RequestMapping("/confirm/confirm")
public class ConfirmController extends BaseJQController //BaseController
{
    private String prefix = "confirm";
    @Autowired
    ConfirmService confirmService;
    @Autowired
    NoticeService noticeService;
    @Autowired
    PeopleService peopleService;
    @Autowired
    private ISysUserService userService;
    @RequestMapping(value = "")
    public String Confirm() {
        return prefix + "/confirm";
    }

    /**
     * 列表
     * sxd
     */
    @ResponseBody
    @GetMapping("/list")
    public RJQ selConfirmPage(Page page) throws Exception {
        PageData pageData = this.getPageData();
        page.setPd(pageData);
        List<PageData> list = confirmService.selectConfirmList(page);
        return RJQ.ok().put("page", page).put("data", list);
    }

    /**
     * 根据id获取数据
     * sxd
     */
    @ResponseBody
    @GetMapping("/findByid")
    public RJQ getConfirmInfo() throws Exception {
        PageData pageData = this.getPageData();
        PageData data = confirmService.selectConfirmById(pageData);
        return RJQ.ok().put("data", data);
    }

    /**
     * 新增
     * sxd
     */
    @ResponseBody
    @PostMapping("/adddata")
    public RJQ saveConfirmData(@RequestBody PageData pageData) throws Exception {

        confirmService.insertConfirm(pageData);
        return RJQ.ok();
    }

    /**
     * 修改
     * sxd
     */
    @ResponseBody
    @PostMapping("/updatedata")
    public RJQ editConfirmData(@RequestBody PageData pageData) throws Exception {
//查询本身数据
        SysUser sysUser = userService.selectUserById(pageData.getLong("id"));
//        查询部门
        PageData pageData2 = confirmService.selectDept(pageData);
        peopleService.updateUser(pageData);
        PageData pageData1 = new PageData();
        pageData1.put("title", "人员调动");
        pageData1.put("content", sysUser.getUserName() + "从" +sysUser.getDept().getDeptName() + "调到" + pageData2.getString("dept_name"));
        noticeService.insertNotice(pageData1);
        return RJQ.ok();
    }

    /**
     * 批量删除
     * sxd
     */
    @ResponseBody
    @PostMapping("/del")
    public RJQ delConfirmDataList(@RequestBody Integer id) throws Exception {
        PageData pageData = this.getPageData();
        pageData.put("id", id);
        confirmService.deleteConfirmByIds(pageData);
        return RJQ.ok();
    }
}
