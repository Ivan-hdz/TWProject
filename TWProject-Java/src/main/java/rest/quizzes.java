/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import beans.Quiz;
import beans.Quizzes;
import beans.RestStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utilities.MyReader;
import static utilities.ServletUtils.*;
import static values.Strings.getQuizzesXMLFile;
import static values.Strings.usersXMLFile;

/**
 *
 * @author honte
 */
public class quizzes extends HttpServlet {
    /**
     * Método que atiende peticiones GET, obtiene un quiz en especifico pasando su id
     * en la url.
     * <i>
     * Ejemplo: <br>
     * http://hostname.org/TWJavaProject/rest/quizzes/teacherUserName/quizId
     * http://hostname.org/TWJavaProject/rest/quizzes/teacherUserName
     * </i>
     * Cuando se escribe un quizId este se busca en los recursos asociados al nombre de usuario del profesor,
     * en otro caso, se devuelven todos los recursos registrados
     * @param req: Petición hecha por el cliente
     * @param res: Respuesta enviada al cliente
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException*/
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
    /**
     * Metodo que atiende petición POST en los recursos Quizzes, en concreto,
     * registra los datos de un quiz, quedando pendiente la elaboración del diagrama.
     * Este método asigna un id de actividad irrepetible en la carpeta que tiene el nombre de usuario
     * del profesor dueño de este recurso.
     * @param req: Petición hecha por el cliente
     * @param res: Respuesta enviada al cliente
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
          String uri[] = req.getRequestURI().split("/"); //Obtenemos el usuario de la uri, recordemos que el servicio rest es: ./nombreProyecto/rest/servicio/identificador(nombre del profe)
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true ); //Sirve para incluir el xml header
        RestStatus st = new RestStatus();
        Quiz q = jsonMapper.readValue(toUTF8(req.getParameter("quiz")), Quiz.class);
        int uniqueID = getUniqueId(context,uri[uri.length-1]); //Generando un id unico para la actividad
        q.setUrlBody(String.valueOf(uniqueID)+ ".svg");
        q.setId(uniqueID);
      Quizzes qzs = getQuizzesFromXml(context, uri[uri.length-1]); //Obtenemos los registros de los quizzes existentes
        boolean exists = false;
        if(qzs.getQuiz() != null) {
            for(Quiz q_ : qzs.getQuiz())
                if(q.getId() == q_.getId())
                {
                    exists = true;
                    break;
                }
        }else{
            qzs = new Quizzes();
            qzs.setQuiz(new LinkedList<Quiz>());
            System.out.println("sas");
          }
        if(exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("La actividad ya existe");
        }else{
            qzs.getQuiz().add(q);
            xmlMapper.writeValue(new File(context.getRealPath(getQuizzesXMLFile(uri[uri.length-1]))), qzs);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("La actividad se ha creado");
            out.println(xmlMapper.writeValueAsString(st));
        }
    }
    /**
     * Método PUT, sirve para actualizar un recurso ya existente del profesor que se manda en la url
     * @param req: Petición hecha por el cliente
     * @param res: Respuesta enviada al cliente
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException*/
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
       ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        String uri[] = req.getRequestURI().split("/"); //Obtenemos el usuario de la uri, recordemos que el servicio rest es: ./nombreProyecto/rest/servicio/identificador(nombre del profe)
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        RestStatus st = new RestStatus();
        Quiz q = jsonMapper.readValue(toUTF8(req.getParameter("quiz")), Quiz.class);
        Quizzes qzs = getQuizzesFromXml(context, uri[uri.length-1]);
        boolean exists = false;
        int i = 0;
        for(Quiz q_ : qzs.getQuiz())
        {
            System.out.println(q.getId() + " ==  " + q_.getId());
            if(q_.getId() == q.getId())
            {
                exists = true;
                q.setUrlBody(q_.getUrlBody());
                qzs.getQuiz().set(i, q);
                break;
            }
            i++;
        }
        if(!exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("La actividad no existe");
        }else{
            xmlMapper.writeValue(new File(context.getRealPath(getQuizzesXMLFile(uri[uri.length-1]))), qzs);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("Actividad actualizado satisfactoriamente");
        }
            out.println(xmlMapper.writeValueAsString(st));
    }
    /**
     * Método DELETE, elimina un recurso en especifico del profesor proporcionado en la url
     * @param req: Petición hecha por el cliente
     * @param res: Respuesta enviada al cliente
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException*/
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        ServletContext context = getServletContext();
        PrintWriter out = initResponse("xml", res);
        String sb = req.getRequestURI();
        String uri[] = sb.split("/");
        ObjectMapper jsonMapper = new ObjectMapper();
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure( ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true );
        RestStatus st = new RestStatus();
        int idActi = Integer.parseInt(uri[uri.length-1]);
        Quiz q = new Quiz();
        Quizzes qzs = getQuizzesFromXml(context, uri[uri.length - 2]);
        boolean exists = false;
        for(Quiz q_ : qzs.getQuiz())
        {
            if(idActi == q_.getId()){
                exists = true;
                q = q_;
                break;
            }
        }
        if(!exists)
        {
            st.setStatus(400);
            st.setTitle("Error: ");
            st.setBody("La actividad no existe");
        }else{
            qzs.getQuiz().remove(q);
            xmlMapper.writeValue(new File(context.getRealPath(getQuizzesXMLFile(uri[uri.length-2]))), qzs);
            st.setStatus(200);
            st.setTitle("Éxito: ");
            st.setBody("Actividad borrada satisfactoriamente");
            out.println(xmlMapper.writeValueAsString(st));
        }
    }

    
}
