/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import beans.Quiz;
import beans.Quizzes;
import beans.Users;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import static values.Strings.getQuizzesXMLFile;
import static values.Strings.quizzesXMLFolder;
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
   
    public static Quizzes getQuizzesFromXml(ServletContext context, String usr ) throws IOException
    {
        XmlMapper XMLmapper = new XmlMapper();
        return XMLmapper.readValue(MyReader.readFile(context.getRealPath(quizzesXMLFolder +"/" + usr + "/quizzesIndex.xml" )), Quizzes.class);
    }
   
    public static boolean createQuizzesIndex(ServletContext context, String usr) throws IOException
    {
        boolean existia = false;
        XmlMapper xml = new XmlMapper();
         xml.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        File dir = new File(context.getRealPath(quizzesXMLFolder + "/" + usr));
        if(!dir.exists())
            dir.mkdirs();
        File f = new File(context.getRealPath(getQuizzesXMLFile(usr)));
            if(!f.exists())
            {
                f.createNewFile();
            }
            else
                existia = true;
            return existia;
    }
    
    public static int getUniqueId(ServletContext context, String us) throws IOException
    {
        Quizzes qzs = getQuizzesFromXml(context, us);
        int rand = (int) (Math.random()*100);
        if(qzs.getQuiz() != null)
            for(Quiz q : qzs.getQuiz())
                rand += q.getId();
        return rand;
    }
    
}
