package com.nayedishayen.models.response;

/**
 * The BaseResponse Class is a superclass for other response classes
 */
public class BaseResponse {

    public static final String SUCCESS = "success";
    public static final String FAILED = "failed";

    protected String status;
    protected String message;

    public BaseResponse() {
    }

    public BaseResponse(boolean status, String message) {
        this.status = status ? SUCCESS : FAILED;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}