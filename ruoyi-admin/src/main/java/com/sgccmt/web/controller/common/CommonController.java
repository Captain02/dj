package com.sgccmt.web.controller.common;

import com.sgccmt.bhcz.util.BaseJQController;
import com.sgccmt.bhcz.util.RJQ;
import com.sgccmt.bhcz.utils.PageData;
import com.sgccmt.common.config.Global;
import com.sgccmt.common.config.ServerConfig;
import com.sgccmt.common.constant.Constants;
import com.sgccmt.common.core.domain.AjaxResult;
import com.sgccmt.common.utils.StringUtils;
import com.sgccmt.common.utils.file.FileUploadUtils;
import com.sgccmt.common.utils.file.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 通用请求处理
 *
 * @author ruoyi
 */
@RestController
public class CommonController extends BaseJQController {
    private static final Logger log = LoggerFactory.getLogger(CommonController.class);
    @Autowired
    CommonService commonService;

    @Autowired
    private ServerConfig serverConfig;

    /**
     * 通用下载请求
     *
     * @param fileName 文件名称
     * @param delete   是否删除
     */
    @GetMapping("common/download")
    public void fileDownload(String fileName, Boolean delete, HttpServletResponse response, HttpServletRequest request) {
        try {
            if (!FileUtils.isValidFilename(fileName)) {
                throw new Exception(StringUtils.format("文件名称({})非法，不允许下载。 ", fileName));
            }
            String realFileName = System.currentTimeMillis() + fileName.substring(fileName.indexOf("_") + 1);
            String filePath = Global.getDownloadPath() + fileName;

            response.setCharacterEncoding("utf-8");
            response.setContentType("multipart/form-data");
            response.setHeader("Content-Disposition",
                    "attachment;fileName=" + FileUtils.setFileDownloadHeader(request, realFileName));
            FileUtils.writeBytes(filePath, response.getOutputStream());
            if (delete) {
                FileUtils.deleteFile(filePath);
            }
        } catch (Exception e) {
            log.error("下载文件失败", e);
        }
    }

    /**
     * 通用上传请求
     */
    @PostMapping("/common/upload")
    @ResponseBody
    public AjaxResult uploadFile(MultipartFile file) throws Exception {
        try {
            // 上传文件路径
            String filePath = Global.getUploadPath();
            // 上传并返回新文件名称
            String fileName = FileUploadUtils.upload(filePath, file);
            String url = serverConfig.getUrl() + fileName;
            AjaxResult ajax = AjaxResult.success();
            ajax.put("fileName", fileName);
            ajax.put("url", url);
            return ajax;
        } catch (Exception e) {
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 本地资源通用下载
     */
    @GetMapping("/common/download/resource")
    public void resourceDownload(String resource, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 本地资源路径
        String localPath = Global.getProfile();
        // 数据库资源地址
        String downloadPath = localPath + StringUtils.substringAfter(resource, Constants.RESOURCE_PREFIX);
        // 下载名称
        String downloadName = StringUtils.substringAfterLast(downloadPath, "/");
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition",
                "attachment;fileName=" + FileUtils.setFileDownloadHeader(request, downloadName));
        FileUtils.writeBytes(downloadPath, response.getOutputStream());
    }

    //    普通下拉框
    @ResponseBody
    @RequestMapping("common/GetCommonDropDownData/{TableName}/{ValueFieldName}/{NameFieldName}")
    public RJQ GetCommonDropDownData(@PathVariable("TableName") String TableName, @PathVariable("ValueFieldName") String ValueFieldName, @PathVariable("NameFieldName") String NameFieldName) throws Exception {
        List<PageData> table = (List<PageData>) commonService.getTable(TableName, ValueFieldName, NameFieldName);
        return RJQ.ok().put("data", table);
    }


    //    字典表下拉框
    @RequestMapping("common/GetCommonDropDownDatady/{TableName}/{ValueFieldName}/{NameFieldName}/{dict_type}")
    public RJQ GetCommonDropDownDataZd(@PathVariable("TableName") String TableName, @PathVariable("ValueFieldName") String ValueFieldName,
                                       @PathVariable("NameFieldName") String NameFieldName, @PathVariable("dict_type") String dict_type) throws Exception {
        List<PageData> table = (List<PageData>) commonService.getTableZd(TableName, ValueFieldName, NameFieldName, dict_type);
        return RJQ.ok().put("data", table);
    }

    //    字典表下拉框
    @RequestMapping("common/GetCommonDropDownDatadyx/{TableName}/{ValueFieldName}/{NameFieldName}/{dict_type}")
    public RJQ GetCommonDropDownDataZdx(@PathVariable("TableName") String TableName, @PathVariable("ValueFieldName") String ValueFieldName,
                                        @PathVariable("NameFieldName") String NameFieldName, @PathVariable("dict_type") String dict_type) throws Exception {
        List<PageData> table = (List<PageData>) commonService.getTableZdx(TableName, ValueFieldName, NameFieldName, dict_type);
        return RJQ.ok().put("data", table);
    }
}
