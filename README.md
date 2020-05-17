#### Azure Serverless Funcation 
### (note: I created this tutorials as part of course materials as Teaching Assistant, so basically it is free to use for any education purpose. )
This tutorial provides references for review and familiarization with how to create and run a web application with Nodejs and Express on Azure Serverless, more specifically it emphasizes the web services with DB connections to allow end-users query web services with typical CRUD operations.   

Nomenclature:
WS 		… Web Service
Azure               … A public cloud provider 
Serverless          … Elastic Load Balancing
REST               …. Representative Stateless Transition
TOC

T4.1 … AWS and EB (Elastic Beanstalk) 
T4.2 … WS using Nodejs running on AWS with WS – no DB access (data will be a JS Object)
T4.3 … WS using Nodejs running on AWS with WS accessing a managed DB on AWS
References
Appendix

T4.1 Azure and Serverless Computing 

From Azure Official Documents (https://azure.microsoft.com/en-ca/overview/serverless-computing/):  

What is serverless computing?

Serverless computing enables developers to build applications faster by eliminating the need for them to manage infrastructure. With serverless applications, the cloud service provider automatically provisions, scales and manages the infrastructure required to run the code.

In understanding the definition of serverless computing, it’s important to note that servers are still running the code. The serverless name comes from the fact that the tasks associated with infrastructure provisioning and management are invisible to the developer. This approach enables developers to increase their focus on the business logic and deliver more value to the core of the business. Serverless computing helps teams increase their productivity and bring products to market faster, and it allows organisations to better optimise resources and stay focused on innovation.

T4.2 WS using Nodejs running on Serverless Azure 

If you are unfamiliar with Azure or Serverless Computing, it is recommended that first you find and review some resources on the web that describes deployment of Nodejs services on Azure Serverless Platform, such as the few resources below.

[1]	What is Azure:
https://azure.microsoft.com/en-ca/overview/serverless-computing/

[2]	Deploy REST API as Serverless functions on Azure
https://serverless.com/blog/serverless-azure-functions-v1/


Step 1:  Follow the Step 1 and 2 in referred document above [2]. Do not add the sample code in document under your project folder, instead add our own course sample code or your customized working code under your project.

Step 2:  Execute command “sls offline” to test your application locally to verify your work before actual deployment:
 

Successful Information:
 

Step 2:  Follow the Steps of Deployment in document above [2]. Make sure you have a valid Azure account.

The example in this tutorial shows how to create a web 

JS code is shown in: (now shown in appendix, but eventually they will be in some module on BS).  

The code needs to be modified to support the update request 
(We will use default serverless port 7071 for testing:  “127.0.0.1:7071”  locally)
Parameters passing … Screenshots highlighting (the parameters can be sent through “query”, “body” and “params”, please check details in NodeJS document)
 
-	Invocation using a browser (how parameters are specified and point out that type they are assumed to be) … 

	Return All Records:
http://127.0.0.1:7071/readall   (Method: GET, can be tested on browser directly)

 
Return Certain Record based on “Part_no” (Method: GET, can be tested on browser directly)
http://127.0.0.1:7071/api/read?part_no=0  (Replace: part_no with the demand part no you want to search, for example:  0 )

 
-	Invocation using Postman … need a screenshot or two

	Create One Record: (Method: POST  - test in demo or use POSTMAN post request)
http://127.0.0.1:7071/api/create (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)

 

	Update One Record: (Method: POST  - test in demo or use POSTMAN post request)
http://127.0.0.1:7071/update (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)

 

	Delete One Record (Method: POST  - test in demo or use POSTMAN post request): 
http://127.0.0.1:7071/api/delete (Replace: part_no with the demand part no you want to delete, for example:  0 )

