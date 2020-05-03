package com.sgccmt.web.modules.notice;


import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.util.RJQ;
import com.sgccmt.bhcz.utils.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 【请填写功能名称】Controller
 *
 * @author ruoyi
 * @date 2020-04-06
 */
@Controller
@RequestMapping("/notice/notice")
public class NoticeController extends BaseJQController {
    private String prefix = "modules/notice";
    @Autowired
        NoticeService noticeService;

    @RequestMapping(value = "")
    public String Notice() {
        return prefix + "/notices";
    }

    /**
     * 列表
     * sxd
     */
    @ResponseBody
    @GetMapping("/list")
    public RJQ selNoticePage(Page page) throws Exception {
        PageData pageData = this.getPageData();
        page.setPd(pageData);
        List<PageData> list = noticeService.selectNoticeList(page);
        return RJQ.ok().put("page", page).put("data", list);
    }

    /**
     * 根据id获取数据${tableComment}
     * sxd
     */
    @ResponseBody
    @GetMapping("/findByid")
    public RJQ getNoticeInfo() throws Exception {
        PageData pageData = this.getPageData();
        PageData data = noticeService.selectNoticeById(pageData);
        return RJQ.ok().put("data", data);
    }

    /**
     * 新增${tableComment}
     * sxd
     */
    @ResponseBody
    @PostMapping("/adddata")
    public RJQ saveNoticeData(@RequestBody PageData pageData) throws Exception {
            noticeService.insertNotice(pageData);
        return RJQ.ok();
    }

    /**
     * 修改${tableComment}
     * sxd
     */
    @ResponseBody
    @PostMapping("/updatedata")
    public RJQ editNoticeData(@RequestBody PageData pageData) throws Exception {
            noticeService.updateNotice(pageData);
        return RJQ.ok();
    }

    /**
     * 批量删除${tableComment}
     * sxd
     */
    @ResponseBody
    @PostMapping("/del")
    public RJQ delNoticeDataList(@RequestBody Integer[] ids) throws Exception {
        PageData pageData = this.getPageData();
        for (Integer id : ids) {
            pageData.put("id", id);
                noticeService.deleteNoticeByIds(pageData);
        }
        return RJQ.ok();
    }


}
