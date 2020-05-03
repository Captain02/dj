package

        com.sgccmt.web.modules.grade;

import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.util.RJQ;
import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.system.domain.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *  信息操作处理
 *
 * @author sxd
 * @date 2019-09-26
 */
@Controller
@RequestMapping("/grade/grade")
public class GradeController extends BaseJQController //BaseController
{
    private String prefix = "grade" ;
    @Autowired
        GradeService gradeService;
    @RequestMapping(value = "")
    public String grade() {
        return prefix + "/grade" ;
    }
    /**
     * 列表
     * sxd
     */
    @ResponseBody
    @GetMapping("/list")
    public RJQ selgradePage(Page page) throws Exception {
        PageData pageData = this.getPageData();
        page.setPd(pageData);
        List<PageData> list = gradeService.selectGradeList(page);
        return RJQ.ok().put("page", page).put("data", list);
    }
    /**
     * 根据id获取数据
     * sxd
     */
    @ResponseBody
    @GetMapping("/findByid")
    public RJQ getgradeInfo() throws Exception {
        PageData pageData = this.getPageData();
        PageData data = gradeService.selectGradeById(pageData);
        return RJQ.ok().put("data", data);
    }
    /**
     * 新增
     * sxd
     */
    @ResponseBody
    @PostMapping("/adddata")
    public RJQ savegradeData(@RequestBody PageData pageData, HttpServletRequest request) throws Exception {
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        pageData.put("update_user",userinfo.getUserId());
            gradeService.insertGrade(pageData);
        return RJQ.ok();
    }
    /**
     * 修改
     * sxd
     */
    @ResponseBody
    @PostMapping("/updatedata")
    public RJQ editgradeData(@RequestBody PageData pageData) throws Exception {
            gradeService.updateGrade(pageData);
        return RJQ.ok();
    }
    /**
     * 批量删除
     * sxd
     */
    @ResponseBody
    @PostMapping("/del")
    public RJQ delgradeDataList(@RequestBody Integer[] ids) throws Exception {
        PageData pageData = this.getPageData();
        for (Integer id : ids) {
            pageData.put("id", id);
                gradeService.deleteGradeByIds(pageData);
        }
        return RJQ.ok();
    }
}
