package com.sgccmt.web.modules.dept;

import com.sgccmt.bhcz.dao.DaoSupport;
import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("deptservice")
public class DeptServiceImp implements DeptService{


    @Autowired
    DaoSupport daoSupport;

    //    列表
    @Override
    public List<PageData> selectXtJzZcList(Page page) throws Exception {
        return (List<PageData>) daoSupport.findForList("XtJzZcMapper.selectXtJzZclistPage", page);
    }

}
