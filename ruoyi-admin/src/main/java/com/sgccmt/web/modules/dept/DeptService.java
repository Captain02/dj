package com.sgccmt.web.modules.dept;

import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;

import java.util.List;

public interface DeptService {
    //    列表
    List<PageData> selectXtJzZcList(Page page) throws Exception;


}
