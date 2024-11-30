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
```


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

## 数据初始化
### 导入测试数据
1. 确保已创建数据库并配置好连接：
```sql
CREATE DATABASE student_guidance DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 清空并重新插入毕业生信息：
```sql
-- 清空表
TRUNCATE TABLE graduate_info;

-- 插入多样化的毕业生数据
INSERT INTO graduate_info (
    name, major, graduation_year, career_path, workplace, 
    position, location, gpa, awards, skills, 
    experience, experience_type
) VALUES 
-- 就业方向案例
('张三', '信息管理', '2023', '就业', '腾讯', 
'产品经理', '深圳', 3.8, '校级奖学金,产品设计大赛一等奖', 'Python,SQL,产品设计,用户研究', 
'在字节跳动实习3个月，负责抖音电商数据分析；在腾讯实习4个月，参与微信支付产品改进', '实习'),

('李四', '信息管理', '2023', '就业', '阿里巴巴', 
'数据分析师', '杭州', 3.9, '国家奖学金,数据分析大赛冠军', 'R语言,Python,机器学习,数据可视化', 
'参与阿里巴巴数据分析实习项目，负责用户行为分析和商业策略优化', '实习'),

-- 考研方向案例
('王五', '信息管理', '2023', '考研', '清华大学', 
'信息管理与信息系统', '北京', 3.95, '省级优秀毕业生,学术创新奖', 'Java,研究方法,学术写作', 
'参与导师科研项目，发表核心期刊论文2篇，获得专利1项', '科研'),

('赵六', '信息管理', '2023', '考研', '北京大学', 
'管理科学与工程', '北京', 3.85, '校级优秀学生,科研创新奖', 'SPSS,科研方法论,数据挖掘', 
'主持一项省级大学生创新项目，参与国家自然科学基金项目研究', '科研'),

-- 出国方向案例
('钱七', '信息管理', '2023', '出国', '哥伦比亚大学', 
'信息管理', '纽约', 3.7, 'TOEFL:110,GRE:325', '英语,Python,研究方法', 
'参加国际学术会议，获得会议最佳论文奖；完成一篇英文学术论文', '学术交流'),

('孙八', '信息管理', '2023', '出国', '伦敦大学学院', 
'数据科学', '伦敦', 3.75, 'IELTS:7.5,编程大赛金奖', '英语,机器学习,深度学习', 
'参与国际合作项目，与多个国家的团队合作开发AI应用', '项目研究');
```

3. 导入其他专业的数据：
```sql
INSERT INTO graduate_info (
    name, major, graduation_year, career_path, workplace, 
    position, location, gpa, awards, skills, 
    experience, experience_type
) VALUES 
('李明', '计算机科学', '2023', '就业', '字节跳动', 
'后端工程师', '北京', 3.85, '蓝桥杯金奖', 'Java,Spring,MySQL', 
'负责抖音后端服务开发，参与系统架构设计', '实习'),

('王芳', '数据科学', '2023', '考研', '浙江大学', 
'人工智能', '杭州', 3.92, '数学建模国赛一等奖', 'Python,机器学习,深度学习', 
'参与多个AI项目研发，发表SCI论文1篇', '科研');
```

### 数据库表结构
主要数据表结构如下：
1. users - 用户信息表
2. graduate_info - 毕业生信息表
3. personality_tests - 性格测试表
4. career_tests - 职业测试表
