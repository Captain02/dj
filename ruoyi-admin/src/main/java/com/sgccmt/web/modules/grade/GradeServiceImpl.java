package com.sgccmt.web.modules.grade;

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
 * @date 2019-09-26
 */
@Service("gradeService")
public class GradeServiceImpl implements GradeService {
    @Autowired
    DaoSupport daoSupport;

    //    列表
    @Override
    public List<PageData> selectGradeList(Page page) throws Exception {
        return (List<PageData>) daoSupport.findForList("GradeMapper.selectGradelistPage", page);
    }
    //    id
    @Override
    public PageData selectGradeById(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("GradeMapper.selectGradeById", pageData);
    }
    //    保存
    @Override
    public void insertGrade(PageData pageData) throws Exception {
        daoSupport.save("GradeMapper.insertGrade", pageData);
    }

    //    修改
    @Override
    public void updateGrade(PageData pageData) throws Exception {
        daoSupport.update("GradeMapper.updateGrade", pageData);
    }

    //    删除
    @Override
    public void deleteGradeByIds(PageData pageData) throws Exception {
        daoSupport.delete("GradeMapper.deleteGradeById", pageData);
    }

}
