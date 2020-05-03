package com.sgccmt.system.domain;

import com.sgccmt.common.annotation.Excel;
import com.sgccmt.common.annotation.Excel.Type;
import com.sgccmt.common.annotation.Excels;
import com.sgccmt.common.core.domain.BaseEntity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 用户对象 sys_user
 *
 * @author ruoyi
 */
public class SysUser extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
//    @Excel(name = "用户序号", cellType = ColumnType.NUMERIC, prompt = "用户编号")
    private Long userId;

    /**
     * 部门ID
     */
//    @Excel(name = "部门编号", type = Type.IMPORT)
    private String deptId;

    /**
     * 部门父ID
     */
    private Long parentId;

    /**
     * 角色ID
     */
    private Long roleId;

    /**
     * 登录名称
     */
    @Excel(name = "登录名称")
    private String loginName;

    /**
     * 用户名称
     */
    @Excel(name = "用户名称")
    private String userName;

    /**
     * 用户邮箱
     */
    @Excel(name = "用户邮箱")
    private String email;

    /**
     * 手机号码
     */
    @Excel(name = "手机号码")
    private String phonenumber;

    /**
     * 用户性别
     */
    @Excel(name = "用户性别", readConverterExp = "0=男,1=女,2=未知")
    private String sex;

    private String sexs;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 密码
     */
    private String password;

    /**
     * 盐加密
     */
    private String salt;

    /**
     * 帐号状态（0正常 1停用）
     */
//    @Excel(name = "帐号状态", readConverterExp = "0=正常,1=停用")
    private String status;

    /**
     * 删除标志（0代表存在 2代表删除）
     */
    private String delFlag;

    /**
     * 最后登陆IP
     */
//    @Excel(name = "最后登陆IP", type = Type.EXPORT)
    private String loginIp;

    /**
     * 最后登陆时间
     */
//    @Excel(name = "最后登陆时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss", type = Type.EXPORT)
    private Date loginDate;

    /**
     * 部门对象
     */
    @Excels({
            @Excel(name = "部门名称", targetAttr = "deptName", type = Type.EXPORT),
            @Excel(name = "部门负责人", targetAttr = "leader", type = Type.EXPORT)
    })
    private SysDept dept;

    private List<SysRole> roles;

    /**
     * 角色组
     */
    private Long[] roleIds;

    /**
     * 岗位组
     */
    private Long[] postIds;
    /**
     * 等级折扣
     */
    private Float single_discount;

    private String grade;

    private String gradeId;
    /**
     * 民族
     */
    @Excel(name = "民族")
    private String nation;

    /**
     * 籍贯
     */
    @Excel(name = "籍贯")
    private String place;

    /**
     * 人员类别
     */
    @Excel(name = "人员类别")
    private String peopleType;

    /**
     * 身份证号
     */
    @Excel(name = "身份证号")
    private Long personid;

    /**
     * 工号
     */
    @Excel(name = "工号")
    private Long workid;

    /**
     * 文化程度
     */
    @Excel(name = "文化程度")
    private String education;

    /**
     * 出生日期
     */
    @Excel(name = "出生日期", width = 30, prompt = "例:2020-5-3")


    private String birthday;

    /**
     * 参加工作日期
     */
    @Excel(name = "参加工作日期", width = 30, prompt = "例:2020-5-3")


    private String worddate;

    /**
     * 入党日期
     */
    @Excel(name = "入党日期", width = 30, prompt = "例:2020-5-3")
    private String rcpcdate;

    /**
     * 转正日期
     */
    @Excel(name = "转正日期", width = 30, prompt = "例:2020-5-3")
    private String zcpcdate;

    /**
     * 工作单位
     */
    @Excel(name = "工作单位")
    private String work;

    /**
     * 家庭地址
     */
    @Excel(name = "家庭地址")
    private String address;

    /**
     * 年龄
     */
    @Excel(name = "年龄")
    private Long age;

    public SysUser() {

    }

    public String getSexs() {
        return sexs;
    }

    public void setSexs(String sexs) {
        this.sexs = sexs;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getPeopleType() {
        return peopleType;
    }

    public void setPeopleType(String peopleType) {
        this.peopleType = peopleType;
    }

    public Long getPersonid() {
        return personid;
    }

    public void setPersonid(Long personid) {
        this.personid = personid;
    }

    public Long getWorkid() {
        return workid;
    }

    public void setWorkid(Long workid) {
        this.workid = workid;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getWorddate() {
        return worddate;
    }

    public void setWorddate(String worddate) {
        this.worddate = worddate;
    }

    public String getRcpcdate() {
        return rcpcdate;
    }

    public void setRcpcdate(String rcpcdate) {
        this.rcpcdate = rcpcdate;
    }

    public String getZcpcdate() {
        return zcpcdate;
    }

    public void setZcpcdate(String zcpcdate) {
        this.zcpcdate = zcpcdate;
    }

    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getGradeId() {
        return gradeId;
    }

    public void setGradeId(String gradeId) {
        this.gradeId = gradeId;
    }

    public Float getSingle_discount() {
        return single_discount;
    }

    public void setSingle_discount(Float single_discount) {
        this.single_discount = single_discount;
    }

    public SysUser(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isAdmin() {
        return isAdmin(this.userId);
    }

    public static boolean isAdmin(Long userId) {
        return userId != null && 1L == userId;
    }

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @NotBlank(message = "登录账号不能为空")
    @Size(min = 0, max = 30, message = "登录账号长度不能超过30个字符")
    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    @Size(min = 0, max = 30, message = "用户昵称长度不能超过30个字符")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Email(message = "邮箱格式不正确")
    @Size(min = 0, max = 50, message = "邮箱长度不能超过50个字符")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Size(min = 0, max = 11, message = "手机号码长度不能超过11个字符")
    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    public SysDept getDept() {
        if (dept == null) {
            dept = new SysDept();
        }
        return dept;
    }

    public void setDept(SysDept dept) {
        this.dept = dept;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
    }

    public Long[] getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Long[] roleIds) {
        this.roleIds = roleIds;
    }

    public Long[] getPostIds() {
        return postIds;
    }

    public void setPostIds(Long[] postIds) {
        this.postIds = postIds;
    }

    @Override
    public String toString() {
        return "SysUser{" +
                "userId=" + userId +
                ", deptId='" + deptId + '\'' +
                ", parentId=" + parentId +
                ", roleId=" + roleId +
                ", loginName='" + loginName + '\'' +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                ", sex='" + sex + '\'' +
                ", sexs='" + sexs + '\'' +
                ", avatar='" + avatar + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", status='" + status + '\'' +
                ", delFlag='" + delFlag + '\'' +
                ", loginIp='" + loginIp + '\'' +
                ", loginDate=" + loginDate +
                ", dept=" + dept +
                ", roles=" + roles +
                ", roleIds=" + Arrays.toString(roleIds) +
                ", postIds=" + Arrays.toString(postIds) +
                ", single_discount=" + single_discount +
                ", grade='" + grade + '\'' +
                ", gradeId='" + gradeId + '\'' +
                ", nation='" + nation + '\'' +
                ", place='" + place + '\'' +
                ", peopleType='" + peopleType + '\'' +
                ", personid='" + personid + '\'' +
                ", workid='" + workid + '\'' +
                ", education='" + education + '\'' +
                ", birthday=" + birthday +
                ", worddate=" + worddate +
                ", rcpcdate=" + rcpcdate +
                ", zcpcdate=" + zcpcdate +
                ", work='" + work + '\'' +
                ", address='" + address + '\'' +
                ", age='" + age + '\'' +
                '}';
    }
}
