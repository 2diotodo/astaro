# Backend

- JAVA 11
- Springboot 2.7
- gradle


## eureka-server

#### dependencies

```java
// Spring boot Starter Web
developmentOnly 'org.springframework.boot:spring-boot-devtools'
implementation 'org.springframework.boot:spring-boot-starter-web'

// Spring Cloud Eureka Server
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-server'

// Lombok
compileOnly 'org.projectlombok:lombok'
annotationProcessor 'org.projectlombok:lombok'

// Spring Tester
testImplementation 'org.springframework.boot:spring-boot-starter-test'

```

#### application.yml
```yml
# 포트 번호 지정
server:
  port: 8761

# 마이크로 서비스를 담당하는 스프링 부트 프레임 워크에
# 각각의 마이크로 서비스에 고유한 아이디를 부여하는 설명
spring:
  application:
    name: discoveryService

# Eureka Client 설정
eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
```

## gateway-server

#### dependencies

```java
developmentOnly 'org.springframework.boot:spring-boot-devtools'
implementation 'org.springframework.boot:spring-boot-starter-webflux'

// Lombok
compileOnly 'org.projectlombok:lombok'
annotationProcessor 'org.projectlombok:lombok'

// Jwt
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'

// Spring Cloud Client & GateWay
implementation 'org.springframework.cloud:spring-cloud-starter-gateway'
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'

// Testing Tool
testImplementation 'org.springframework.boot:spring-boot-starter-test'
testImplementation 'io.projectreactor:reactor-test'

```

#### application.yml
```yml
# Gateway Server Port 지정
server:
  port: 8000

# Eureka Client 등록 : serviceUrl은 향후에 수정
eureka:
  client:
    registerWithEureka: true
    fetchregistry: true
    serviceUrl:
      defaultZone: http://172.17.0.1:8761/eureka
  server:
    enable-self-prevention: false

# MSA ROuting & Filter 적용
spring:
  application:
    name: apigateway-server
  cloud:
    gateway:
      # CORS 설정
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: ${YOUR_ALLOWED_ORIGIN}
            allowedHeaders: "*"
            allow-credentials: true
            allowedMethods:
              - GET
              - POST
              - DELETE
              - PUT
              - PATCH
              - OPTIONS
      default-filters:
        - name: LoggingFilter
          args:
            baseMessage: Spring Cloud Gateway Global Filter
            preLogger: true
            postLogger: true
      routes:
        # Member Service Auth 컨트롤러
        - id: member-service
          uri: lb://MEMBER-SERVICE
          predicates:
            - Path=/member-service/auth/**
          filters:
            - RewritePath=/member-service/(?<segment>.*), /$\{segment}
        # Member Service 그외 나머지
        - id: member-service
          uri: lb://MEMBER-SERVICE
          predicates:
            - Path=/member-service/**
          filters:
            - JwtAuthenticationFilter
            - name: JwtAuthorizationFilter
              args:
                role: ROLE_USER
            - RewritePath=/member-service/(?<segment>.*), /$\{segment}
        # Taro Service
        - id: taro-service
          uri: lb://TARO-SERVICE
          predicates:
            - Path=/taro-service/tarot/today
          filters:
            - RewritePath=/taro-service/(?<segment>.*), /$\{segment}
        - id: taro-service
          uri: lb://TARO-SERVICE
          predicates:
            - Path=/taro-service/**
          filters:
            - JwtAuthenticationFilter
            - name: JwtAuthorizationFilter
              args:
                role: ROLE_USER
            - RewritePath=/taro-service/(?<segment>.*), /$\{segment}
        # Board Service
        - id: board-service
          uri: lb://BOARD-SERVICE
          predicates:
            - Path=/board-service/**
          filters:
            - JwtAuthenticationFilter
            - name: JwtAuthorizationFilter
              args:
                role: ROLE_USER
            - RewritePath=/board-service/(?<segment>.*), /$\{segment}

jwt:
  secret: ${YOUR_JWT_SECRET}
```

## member-service

#### dependencies

```java
// Spring Devtools & Spring Web
developmentOnly 'org.springframework.boot:spring-boot-devtools'
implementation 'org.springframework.boot:spring-boot-starter-web'

// Spring Database Connection & JPA
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-data-jdbc'
runtimeOnly 'com.mysql:mysql-connector-j'

// Lombok
compileOnly 'org.projectlombok:lombok'
annotationProcessor 'org.projectlombok:lombok'

// spring security
implementation 'org.springframework.boot:spring-boot-starter-security'

// Jwt
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'

// Spring Cloud Eureka Client
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'

// Testing Tool
testImplementation 'org.springframework.boot:spring-boot-starter-test'
```

#### application.yml
```yml
# User-Server Port 지정
server:
  port: 8081

# Spring Server Settings
spring:
  application:
    name: member-service

  # Database Connection
  datasource:
    url: jdbc:mysql://172.17.0.1:3306/astaro?characterEncoding=UTF-8&amp&serverTimezone=Asia/Seoul
    driverClassName: com.mysql.cj.jdbc.Driver
    username: ${YOUR_MYSQL_USERNAME}
    password: ${YOUR_MYSQL_PASSWORD}

  # JPA Settings
  jpa:
    database: mysql
    hibernate:
      ddlAuto: none
      useNewIdGeneratorMappings: true
    generateDdl: true
    databasePlatform: org.hibernate.dialect.MySQL8Dialect

# Eureka Client Settings
eureka:
  instance:
    hostname: 172.17.0.1
    instanceId: ${spring.application.name}:${spring.application.instance_id:${random.value}}
  client:
    serviceUrl:
      defaultZone: http://172.17.0.1:8761/eureka

jwt:
  secret: ${YOUR_JWT_SECRET}
```

## board-service

#### dependencies

```java
implementation 'org.springframework.boot:spring-boot-starter-data-jdbc'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-web'
compileOnly 'org.projectlombok:lombok'
developmentOnly 'org.springframework.boot:spring-boot-devtools'
runtimeOnly 'com.mysql:mysql-connector-j'
annotationProcessor 'org.projectlombok:lombok'
testImplementation 'org.springframework.boot:spring-boot-starter-test'
implementation 'io.springfox:springfox-swagger2:2.9.2'
implementation 'io.springfox:springfox-swagger-ui:2.9.2'

// Spring Cloud Eureka Client
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'
```

#### application.properties
```properties
server.port=8082

spring.datasource.url= jdbc:mysql://172.17.0.1:3306/astaro?useUnicode=true&serverTimezone=Asia/Seoul
spring.datasource.username= ${YOUR_MYSQL_USERNAME}
spring.datasource.password= ${YOUR_MYSQL_PASSWORD}
spring.datasource.driver-class-name= com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=false
spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.format_sql=true

logging.level.org.hibernate.type.descriptor.sql.BasicBinder=trace

spring.application.name= board-service
eureka.server.enable-self-prevention= false
eureka.client.registerWithEureka= true
eureka.client.fetchRegistry= true
eureka.client.serviceUrl.defaultZone= http://172.17.0.1:8761/eureka
eureka.instance.hostname= 172.17.0.1
eureka.instance.instanceId= ${spring.application.name}:${spring.application.instance_id:${random.value}}
```

## taro-service

#### dependencies

```java
implementation 'org.springframework.boot:spring-boot-starter-data-jdbc'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
implementation 'io.springfox:springfox-boot-starter:3.0.0'
implementation 'io.springfox:springfox-swagger-ui:3.0.0'
implementation 'com.amazonaws:aws-java-sdk-s3:1.12.96'
implementation 'commons-io:commons-io:2.11.0'
implementation 'org.springframework.boot:spring-boot-starter-validation'
compileOnly 'org.projectlombok:lombok'
runtimeOnly 'com.mysql:mysql-connector-j'
developmentOnly 'org.springframework.boot:spring-boot-devtools'
annotationProcessor 'org.projectlombok:lombok'
testImplementation 'org.springframework.boot:spring-boot-starter-test'

```

#### application.properties
```properties
server.port= 8083

spring.datasource.url= jdbc:mysql://172.17.0.1:3306/astaro?useUnicode=true&serverTimezone=Asia/Seoul
spring.datasource.username= ${YOUR_MYSQL_USERNAME}
spring.datasource.password= ${YOUR_MYSQL_PASSWORD}
spring.datasource.driver-class-name= com.mysql.cj.jdbc.Driver

spring.jpa.database= mysql
spring.jpa.database-platform= org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.open-in-view= false
spring.jpa.show-sql= true
spring.jpa.generate-ddl= true
spring.jpa.hibernate.ddl-auto= none
spring.jpa.properties.hibernate.format_sql= true

spring.mvc.pathmatch.matching-strategy= ant_path_matcher
spring.messages.basename= i18n/exception
spring.messages.encoding= UTF-8

spring.application.name= taro-service
eureka.server.enable-self-prevention= false
eureka.client.registerWithEureka= true
eureka.client.fetchRegistry= true
eureka.client.serviceUrl.defaultZone= http://172.17.0.1:8761/eureka
eureka.instance.hostname= 172.17.0.1
eureka.instance.instanceId= ${spring.application.name}:${spring.application.instance_id:${random.value}}

cloud.aws.stack.auto=false
cloud.aws.region.static=ap-northeast-2
cloud.aws.credentials.access-key=${YOUR_AWS_ACCESS_KEY}
cloud.aws.credentials.secret-key=${YOUR_AWS_SECRET_KEY}
cloud.aws.s3.bucket=astaro

flask.baseurl = ${YOUR_FLASK_BASEURL}
```

## sandart-service

- Python 3.11
- Flask
  
#### requirements.txt
```r
boto3==1.26.133
Flask==2.3.2
opencv-python==4.7.0.72
```

#### config.ini
```ini
[aws]
AWS_ACCESS_KEY_ID = ${YOUR_AWS_ACCESS_KEY}
AWS_SECRET_ACCESS_KEY = ${YOUR_AWS_SECRET_KEY}
```

# Frontend

- node18
- React.js


#### dependencies
```json
"@craco/craco": "^7.1.0",
"@emotion/styled": "^11.10.6",
"@mui/material": "^5.11.16",
"@reduxjs/toolkit": "^1.9.5",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.3.5",
"dom-to-image": "^2.6.0",
"file-saver": "^2.0.5",
"html2canvas": "^1.4.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-icons": "^4.8.0",
"react-loader-spinner": "^5.3.4",
"react-redux": "^8.0.5",
"react-responsive-carousel": "^3.2.23",
"react-router-dom": "^6.9.0",
"react-scripts": "5.0.1",
"react-select": "^5.7.2",
"react-share": "^4.4.1",
"react-speech-kit": "^3.0.1",
"react-speech-recognition": "^3.10.0",
"react-spring": "^9.7.1",
"react-typist": "^2.0.5",
"redux-thunk": "^2.4.2",
"styled-components": "^5.3.8",
"swiper": "^9.3.0"
```

#### nginx.conf (Frontend)
```
server {
  listen 80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
}
```


# Nginx

## nginx
```
upstream lb{
   server http://localhost:8000
   server http://k8a6041.p.ssafy.io:8000
}

server {
    if ($host = k8a604.p.ssafy.io) {
        return 301 https://astaro.co.kr;
    } # managed by Certbot


    if ($host = astaro.co.kr) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80;
  server_name www.astaro.co.kr astaro.co.kr k8a604.p.ssafy.io;
  return 301 https://$server_name$request_uri;
}

server {
    if ($host = www.astaro.co.kr) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        server_name www.astaro.co.kr astaro.co.kr;
    listen 80;
    return 404; # managed by Certbot
}


server {
   server_name www.astaro.co.kr astaro.co.kr;

    location /api/ {
        proxy_pass http://lb;
        proxy_http_version 1.1;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
    }

    location / {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/astaro.co.kr/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/astaro.co.kr/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

```