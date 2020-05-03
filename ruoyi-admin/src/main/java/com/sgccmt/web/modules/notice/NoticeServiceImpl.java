package com.sgccmt.web.modules.notice;


import com.sgccmt.bhcz.dao.DaoSupport;
import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2020-04-06
 */
@Service
public class NoticeServiceImpl implements NoticeService
{
    @Autowired
    DaoSupport daoSupport;

    //    列表
    @Override
    public List<PageData> selectNoticeList(Page page) throws Exception {
        return (List<PageData>) daoSupport.findForList("NoticeMapper.selectNoticelistPage", page);
    }
    //    id
    @Override
    public PageData selectNoticeById(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("NoticeMapper.selectNoticeById", pageData);
    }
    //    保存
    @Override
    public void insertNotice(PageData pageData) throws Exception {
        daoSupport.save("NoticeMapper.insertNotice", pageData);
    }

    //    修改
    @Override
    public void updateNotice(PageData pageData) throws Exception {
        daoSupport.update("NoticeMapper.updateNotice", pageData);
    }

    //    删除
    @Override
    public void deleteNoticeByIds(PageData pageData) throws Exception {
        daoSupport.delete("NoticeMapper.deleteNoticeById", pageData);
    }
}
