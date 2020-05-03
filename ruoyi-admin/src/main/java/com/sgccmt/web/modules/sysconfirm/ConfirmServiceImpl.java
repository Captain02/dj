package com.sgccmt.web.modules.sysconfirm;

import com.sgccmt.bhcz.dao.DaoSupport;
import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 *  服务层实现
 *
 * @author zyc
 * @date 2020-03-29
 */
@Service("confirmService")
public class ConfirmServiceImpl implements ConfirmService {
    @Autowired
    DaoSupport daoSupport;

    //    列表
    @Override
    public List<PageData> selectConfirmList(Page page) throws Exception {
        return (List<PageData>) daoSupport.findForList("ConfirmMapper.selectConfirmlistPage", page);
    }
    //    id
    @Override
    public PageData selectConfirmById(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("ConfirmMapper.selectConfirmById", pageData);
    }
    //    id
    @Override
    public PageData selectDict(String sex) throws Exception {
        return (PageData) daoSupport.findForObject("ConfirmMapper.selectDict", sex);
    }
    //    id
    @Override
    public PageData selectDept(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("ConfirmMapper.selectDept", pageData);
    }
    //    保存
    @Override
    public void insertConfirm(PageData pageData) throws Exception {
        daoSupport.save("ConfirmMapper.insertConfirm", pageData);
    }

    //    修改
    @Override
    public void updateConfirm(PageData pageData) throws Exception {
        daoSupport.update("ConfirmMapper.updateConfirm", pageData);
    }

    //    删除
    @Override
    public void deleteConfirmByIds(PageData pageData) throws Exception {
        daoSupport.delete("ConfirmMapper.deleteConfirmById", pageData);
    }

}
