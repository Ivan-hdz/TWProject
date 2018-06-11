/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import beans.RestStatus;
import beans.User;
import beans.Users;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utilities.MyReader;
import static utilities.ServletUtils.getUsersFromXml;
import static utilities.ServletUtils.initResponse;
import static utilities.ServletUtils.toUTF8;
import static values.Strings.usersXMLFile;
/**
 *
 * @author honte
 */
public class users extends HttpServlet{
     
     
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException 
    {
         ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        String sb = req.getRequestURI();
        String uri[] = sb.split("/"); // "/TWJavaProject/rest/users "
        if(uri.length <= 4)
        {
            out.print(MyReader.readFile(context.getRealPath(usersXMLFile)));
        } else {
            XmlMapper XMLmapper = new XmlMapper();
             XMLmapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
            String id = uri[uri.length-1];
            Users us = getUsersFromXml(context);
            for(User u : us.getUser())
            {
                if(u.getUsername().equals(id))
                {
                    String xml = XMLmapper.writeValueAsString(u);
                    out.println(xml);
                    break;
                }
            }
        }
    }
    
    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException    {
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        RestStatus st = new RestStatus();
        User u = jsonMapper.readValue(toUTF8(req.getParameter("user")), User.class);
        Users us = getUsersFromXml(context);
        boolean exists = false;
        for(User u_ : us.getUser())
        {
            if(u.getUsername().equals(u_.getUsername())){
                exists = true;
                break;
            }
        }
        if(exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("El usuario ya existe");
        }else{
            us.getUser().add(u);
            xmlMapper.writeValue(new File(context.getRealPath(usersXMLFile)), us);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("El usuario se ha creado");
            out.println(xmlMapper.writeValueAsString(st));
        }
    }
    
    @Override
    public void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException
    {
        System.out.println(req.getContentType());
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        RestStatus st = new RestStatus();
        
        User u = jsonMapper.readValue(toUTF8(req.getParameter("user")), User.class);
        
        Users us = getUsersFromXml(context);
        boolean exists = false;
        int i = 0;
        for(User u_ : us.getUser())
        {
            if(u.getUsername().equals(u_.getUsername())){
                exists = true;
                us.getUser().set(i, u);
                break;
            }
            i++;
        }
        if(!exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("El usuario no existe");
        }else{
            xmlMapper.writeValue(new File(context.getRealPath(usersXMLFile)), us);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("Usuario actualizado satisfactoriamente");
            out.println(xmlMapper.writeValueAsString(st));
        }
    }

    @Override
    public void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException
    {
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        String sb = req.getRequestURI();
        String uri[] = sb.split("/"); // "/TWJavaProject/rest/users "
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        RestStatus st = new RestStatus();
        String usrname = uri[uri.length-1];
        User u = new User();
        Users us = getUsersFromXml(context);
        boolean exists = false;
        for(User u_ : us.getUser())
        {
            if(usrname.equals(u_.getUsername())){
                exists = true;
                u = u_;
                break;
            }
        }
        if(!exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("El usuario no existe");
        }else{
            us.getUser().remove(u);
            xmlMapper.writeValue(new File(context.getRealPath(usersXMLFile)), us);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("Usuario borrado satisfactoriamente");
            out.println(xmlMapper.writeValueAsString(st));
        }
    }
    

}
