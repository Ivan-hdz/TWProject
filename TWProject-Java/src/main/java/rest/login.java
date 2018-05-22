/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import beans.User;
import beans.Users;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException
{
    System.out.println("-----");
            String id =req.getParameter("username");
            String pass = req.getParameter("password");
            System.out.println(id);
            System.out.println(pass);
            System.out.println("----");
}
@Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException 
    {
         ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
      
        XmlMapper XMLmapper = new XmlMapper();
        System.out.println("-----");
        String id =req.getParameter("username");
        String pass = req.getParameter("password");
        System.out.println(id);
        System.out.println(pass);
        System.out.println("----");
        Users us = getUsersFromXml(context);
        boolean flag = false;
        for(User u : us.getUser())
        {
            if(u.getUsername().equals(id) && u.getPassword().equals(pass))
            {
                String xml = XMLmapper.writeValueAsString(u);
                out.println(xml);
                System.out.println(xml);
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
            String xml = XMLmapper.writeValueAsString(u);
            System.out.println(xml);
            out.println(xml);
        }
        
    }
}
