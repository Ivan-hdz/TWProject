/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import beans.RestStatus;
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
import javax.servlet.http.HttpSession;
import utilities.ServletUtils;

/**
 *
 * @author honte
 */
public class auth extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param req
     * @param res
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        
        ServletContext context = req.getServletContext();
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        RestStatus st = new RestStatus();
        XmlMapper map = new XmlMapper();
        try {
            boolean tokenMatch = false;
            HttpSession session = req.getSession();
            String tokenClient = req.getParameter("token");
            st.setStatus(200);
            st.setTitle("Éxito");
            st.setBody("Usuario autentificado con éxito");
            if(session.getAttribute("token") != null && session.getAttribute("token").toString().equals(tokenClient))
                tokenMatch = true;
            else {
                Users us = ServletUtils.getUsersFromXml(context);
                for(User u : us.getUser())
                {
                    if(u.getSessionToken() != null && tokenClient != null){
                        if(u.getSessionToken().equals(tokenClient))
                            tokenMatch = true;
                    }
                }
            }
            if(!tokenMatch){
                st.setStatus(500);
                st.setBody("Algo salio mal al intentar autentificar al usuario");
                st.setTitle("Error: ");
            }
            out.print(map.writeValueAsString(st));
           
        } catch(IOException e)
                {
                    System.out.println(e.getMessage());
         } finally {
            out.close();
        }
    }

}
