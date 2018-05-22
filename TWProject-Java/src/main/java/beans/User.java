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
@JacksonXmlRootElement(localName = "user")
public class User {
    private String username;
    private String nickname;
    private int authLevel;
    private String password;
   

    /**
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * @param nickname the nickname to set
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * @return the authLevel
     */
    public int getAuthLevel() {
        return authLevel;
    }

    /**
     * @param authLevel the authLevel to set
     */
    public void setAuthLevel(int authLevel) {
        this.authLevel = authLevel;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
    
}
