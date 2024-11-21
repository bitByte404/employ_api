# 智绘未来：高校学生发展智导站

## 项目介绍
智绘未来是一个面向高校学生的职业发展智能导航平台，旨在通过数据分析和智能算法，为学生提供个性化的职业规划和学业指导服务。

### 主要功能
- 🔐 用户认证与授权
  - 账号注册与登录
  - JWT token 认证
  - 角色权限管理

- 👤 个人信息管理
  - 基本信息维护
  - 学业信息记录
  - 个人档案管理

- 📊 职业测评系统
  - MBTI 性格测试
  - Holland 职业兴趣测试
  - 测试结果分析

- 🎯 智能推荐系统
  - 基于专业的职业推荐
  - 个性化发展路径规划
  - 相似案例推荐

- 📈 数据分析与可视化
  - 就业趋势分析
  - 专业分布统计
  - 职业发展追踪

- 👨‍💼 管理员功能
  - 用户管理
  - 数据维护
  - 系统监控

## 技术栈
### 后端
- Spring Boot 3.1.5
- Spring Security + JWT
- Spring Data JPA
- MySQL 8.0
- Maven

### 前端
- React 18
- Material-UI (MUI)
- Redux Toolkit
- React Router
- Axios
- Recharts

## 快速开始

### 环境要求
- JDK 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### 数据库配置
1. 创建数据库：
``` sql
CREATE DATABASE student_guidance DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 配置文件
修改 `src/main/resources/application.properties`：

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_guidance?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
```


### 3. 构建和运行
```bash
mvn clean install
mvn spring-boot:run
```

## 功能模块

### 1. 用户认证模块
#### 注册
``` http
POST /api/auth/register
Content-Type: application/json
{
"username": "student123",
"password": "password123",
"realName": "张三",
"studentId": "2022001",
"phone": "13800138000",
"email": "zhangsan@example.com"
}
```

#### 登录
``` http
POST /api/auth/login
Content-Type: application/json
{
"username": "student123",
"password": "password123"
}
```

### 2. 用户信息模块
#### 获取个人信息
``` http
GET /api/profile
Authorization: Bearer {token}
```


#### 更新个人信息
``` http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json
{
"realName": "张三",
"major": "信息管理",
"politicalStatus": "共青团员",
"hometown": "北京",
"gpa": 3.8
}


### 3. 测试模块
#### 性格测试
``` http
POST /api/tests/personality
Authorization: Bearer {token}
Content-Type: application/json
{
"userId": 1,
"answers": [
{"questionId": 1, "answer": "A"},
{"questionId": 2, "answer": "B"}
]
}
```


#### 职业兴趣测试
``` http
POST /api/tests/career-interest
Authorization: Bearer {token}
Content-Type: application/json
{
"userId": 1,
"answers": [
{"questionId": 1, "answer": "5"},
{"questionId": 2, "answer": "3"}
]
}
```

### 4. 推荐模块
#### 获取个性化推荐
``` http
GET /api/recommendations/similar
Authorization: Bearer {token}
```


### 5. 预测模块
#### 考研院校预测
``` http
GET /api/predictions/graduate-school
Authorization: Bearer {token}


#### 出国院校预测
``` http
GET /api/predictions/overseas
Authorization: Bearer {token}
```

### 6. 数据管理模块（管理员）
#### 用户审核
``` http
PUT /api/management/users/{userId}/audit
Authorization: Bearer {admin_token}
Content-Type: application/json
{
"status": "APPROVED",
"comment": "信息完整，通过审核"
}
```


#### 用户搜索
``` http
GET /api/management/users/search?keyword=张三&page=0&size=10
Authorization: Bearer {admin_token}
```
## 错误处理
所有接口的错误响应格式：
``` json
{
"message": "错误信息描述"
}
```


## 安全说明
1. 所有非 /api/auth/** 的接口都需要 JWT 认证
2. 管理员接口需要 ROLE_ADMIN 角色
3. JWT token 有效期为 24 小时

## 开发指南

### 项目结构
src/main/java/org/example/employ_api/
├── config/ # 配置类
├── controller/ # 控制器
├── dto/ # 数据传输对象
├── model/ # 实体类
├── repository/ # 数据访问层
├── security/ # 安全相关
├── service/ # 业务逻辑
└── util/ # 工具类


### 添加新功能
1. 在 model 包中创建实体类
2. 在 repository 包中创建对应的 Repository
3. 在 service 包中实现业务逻辑
4. 在 controller 包中创建 REST 接口

## 部署说明
1. 修改 application.properties 中的配置
2. 打包：`mvn clean package`
3. 运行：`java -jar target/employ_api-0.0.1-SNAPSHOT.jar`

## 测试
``` bash
mvn test
```
