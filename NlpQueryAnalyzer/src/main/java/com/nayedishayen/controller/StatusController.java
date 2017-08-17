package com.nayedishayen.controller;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://10.7.50.8", maxAge = 3600)
@RestController
public class StatusController {
    @GetMapping(value = "/status", produces = MediaType.TEXT_HTML_VALUE)
    public String status() {
        return "<p> Server is up and running </p>";
    }

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String rootStatus() {
        return "<p> Server is up and running </p>";
    }
}
