package com.a604.boardservice.util;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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
        String filteredMessage = message;

        for (String fword : fwords) {
            String replacement = "*".repeat(fword.length());
            filteredMessage = filteredMessage.replaceAll("(?i)" + fword, replacement);
        }

        return filteredMessage;
    }
}