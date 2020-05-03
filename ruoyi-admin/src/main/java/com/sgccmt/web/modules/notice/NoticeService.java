package com.sgccmt.web.modules.notice;


import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;

import java.util.List;

/**
 * 【请填写功能名称】Service接口
 * 
 * @author ruoyi
 * @date 2020-04-06
 */
public interface NoticeService
{
    //    列表
    List<PageData> selectNoticeList(Page page) throws Exception;
    //    id
    PageData selectNoticeById(PageData pageData) throws Exception;

    //    保存
    void insertNotice(PageData pageData) throws Exception;

    //    修改
    void updateNotice(PageData pageData) throws Exception;

    //    删除
    void deleteNoticeByIds(PageData pageData) throws Exception;
}
