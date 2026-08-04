# Case Study

## Scenario: SmartRetailX Global Commerce Platform

SmartRetailX is a multinational retail technology company that provides cloud-based digital commerce solutions for supermarkets, online retailers, logistics providers, and warehouse management companies across Europe, Asia, and the Middle East.

The organisation currently operates a large monolithic e-commerce application that manages:

- Online shopping and payments
- Product inventory management
- Delivery and logistics tracking
- Customer loyalty and recommendation systems
- Third-party payment gateway integration
- Real-time order processing

Due to increasing customer demand, seasonal traffic spikes, and expansion into new global markets, the current system is facing significant operational challenges including:

- Limited scalability
- Single points of failure
- High deployment complexity
- Slow feature delivery cycles
- Lack of real-time analytics
- Poor resilience during peak sales periods

SmartRetailX has decided to modernise its platform using a cloud-native distributed architecture deployed on Amazon Web Services (AWS).

You are part of the cloud engineering and software architecture team responsible for designing and implementing a secure, scalable, and highly available distributed web application platform.

# Assignment Tasks

## Task 1 - Cloud-Based Distributed Web Application Design

Design a comprehensive cloud-native architecture for SmartRetailX using suitable AWS cloud services.

Your design should demonstrate:

- Microservices-based architecture
- Containerisation using Docker
- Kubernetes (Amazon EKS)
- Serverless services using AWS Lambda
- Cloud-managed databases
- Event-driven communication

The proposed architecture must clearly address:

- High availability
- Multi-region deployment
- Scalability
- Resilience
- Maintainability
- Cost efficiency

Students must include:

- Professional architecture diagrams
- Data flow diagrams
- Explanation and justification of AWS services used

Suggested AWS services include:

- Amazon EC2
- Amazon EKS
- Amazon API Gateway
- AWS Lambda
- Amazon RDS / Aurora
- Amazon DynamoDB
- Amazon S3
- Amazon CloudFront
- Amazon Route 53
- Amazon SQS / SNS

## Task 2 - Distributed Microservices and API Development

Design and implement a distributed system composed of loosely coupled microservices.

The platform should include services such as:

- User Management Service
- Product Catalogue Service
- Order Processing Service
- Payment Service
- Inventory Management Service
- Notification Service

Your implementation must demonstrate:

- RESTful API design
- API versioning
- API Gateway integration
- Secure service-to-service communication
- Event-driven communication using message queues or event buses

Students should:

- Develop at least three working microservices
- Demonstrate inter-service communication
- Implement API documentation using Swagger/OpenAPI
- Include deployment and configuration files

You may use:

- Node.js
- Python
- Java Spring Boot
- .NET Core

## Task 3 - Security, Compliance, and Identity Management

Design and implement a security model suitable for a global retail platform.

Your discussion and implementation should address:

- Authentication and authorisation
- OAuth 2.0 and JWT-based security
- Role-Based Access Control (RBAC)
- Secure API communication
- Encryption in transit and at rest
- Secrets management
- Compliance with GDPR and PCI-DSS requirements

Students should also discuss:

- Security risks in distributed systems
- Zero Trust security concepts
- API security best practices
- Identity federation approaches

Implementation evidence should include:

- Authentication flows
- Sample JWT tokens
- API security screenshots
- Configuration examples

## Task 4 - Real-Time Data Synchronisation and Event Processing

Implement real-time data synchronisation mechanisms for the following:

- Inventory stock updates
- Customer order status changes
- Delivery tracking updates
- Real-time pricing and promotions

Your solution should use event-driven architecture concepts such as:

- Amazon EventBridge
- Apache Kafka
- Amazon SQS/SNS
- WebSockets or server push mechanisms

Students must demonstrate:

- Real-time communication between services
- Asynchronous processing
- Event publishing and subscription
- Data consistency mechanisms

Discuss the use of:

- Eventual consistency
- Saga pattern
- CQRS
- Distributed transaction challenges

## Task 5 - Fault Tolerance, Resilience, and Disaster Recovery

Demonstrate how your distributed system achieves resilience and fault tolerance.

Your discussion and implementation should include:

- Retry mechanisms
- Circuit breaker patterns
- Load balancing
- Auto-scaling
- Multi-AZ deployment
- Disaster recovery planning
- Backup and recovery mechanisms

Students should explain:

- Failure handling strategies
- Service redundancy
- High availability architecture
- Recovery Time Objective (RTO) and Recovery Point Objective (RPO)

Include diagrams, configuration examples, or screenshots.

## Task 6 - Performance and Scalability Testing

Conduct performance and scalability testing on your application.

Testing should include:

- Load testing
- Stress testing
- API response testing
- Concurrent user testing

Students should:

- Use tools such as JMeter, Locust, or k6
- Measure latency, throughput, CPU utilisation, and error rates
- Analyse bottlenecks and system behaviour
- Discuss scalability improvements

Evidence should include:

- Graphs and charts
- Performance reports
- Screenshots and analysis

## Task 7 - Monitoring, Logging, and Observability

Implement monitoring and observability for the distributed application.

Students should demonstrate:

- Centralised logging
- Metrics collection
- Distributed tracing
- Alerting mechanisms
- Health monitoring dashboards

Suggested tools include:

- Amazon CloudWatch
- AWS X-Ray
- ELK Stack
- Prometheus and Grafana

Students must include:

- Monitoring dashboards
- Logs and traces
- Alert configuration examples
- Fault diagnosis evidence

## Task 8 - Testing and Validation Strategy

Develop and demonstrate a comprehensive testing strategy.

Your testing activities should include:

- Unit testing
- Integration testing
- API testing
- End-to-end testing
- Security testing

Students should:

- Use testing frameworks appropriate to the selected programming language
- Demonstrate API testing using Postman or Swagger
- Include screenshots and testing outputs
- Explain testing coverage and limitations

# Deliverables

Students must submit the following:

## 1\. Final Technical Report (PDF)

The report should include:

- System architecture and justification
- Cloud-native design discussion
- Security and compliance implementation
- API and distributed system implementation
- Real-time event processing discussion
- Testing and performance analysis
- Monitoring and observability implementation
- Challenges encountered and future improvements

Recommended length:

- 4,000-5,000 words

## 2\. Source Code Submission (ZIP)

The source code package must include:

- Microservices source code
- API definitions
- Dockerfiles
- Kubernetes or deployment manifests
- Infrastructure configuration files
- Testing scripts
- README documentation

## 3\. Presentation Slides

Students must prepare:

- A 10-15 slide presentation
- Approximately 15 minutes in duration

The presentation should summarise:

- Architecture design
- Key implementation components
- Security approach
- Real-time distributed communication
- Testing outcomes
- Lessons learned

# Assessment Criteria

| **Component**         | **Weight** |
| --------------------- | ---------- |
| Architecture Design   | 20%        |
| Implementation        | 40%        |
| Testing and Results   | 20%        |
| Presentation and Viva | 20%        |

# Report Structure Guidance

Students are expected to structure the report professionally using the following format:

## 1\. Introduction

- Background of the scenario
- Objectives of the solution
- Scope of implementation

## 2\. System Design and Architecture

- Cloud architecture
- Distributed system design
- API architecture
- Security design

## 3\. Implementation

- Microservices implementation
- Deployment approach
- Event-driven communication
- Database integration

## 4\. Testing and Evaluation

- Functional testing
- Performance testing
- Security testing
- Results and analysis

## 5\. Conclusion

- Summary of outcomes
- Reflection on challenges
- Future improvements

## 6\. References

Students must use:

- Harvard referencing style
- Academic journals
- Industry standards
- AWS documentation

## 7\. Appendices

Include:

- Screenshots
- Logs
- Deployment evidence
- Test outputs
- Configuration files

# Academic Integrity

Students must ensure that:

- All work submitted is original.
- External sources are appropriately referenced.
- Source code developed by others is clearly acknowledged.
- AI-assisted tools are used in accordance with university regulations.

Any plagiarism or academic misconduct will be investigated according to university policy.

# Advice to Students

- Start implementation activities early.
- Use GitHub or version control systems to manage code.
- Test microservices independently before integration.
- Use Docker containers for consistency.
- Maintain implementation evidence throughout development.
- Include critical analysis rather than purely descriptive explanations.
- Use diagrams and tables to improve clarity.
- Ensure APIs are properly documented.