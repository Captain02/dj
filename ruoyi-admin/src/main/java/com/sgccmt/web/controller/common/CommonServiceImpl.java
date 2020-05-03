package com.sgccmt.web.controller.common;


import com.sgccmt.bhcz.dao.DaoSupport;
import com.sgccmt.bhcz.utils.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("commonService")
public class CommonServiceImpl implements CommonService {
    @Autowired
    DaoSupport daoSupport;

    @Override
    public List<PageData> getTable(String TableName, String ValueFieldName, String NameFieldName) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("TableName", TableName);
        map.put("ValueFieldName", ValueFieldName);
        map.put("NameFieldName", NameFieldName);
        return (List<PageData>) daoSupport.findForList("CommonMapper.selectCommon", map);
    }

    @Override
    public List<PageData> getTableCheckCustomer(PageData pageData) throws Exception {

        return (List<PageData>) daoSupport.findForList("CommonMapper.selectCommonCustomer", pageData);
    }

    @Override
    public List<PageData> getTableCheckUser(PageData pageData) throws Exception {

        return (List<PageData>) daoSupport.findForList("CommonMapper.selectCommonUser", pageData);
    }

    @Override
    public List<PageData> getTableZd(String TableName, String ValueFieldName, String NameFieldName, String dict_type) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("TableName", TableName);
        map.put("ValueFieldName", ValueFieldName);
        map.put("NameFieldName", NameFieldName);
        map.put("dict_type", dict_type);
        return (List<PageData>) daoSupport.findForList("CommonMapper.selectCommonZd", map);
    }

    @Override
    public List<PageData> getTableZdx(String TableName, String ValueFieldName, String NameFieldName, String dict_type) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("TableName", TableName);
        map.put("ValueFieldName", ValueFieldName);
        map.put("NameFieldName", NameFieldName);
        map.put("dict_type", dict_type);
        return (List<PageData>) daoSupport.findForList("CommonMapper.selectCommonZdx", map);
    }

    @Override
    public PageData getTables(int id) throws Exception {
        return (PageData) daoSupport.findForObject("CommonMapper.selectCommons", id);
    }

    @Override
    public PageData getUserById(Long id) throws Exception {
        PageData forObject = (PageData) daoSupport
                .findForObject("CommonMapper.selectCommons", id);

        return forObject;
    }
}
