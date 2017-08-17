package com.nayedishayen.controller;

import com.nayedishayen.QueryAnalyzer;
import com.nayedishayen.models.response.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by athul on 8/17/2017.
 */
@RestController

public class QueryResolverController {

    @Autowired
    QueryAnalyzer queryAnalyzer;

    @RequestMapping(method = RequestMethod.POST, value = "/resolve_query", produces = "application/json")
    public ResponseEntity<JsonResponse> post(@RequestParam(value = "query") String query) {


        HashMap<String, String> resolvedQuery = queryAnalyzer.resolveQuery(query);

        Map.Entry<String, String> firstEntry = resolvedQuery.entrySet().iterator().next();

                return new ResponseEntity<>(new JsonResponse(true, "successfully fetched",
                        firstEntry.getKey(), firstEntry.getValue()),
                        HttpStatus.OK);

    }
}
