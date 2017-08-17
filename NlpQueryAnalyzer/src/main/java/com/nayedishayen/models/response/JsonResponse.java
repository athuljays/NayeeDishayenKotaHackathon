package com.nayedishayen.models.response;

import com.fasterxml.jackson.annotation.JsonRawValue;

public class JsonResponse extends BaseResponse {

    String serviceId;
    String queryParam;

    public JsonResponse(boolean status, String message, String serviceId, String queryParam) {
        super(status, message);
        setServiceId(serviceId);
        setQueryParam(queryParam);
//        setData(data);
    }

//    @JsonRawValue
    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

//    @JsonRawValue
    public String getQueryParam() {
        return queryParam;
    }

    public void setQueryParam(String queryParam) {
        this.queryParam = queryParam;
    }

}
