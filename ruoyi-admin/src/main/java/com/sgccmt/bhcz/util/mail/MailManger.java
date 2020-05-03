package com.sgccmt.bhcz.util.mail;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;


public class MailManger {

    /**
     * @param toUser
     * @param content
     * @param title
     */
//    fromUser  发件人邮箱
//    authCode  授权码
//    toUser  收件人邮箱
//    content 内容
//    title 标题
/* 163邮箱*/
    public static boolean sendMail163(String fromUser,String authCode,String toUser, String content, String title) {
       String mailHost = "smtp.163.com";
        Properties props = new Properties();
        // 设置发送邮件的邮件服务器的属性（这里使用网易的smtp服务器）
        props.put("mail.smtp.host", mailHost);
        // 需要经过授权，也就是有户名和密码的校验，这样才能通过验证（一定要有这一条）
        props.put("mail.smtp.auth", "true");
        // 用刚刚设置好的props对象构建一个session
        Session session = Session.getDefaultInstance(props);
        // 有了这句便可以在发送邮件的过程中在console处显示过程信息，供调试使用（你可以在控制台（console)上看到发送邮件的过程）
//	                session.setDebug(true);
        // 用session为参数定义消息对象
        MimeMessage message = new MimeMessage(session);
        try {
            // 加载发件人地址
            message.setFrom(new InternetAddress(fromUser));
            // 加载收件人地址
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toUser));
            // 加载标题
            message.setSubject(title);
            // 向multipart对象中添加邮件的各个部分内容，包括文本内容和附件
            Multipart multipart = new MimeMultipart();
            // 设置邮件的文本内容
            BodyPart contentPart = new MimeBodyPart();
            contentPart.setContent(content, "text/html;charset=utf-8");
            multipart.addBodyPart(contentPart);
            message.setContent(multipart);
            message.saveChanges(); // 保存变化
            // 连接服务器的邮箱
            Transport transport = session.getTransport("smtp");
            // 把邮件发送出去
            transport.connect(mailHost, fromUser, authCode);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            System.out.println("邮件发送成功");
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    /* QQ邮箱*/
    public static boolean sendMailQQ(String fromUser,String authCode,String toUser, String content, String title) {
        String mailHost = "smtp.qq.com";
        Properties props = new Properties();
        // 设置发送邮件的邮件服务器的属性（这里使用网易的smtp服务器）
        props.put("mail.smtp.host", mailHost);
        // 需要经过授权，也就是有户名和密码的校验，这样才能通过验证（一定要有这一条）
        props.put("mail.smtp.auth", "true");
        // 用刚刚设置好的props对象构建一个session
        Session session = Session.getDefaultInstance(props);
        // 有了这句便可以在发送邮件的过程中在console处显示过程信息，供调试使用（你可以在控制台（console)上看到发送邮件的过程）
//	                session.setDebug(true);
        // 用session为参数定义消息对象
        MimeMessage message = new MimeMessage(session);
        try {
            // 加载发件人地址
            message.setFrom(new InternetAddress(fromUser));
//             加载收件人地址
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toUser));
            // 加载标题
            message.setSubject(title);
            // 向multipart对象中添加邮件的各个部分内容，包括文本内容和附件
            Multipart multipart = new MimeMultipart();
            // 设置邮件的文本内容
            BodyPart contentPart = new MimeBodyPart();
            contentPart.setContent(content, "text/html;charset=utf-8");
            multipart.addBodyPart(contentPart);
            message.setContent(multipart);
            message.saveChanges(); // 保存变化
            // 连接服务器的邮箱
            Transport transport = session.getTransport("smtp");
            // 把邮件发送出去
            transport.connect(mailHost, fromUser, authCode);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            System.out.println("邮件发送成功");
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
//试验
//    public static void main(String[] args) {
//
//                MailManger.sendMailQQ("1757969958@qq.com", "fwfkehrhbewpegeb",
//                        "1757969958@qq.com", "<a href=\"http://localhost:8004/TSSC/modules/warn/warnMail.html\">智能测试桩报警情况</a>", "智能测试桩报警情况");
//
//
//    }




}
