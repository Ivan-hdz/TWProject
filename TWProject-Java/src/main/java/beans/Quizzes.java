/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author honte
 */
@JacksonXmlRootElement(localName = "quizzes")
public class Quizzes {
    @JacksonXmlElementWrapper(localName = "quiz", useWrapping = false)
    private List<Quiz> quiz;

    /**
     * @return the quiz
     */
    public List<Quiz> getQuiz() {
        return quiz;
    }

    /**
     * @param quiz the quiz to set
     */
    public void setQuiz(List<Quiz> quiz) {
        this.quiz = quiz;
    }
}
