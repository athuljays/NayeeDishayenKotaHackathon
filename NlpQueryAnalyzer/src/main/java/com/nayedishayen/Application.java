package com.nayedishayen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by athul on 8/17/2017.
 */

@SpringBootApplication
@ComponentScan("com.nayedishayen")
public class Application {

    public static void main(String[] args) throws Throwable {
        SpringApplication.run(Application.class, args);
    }
}
