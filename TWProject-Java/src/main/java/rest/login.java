/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import beans.User;
import beans.Users;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import utilities.MyReader;
import static utilities.ServletUtils.getUsersFromXml;
import static utilities.ServletUtils.initResponse;
import static values.Strings.usersXMLFile;

/**
 *
 * @author honte
 */
public class login extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException 
    {
         ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        HttpSession session = req.getSession();
        XmlMapper XMLmapper = new XmlMapper();
        String id =req.getParameter("username");
        String pass = req.getParameter("password");
        Users us = getUsersFromXml(context);
        boolean flag = false;
        for(User u : us.getUser())
        {
            if(u.getUsername().equals(id) && u.getPassword().equals(pass))
            {
                Calendar c = Calendar.getInstance();
                id += c.getTimeInMillis();
                u.setSessionToken(id);
                String xml = XMLmapper.writeValueAsString(u);
                out.println(xml);
                session.setAttribute("sessionToken", id.hashCode());
                flag = true;
                break;
            }
        }
        if(!flag)
        {
            User u = new User();
            u.setUsername("error");
            u.setNickname("error");
            u.setPassword("error");
            u.setSessionToken("error");
            String xml = XMLmapper.writeValueAsString(u);
            out.println(xml);
        } else 
            XMLmapper.writeValue(new File(context.getRealPath(usersXMLFile)), us);
        
    }
}
