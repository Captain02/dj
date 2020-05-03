package

        com.sgccmt.web.modules.people;


import com.sgccmt.bhcz.entity.Page;
import com.sgccmt.bhcz.utils.PageData;


import java.util.List;

/**
 *  服务层
 *
 * @author zsd
 * @date 2020-03-29
 */
public interface PeopleService {

    //    列表
    List<PageData> selectPeopleList(Page page) throws Exception;
    //    id
    PageData selectPeopleById(PageData pageData) throws Exception;

    PageData selectUserById(PageData pageData) throws Exception;

    PageData loginCheck(String deptid) throws Exception;

    List<PageData> selectUserSexNum(PageData pageData) throws Exception;

    List<PageData> selectPeopleAgeNum(PageData pageData) throws Exception;

    //    保存
    void insertPeople(PageData pageData) throws Exception;


    //    修改
    void updateUser(PageData pageData) throws Exception;

    //    删除
    void deletePeopleByIds(PageData pageData) throws Exception;

}
