package com.sgccmt.web.modules.people;

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
@Service("peopleService")
public class PeopleServiceImpl implements PeopleService {
    @Autowired
    DaoSupport daoSupport;

    //    列表
    @Override
    public List<PageData> selectPeopleList(Page page) throws Exception {
        return (List<PageData>) daoSupport.findForList("PeopleMapper.selectPeoplelistPage", page);
    }
    @Override
    public PageData loginCheck(String deptid) throws Exception {
        return (PageData) daoSupport.findForObject("XtJzZcMapper.loginChecks", deptid);
    }

    //    id
    @Override
    public PageData selectPeopleById(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("PeopleMapper.selectPeopleById", pageData);
    }
    //    id
    @Override
    public PageData selectUserById(PageData pageData) throws Exception {
        return (PageData) daoSupport.findForObject("PeopleMapper.selectUserById", pageData);
    }
    //    男女数量
    @Override
    public List<PageData> selectUserSexNum(PageData pageData) throws Exception {
        return (List<PageData>) daoSupport.findForList("PeopleMapper.selectUserSexNum", pageData);
    }
    //    年龄数量
    @Override
    public List<PageData> selectPeopleAgeNum(PageData pageData) throws Exception {
        return (List<PageData>) daoSupport.findForList("PeopleMapper.selectPeopleAgeNum", pageData);
    }
    //    保存
    @Override
    public void insertPeople(PageData pageData) throws Exception {
        daoSupport.save("PeopleMapper.insertPeople", pageData);
    }


    //    修改
    @Override
    public void updateUser(PageData pageData) throws Exception {
        daoSupport.update("PeopleMapper.updateUser", pageData);
    }

    //    删除
    @Override
    public void deletePeopleByIds(PageData pageData) throws Exception {
        daoSupport.delete("PeopleMapper.deletePeopleById", pageData);
    }

}
