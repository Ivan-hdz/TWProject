/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package values;

/**
 *
 * @author honte
 */
public class Strings {
    public static final String usersXMLFile = "WEB-INF/Data/XML/users.xml";
    public static final String quizzesXMLFolder = "WEB-INF/Quizzes";
    public static String getQuizzesXMLFile(String usr)
    {
        return quizzesXMLFolder +"/" + usr + "/quizzesIndex.xml";
    }
}
