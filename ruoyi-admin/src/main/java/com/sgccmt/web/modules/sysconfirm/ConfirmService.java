package

        com.sgccmt.web.modules.sysconfirm;


import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;

import java.util.List;

/**
 *  服务层
 *
 * @author zsd
 * @date 2020-03-29
 */
public interface ConfirmService {

    //    列表
    List<PageData> selectConfirmList(Page page) throws Exception;
    //    id
    PageData selectConfirmById(PageData pageData) throws Exception;

    PageData selectDept(PageData pageData) throws Exception;

    //    保存
    void insertConfirm(PageData pageData) throws Exception;

    PageData selectDict(String sex) throws Exception;



    //    修改
    void updateConfirm(PageData pageData) throws Exception;

    //    删除
    void deleteConfirmByIds(PageData pageData) throws Exception;

}
