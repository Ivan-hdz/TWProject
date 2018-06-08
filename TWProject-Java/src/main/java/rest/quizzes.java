/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import beans.Quiz;
import beans.Quizzes;
import beans.User;
import beans.Users;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utilities.MyReader;
import static utilities.ServletUtils.*;
import static values.Strings.getQuizzesXMLFile;
import static values.Strings.quizzesXMLFolder;
import static values.Strings.usersXMLFile;

/**
 *
 * @author honte
 */
public class quizzes extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        String sb = req.getRequestURI();
        String uri[] = sb.split("/"); // "/TWJavaProject/rest/quizzes / teacherUsr / id "
        if(uri.length <= 5)
        {
            String usr = uri[uri.length-1];
            createQuizzesIndex(context, usr);
            out.print(MyReader.readFile(context.getRealPath(getQuizzesXMLFile(usr) )));
        } else {
            String usr = uri[uri.length-2];
            XmlMapper xmlMap = new XmlMapper();
            if(!createQuizzesIndex(context, usr))
            {
                out.println(MyReader.readFile(context.getRealPath(getQuizzesXMLFile(usr))));
            }else
            {
                
                Quizzes qzs = getQuizzesFromXml(context, usr);
                int id_param = Integer.parseInt(uri[uri.length-1]);
                for(Quiz q : qzs.getQuiz())
                {
                    if(q.getId() == id_param)
                        out.print(xmlMap.writeValueAsString(q));
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }

    
}
