package com.sgccmt.web.controller.system;

import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.common.annotation.Log;
import com.sgccmt.common.constant.UserConstants;
import com.sgccmt.common.core.controller.BaseController;
import com.sgccmt.common.core.domain.AjaxResult;
import com.sgccmt.common.core.page.TableDataInfo;
import com.sgccmt.common.enums.BusinessType;
import com.sgccmt.common.utils.poi.ExcelUtil;
import com.sgccmt.framework.shiro.service.SysPasswordService;
import com.sgccmt.framework.util.ShiroUtils;
import com.sgccmt.system.domain.SysDept;
import com.sgccmt.system.domain.SysUser;
import com.sgccmt.system.service.ISysDeptService;
import com.sgccmt.system.service.ISysPostService;
import com.sgccmt.system.service.ISysRoleService;
import com.sgccmt.system.service.ISysUserService;
import com.sgccmt.web.modules.notice.NoticeService;
import com.sgccmt.web.modules.people.PeopleService;
import com.sgccmt.web.modules.sysconfirm.ConfirmService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户信息
 *
 * @author ruoyi
 */
@Controller
@RequestMapping("/system/user")
public class SysUserController extends BaseController {
    private String prefix = "system/user";

    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysRoleService roleService;
    @Autowired
    private PeopleService peopleService;

    @Autowired
    private ISysDeptService deptService;
    @Autowired
    private ISysPostService postService;
    @Autowired
    ConfirmService confirmService;
    @Autowired
    NoticeService noticeService;
    @Autowired
    private SysPasswordService passwordService;

    @RequiresPermissions("system:user:view")
    @GetMapping()
    public String user() {
        return prefix + "/user";
    }

    @RequiresPermissions("system:user:list")
    @PostMapping("/list")
    @ResponseBody
    public TableDataInfo list(SysUser user, HttpServletRequest request) throws Exception {

        startPage();
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        if (userinfo.getDept().getParentId() != 0&&userinfo.getRoles().get(0).getRoleId()!=1) {
            user.setUserId(userinfo.getUserId());
        }
        List<SysUser> list = userService.selectUserList(user);
        for (SysUser sysUser : list) {
            PageData pageData = confirmService.selectDict(sysUser.getSex());
            sysUser.setSexs(pageData.getString("dict_label"));
        }
        return getDataTable(list);
    }

    @Log(title = "用户管理", businessType = BusinessType.EXPORT)
    @RequiresPermissions("system:user:export")
    @PostMapping("/export")
    @ResponseBody
    public AjaxResult export(SysUser user) {
        List<SysUser> list = userService.selectUserList(user);
        ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
        return util.exportExcel(list, "用户数据");
    }

    @Log(title = "用户管理", businessType = BusinessType.IMPORT)
    @RequiresPermissions("system:user:import")
    @PostMapping("/importData")
    @ResponseBody
    public AjaxResult importData(MultipartFile file, boolean updateSupport) throws Exception {
        ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
        List<SysUser> userList = util.importExcel(file.getInputStream());
        String operName = ShiroUtils.getSysUser().getLoginName();
        String message = userService.importUser(userList, updateSupport, operName);
        return AjaxResult.success(message);
    }

    @RequiresPermissions("system:user:view")
    @GetMapping("/importTemplate")
    @ResponseBody
    public AjaxResult importTemplate() {
        ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
        return util.importTemplateExcel("用户数据");
    }

    /**
     * 新增用户
     */
    @GetMapping("/add")
    public String add(ModelMap mmap) {
        mmap.put("roles", roleService.selectRoleAll());
        mmap.put("posts", postService.selectPostAll());
        return prefix + "/add";
    }

    /**
     * 新增保存用户
     */
    @RequiresPermissions("system:user:add")
    @Log(title = "用户管理", businessType = BusinessType.INSERT)
    @PostMapping("/add")
    @ResponseBody
    public AjaxResult addSave(@Validated SysUser user) {
        if (UserConstants.USER_NAME_NOT_UNIQUE.equals(userService.checkLoginNameUnique(user.getLoginName()))) {
            return error("新增用户'" + user.getLoginName() + "'失败，登录账号已存在");
        } else if (UserConstants.USER_PHONE_NOT_UNIQUE.equals(userService.checkPhoneUnique(user))) {
            return error("新增用户'" + user.getLoginName() + "'失败，手机号码已存在");
        } else if (UserConstants.USER_EMAIL_NOT_UNIQUE.equals(userService.checkEmailUnique(user))) {
            return error("新增用户'" + user.getLoginName() + "'失败，邮箱账号已存在");
        }
        user.setSalt(ShiroUtils.randomSalt());
        user.setPassword(passwordService.encryptPassword(user.getLoginName(), user.getPassword(), user.getSalt()));
        user.setCreateBy(ShiroUtils.getLoginName());
        return toAjax(userService.insertUser(user));
    }

    /**
     * 修改用户
     */
    @GetMapping("/edit/{userId}")
    public String edit(@PathVariable("userId") Long userId, ModelMap mmap) {
        mmap.put("user", userService.selectUserById(userId));
        mmap.put("roles", roleService.selectRolesByUserId(userId));
        mmap.put("posts", postService.selectPostsByUserId(userId));
        return prefix + "/edit";
    }

    /**
     * 修改保存用户
     */
    @RequiresPermissions("system:user:edit")
    @Log(title = "用户管理", businessType = BusinessType.UPDATE)
    @PostMapping("/edit")
    @ResponseBody
    public AjaxResult editSave(@Validated SysUser user, HttpServletRequest request) throws Exception {
        SysUser userinfo = (SysUser) request.getSession().getAttribute("userinfo");
        Long userId = userinfo.getUserId();
        int flag = 1;
        if (UserConstants.USER_PHONE_NOT_UNIQUE.equals(userService.checkPhoneUnique(user))) {
            return error("修改用户'" + user.getLoginName() + "'失败，手机号码已存在");
        } else if (UserConstants.USER_EMAIL_NOT_UNIQUE.equals(userService.checkEmailUnique(user))) {
            return error("修改用户'" + user.getLoginName() + "'失败，邮箱账号已存在");
        }
        user.setUpdateBy(ShiroUtils.getLoginName());
//        原本数据
        SysUser sysUser = userService.selectUserById(userId);

        PageData pageData = new PageData();
        PageData pageData1 = new PageData();
        SysDept sysDept = deptService.selectDeptById(Long.valueOf(user.getDeptId()));

        PageData pageData2 = peopleService.loginCheck(userinfo.getDeptId());
//        如果为超级管理员
        if (userinfo.getDept().getParentId() != 0&&userinfo.getRoles().get(0).getRoleId()!=1 && !sysUser.getDeptId().equals(user.getDeptId())) {
            if (pageData2.getInteger("deptlength") == 1 && sysDept.getParentId() == Long.valueOf(userinfo.getDeptId())) {
                pageData1.put("title", "人员调动");
                pageData1.put("content", user.getUserName() + "从" + sysUser.getDept().getDeptName() + "调到" + sysUser.getDept().getDeptName());
                noticeService.insertNotice(pageData1);
            } else {
                pageData.put("content", "管理员请求将" + sysUser.getUserName() + "调到" + sysUser.getDept().getDeptName());
                pageData.put("peopleId", user.getUserId());
                pageData.put("deptid", user.getDeptId());
                confirmService.insertConfirm(pageData);

                flag = 2;
            }
        } else {

            pageData1.put("title", "人员调动");
            pageData1.put("content", user.getUserName() + "从" + sysUser.getDept().getDeptName() + "调到" + sysUser.getDept().getDeptName());
            noticeService.insertNotice(pageData1);
        }
        if (flag == 2) {
            return success("调动部门请求已发送给超级管理员");
        }
        return toAjax(userService.updateUser(user));
    }

    @RequiresPermissions("system:user:resetPwd")
    @Log(title = "重置密码", businessType = BusinessType.UPDATE)
    @GetMapping("/resetPwd/{userId}")
    public String resetPwd(@PathVariable("userId") Long userId, ModelMap mmap) {
        mmap.put("user", userService.selectUserById(userId));
        return prefix + "/resetPwd";
    }

    @RequiresPermissions("system:user:resetPwd")
    @Log(title = "重置密码", businessType = BusinessType.UPDATE)
    @PostMapping("/resetPwd")
    @ResponseBody
    public AjaxResult resetPwdSave(SysUser user) {
        userService.checkUserAllowed(user);
        user.setSalt(ShiroUtils.randomSalt());
        user.setPassword(passwordService.encryptPassword(user.getLoginName(), user.getPassword(), user.getSalt()));
        if (userService.resetUserPwd(user) > 0) {
            if (ShiroUtils.getUserId() == user.getUserId()) {
                ShiroUtils.setSysUser(userService.selectUserById(user.getUserId()));
            }
            return success();
        }
        return error();
    }

    @RequiresPermissions("system:user:remove")
    @Log(title = "用户管理", businessType = BusinessType.DELETE)
    @PostMapping("/remove")
    @ResponseBody
    public AjaxResult remove(String ids) {
        try {
            return toAjax(userService.deleteUserByIds(ids));
        } catch (Exception e) {
            return error(e.getMessage());
        }
    }

    /**
     * 校验用户名
     */
    @PostMapping("/checkLoginNameUnique")
    @ResponseBody
    public String checkLoginNameUnique(SysUser user) {
        return userService.checkLoginNameUnique(user.getLoginName());
    }

    /**
     * 校验手机号码
     */
    @PostMapping("/checkPhoneUnique")
    @ResponseBody
    public String checkPhoneUnique(SysUser user) {
        return userService.checkPhoneUnique(user);
    }

    /**
     * 校验email邮箱
     */
    @PostMapping("/checkEmailUnique")
    @ResponseBody
    public String checkEmailUnique(SysUser user) {
        return userService.checkEmailUnique(user);
    }

    /**
     * 用户状态修改
     */
    @Log(title = "用户管理", businessType = BusinessType.UPDATE)
    @RequiresPermissions("system:user:edit")
    @PostMapping("/changeStatus")
    @ResponseBody
    public AjaxResult changeStatus(SysUser user) {
        userService.checkUserAllowed(user);
        return toAjax(userService.changeStatus(user));
    }
}