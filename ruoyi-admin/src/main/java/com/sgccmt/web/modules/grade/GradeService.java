package

        com.sgccmt.web.modules.grade;


import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;

import java.util.List;

/**
 *  服务层
 *
 * @author zsd
 * @date 2019-09-26
 */
public interface GradeService {

    //    列表
    List<PageData> selectGradeList(Page page) throws Exception;
    //    id
    PageData selectGradeById(PageData pageData) throws Exception;

    //    保存
    void insertGrade(PageData pageData) throws Exception;

    //    修改
    void updateGrade(PageData pageData) throws Exception;

    //    删除
    void deleteGradeByIds(PageData pageData) throws Exception;

}
