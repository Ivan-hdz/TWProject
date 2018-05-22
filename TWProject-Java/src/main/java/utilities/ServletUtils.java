/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import beans.Users;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import static values.Strings.usersXMLFile;

/**
 *
 * @author honte
 */
public class ServletUtils {
    
    public static PrintWriter initResponse(String contentType, HttpServletResponse res) throws IOException
    {
        res.setContentType("text/" + contentType + ";charset=UTF-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Method", "GET, PUT, POST, DELETE, HEAD");
        
        return res.getWriter();
    }
    
    public static Users getUsersFromXml(ServletContext context) throws IOException
    {
        XmlMapper XMLmapper = new XmlMapper();
        return XMLmapper.readValue(MyReader.readFile(context.getRealPath(usersXMLFile)), Users.class);
    }
}
