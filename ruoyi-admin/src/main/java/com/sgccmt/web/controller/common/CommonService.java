package com.sgccmt.web.controller.common;


import com.sgccmt.bhcz.utils.PageData;

import java.util.List;

public interface CommonService {
    List<PageData> getTable(String tableName, String ValueFieldName, String NameFieldName) throws Exception;

    List<PageData> getTableCheckCustomer(PageData pageData) throws Exception;

    List<PageData> getTableCheckUser(PageData pageData) throws Exception;

    List<PageData> getTableZd(String tableName, String ValueFieldName, String NameFieldName, String dict_type) throws Exception;

    List<PageData> getTableZdx(String tableName, String ValueFieldName, String NameFieldName, String dict_type) throws Exception;

    PageData getTables(int id) throws Exception;

    PageData getUserById(Long id) throws Exception;

}
