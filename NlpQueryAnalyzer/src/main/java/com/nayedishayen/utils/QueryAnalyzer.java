package com.nayedishayen.utils;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

@Component
public class QueryAnalyzer {

    private StanfordCoreNLP pipeline;
    private HashMap<String, String> servicesMap = new HashMap<>();

    public QueryAnalyzer() throws IOException {
        Properties props = new Properties();
                props.setProperty("annotators", "tokenize, ssplit, pos");

        pipeline = new StanfordCoreNLP(props);

        BufferedReader br = new BufferedReader(new FileReader("./servicesMap.csv"));
        String line =  null;


        while((line = br.readLine()) != null) {
                String arr[] = line.split(",");
                servicesMap.put(arr[1], arr[0]);
        }
    }

    public HashMap<String, String> resolveQuery(String query) {

        HashMap<String, String> results = new HashMap<>();
        HashMap<String, String> posMap = new HashMap<>();

        Annotation annotation = new Annotation(query);
        pipeline.annotate(annotation);
        CoreMap sentence = annotation.get(CoreAnnotations.SentencesAnnotation.class).get(0);
        for (CoreLabel token : sentence.get(CoreAnnotations.TokensAnnotation.class)) {
            String word = token.get(CoreAnnotations.TextAnnotation.class);
            String pos = token.get(CoreAnnotations.PartOfSpeechAnnotation.class);
            posMap.put(pos, word);
        }

        servicesMap.entrySet().forEach(e -> {
            if(e.getKey().toLowerCase().contains(posMap.get("NN")) || e.getKey().toLowerCase().contains(posMap.getOrDefault("NNS", "N/A"))) {
                System.out.println(e.getKey());
                if(e.getKey().toLowerCase().contains("application") || e.getKey().toLowerCase().contains("loan")) {
                    results.put(e.getValue(), "aadharId");
                } else {
                    results.put(e.getValue(), "searchKey");
                }
            }
        });

        System.out.println(results);
        return results;
    }
}
