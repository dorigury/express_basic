# 프로젝트 시작
npm init -y

...

# dependency 설치 
 npm i [dependency 이름]
- express: 백엔드 프레임워크 
npm i express
- cors: cors설정
npm i cors
- json: json 파싱
npm i json
- body-parser: 요청 body 받기 
npm i body-parser
- nodeman: index.js 저장시 서버 새로고침, 개발모드에만 설치
npm i nodemon -D

# api test
- postman 
- REST Client (vs code extension)

# database
- 계정 및 database 생성 (root)
```
create database db_test;
create user user_test@localhost identified by '1234';
grant all privileges on db_test.* to user_test@localhost;
```

- 사용할 table
```
drop table if exists nations_table;
create table nations_table(
	id bigint auto_increment primary key,
    name varchar(20),
    capital varchar(20),
    population int
    );

insert into nations_table(name, capital, population) values(?,?,?);    
```

- mysql 설치
npm i mysql 

