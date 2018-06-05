/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

/**
 *
 * @author honte
 */
@JacksonXmlRootElement(localName = "quiz")
public class Quiz {
    private int id;
    private String title;
    private String description;
    private String urlBody;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the urlBody
     */
    public String getUrlBody() {
        return urlBody;
    }

    /**
     * @param urlBody the urlBody to set
     */
    public void setUrlBody(String urlBody) {
        this.urlBody = urlBody;
    }
}
