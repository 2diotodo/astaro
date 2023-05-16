package com.a604.boardservice.util;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class FwordFilter {

    public static List<String> loadFwordList(String path) {
        List<String> fwordList = new ArrayList<>();

        try {
            Resource resource = new DefaultResourceLoader().getResource(path);
            InputStream inputStream = resource.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));

            String line;
            while ((line = reader.readLine()) != null) {
                fwordList.add(line.trim());
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fwordList;
    }

    public static String filterFwords(String message, List<String> fwords) {
        // String filteredMessage = message;
        //
        // for (String fword : fwords) {
        //     String replacement = "*".repeat(fword.length());
        //     filteredMessage = filteredMessage.replaceAll("(?i)" + fword, replacement);
        // }
        //
        // return filteredMessage;
        String[] arr = message.split(" ");
        String filteredMessage = "";

        list : for(String text : arr){
            for (String fword : fwords) {
                int j = 0;
                for(int i=0; i<text.length(); i++) {
                    if(text.charAt(i) == fword.charAt(j)) {
                        j++;
                        if(j==fword.length()) {
                            String replacement = "*".repeat(text.length());
                            filteredMessage += replacement + " ";
                            continue list;
                        }
                    }
                }
            }
            filteredMessage += text + " ";
        }

        return filteredMessage;
    }
}