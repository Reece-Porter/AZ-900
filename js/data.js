/* =====================================================================
   AZ-900 Study Hub — shared data
   Flashcards, mock-test questions, and term/definition pairs.
   Categories map to the three official exam domains.
   ===================================================================== */

const CATEGORIES = {
  cloud:   { name: "Cloud Concepts",            weight: "25–30%", color: "#3a8dff" },
  arch:    { name: "Azure Architecture & Services", weight: "35–40%", color: "#7c5cff" },
  govern:  { name: "Management & Governance",   weight: "30–35%", color: "#36d399" },
};

/* ---------------------------------------------------------------------
   TOPICS — finer-grained subjects within each domain.
   Used by the Progress dashboard to track strengths & weaknesses.
   --------------------------------------------------------------------- */
const TOPICS = {
  c_models:   { name: "Cloud Models",                 cat: "cloud" },
  c_cost:     { name: "Cost Model (CapEx/OpEx)",       cat: "cloud" },
  c_shared:   { name: "Shared Responsibility",         cat: "cloud" },
  c_benefits: { name: "Cloud Benefits",                cat: "cloud" },
  c_types:    { name: "Service Types (IaaS/PaaS/SaaS)", cat: "cloud" },

  a_core:     { name: "Core Architecture",             cat: "arch" },
  a_compute:  { name: "Compute",                       cat: "arch" },
  a_network:  { name: "Networking",                    cat: "arch" },
  a_storage:  { name: "Storage",                       cat: "arch" },
  a_identity: { name: "Identity & Security",           cat: "arch" },

  g_cost:     { name: "Cost Management",               cat: "govern" },
  g_gov:      { name: "Governance & Compliance",       cat: "govern" },
  g_tools:    { name: "Management Tools",              cat: "govern" },
  g_monitor:  { name: "Monitoring",                    cat: "govern" },
};

/* ---------------------------------------------------------------------
   FLASHCARDS  — { q, a, cat }
   --------------------------------------------------------------------- */
const FLASHCARDS = [
  // ---- Cloud Concepts ----
  { cat: "cloud", q: "What is cloud computing?", a: "Delivery of computing services (servers, storage, databases, networking, software, analytics) over the internet ('the cloud'), typically billed on a pay-as-you-go consumption model." },
  { cat: "cloud", q: "Define the consumption-based / pay-as-you-go model.", a: "You pay only for the resources you actually use, with no upfront cost. Scale up/down on demand and stop paying when you stop using resources." },
  { cat: "cloud", q: "CapEx vs OpEx?", a: "CapEx (Capital Expenditure) = large upfront spend on physical assets (servers, datacenters). OpEx (Operational Expenditure) = ongoing pay-as-you-go spend for services. Cloud favours OpEx." },
  { cat: "cloud", q: "What is the shared responsibility model?", a: "Security and management duties are split between the cloud provider and the customer. The provider secures the cloud; the customer secures what they put in the cloud." },
  { cat: "cloud", q: "In the shared responsibility model, what is ALWAYS the customer's responsibility?", a: "Information & data, devices (mobile/PC), and accounts & identities — regardless of IaaS, PaaS, or SaaS." },
  { cat: "cloud", q: "In the shared responsibility model, what is ALWAYS the provider's responsibility?", a: "Physical hosts, physical network, and physical datacenter — regardless of service type." },
  { cat: "cloud", q: "What is a public cloud?", a: "Services offered over the public internet and shared across multiple organizations (multi-tenant). Owned and operated by a third-party provider like Microsoft Azure. No CapEx; high scalability." },
  { cat: "cloud", q: "What is a private cloud?", a: "Cloud resources used exclusively by a single organization. Can be on-premises or hosted by a third party. Offers more control but requires CapEx and maintenance." },
  { cat: "cloud", q: "What is a hybrid cloud?", a: "Combines public and private clouds, allowing data and apps to move between them. Offers flexibility, supports legacy/compliance needs, and lets you 'burst' to public cloud for extra capacity." },
  { cat: "cloud", q: "What is multi-cloud?", a: "Using services from more than one public cloud provider (e.g., Azure + AWS) at the same time." },
  { cat: "cloud", q: "What is Azure Arc?", a: "A service that lets you manage on-premises, multi-cloud, and edge resources through Azure — extending Azure management and governance to a hybrid/multi-cloud environment." },
  { cat: "cloud", q: "Vertical scaling vs horizontal scaling?", a: "Vertical (scale up/down) = add more power (CPU/RAM) to an existing resource. Horizontal (scale out/in) = add or remove more instances of a resource." },
  { cat: "cloud", q: "What is high availability (HA)?", a: "Keeping services running and accessible with minimal downtime, often expressed as an SLA percentage (e.g., 99.9%). Achieved through redundancy across availability zones/regions." },
  { cat: "cloud", q: "What is reliability in cloud?", a: "The ability of a system to recover from failures and continue to function. Supported by a decentralized, globally distributed design." },
  { cat: "cloud", q: "What is elasticity / scalability?", a: "The ability to automatically add or remove resources to match demand, so you only pay for what you need at any moment." },
  { cat: "cloud", q: "What is IaaS (Infrastructure as a Service)?", a: "The most flexible cloud category. Provider manages physical infra; you manage OS, runtime, apps and data. Example: Azure Virtual Machines. Most customer responsibility." },
  { cat: "cloud", q: "What is PaaS (Platform as a Service)?", a: "Provider manages infrastructure AND the OS/runtime; you manage only your apps and data. Example: Azure App Service, Azure SQL Database. Great for developers." },
  { cat: "cloud", q: "What is SaaS (Software as a Service)?", a: "Provider manages everything; you just use the software. You're responsible only for your data, devices, and accounts. Example: Microsoft 365, Outlook. Least customer responsibility." },
  { cat: "cloud", q: "Which service model gives the MOST control? Which gives the LEAST?", a: "IaaS gives the most control/responsibility. SaaS gives the least control/responsibility." },

  // ---- Architecture & Services ----
  { cat: "arch", q: "What is an Azure region?", a: "A geographical area containing one or more datacenters that are networked together and close to each other (low latency)." },
  { cat: "arch", q: "What is a region pair?", a: "Two regions at least 300 miles apart within the same geography, used for disaster recovery. Updates roll out to one region at a time; one region in each pair is prioritized for recovery." },
  { cat: "arch", q: "What are Availability Zones?", a: "Physically separate datacenters within a single Azure region, each with independent power, cooling, and networking. Used to protect apps from datacenter-level failures (min. 3 per enabled region)." },
  { cat: "arch", q: "What is a sovereign / specialized region?", a: "Isolated Azure instances for compliance or legal reasons (e.g., Azure Government, Azure operated by 21Vianet in China)." },
  { cat: "arch", q: "What is an Azure resource?", a: "A manageable item available through Azure — e.g., a VM, storage account, database, or virtual network." },
  { cat: "arch", q: "What is a resource group?", a: "A logical container that holds related Azure resources. Resources can only belong to one group; deleting a group deletes all resources in it." },
  { cat: "arch", q: "What is an Azure subscription?", a: "A logical unit of Azure services linked to an account, used for billing and access boundaries. Acts as a billing and management boundary." },
  { cat: "arch", q: "What are management groups?", a: "Containers above subscriptions that let you apply governance (policies, RBAC) across multiple subscriptions at once. Sit at the top of the hierarchy." },
  { cat: "arch", q: "Order the Azure management hierarchy (top to bottom).", a: "Management groups → Subscriptions → Resource groups → Resources." },
  { cat: "arch", q: "What is Azure Resource Manager (ARM)?", a: "The deployment and management layer/service for Azure. All requests go through ARM, which authenticates and authorizes them. Enables templates, RBAC, tags, and locks." },
  { cat: "arch", q: "What are Azure Virtual Machines (VMs)?", a: "IaaS compute that gives you a virtualized server (Windows or Linux) where you control the OS and software. Good for full control and lift-and-shift migrations." },
  { cat: "arch", q: "What are Virtual Machine Scale Sets?", a: "Let you create and manage a group of identical, load-balanced VMs that automatically scale based on demand or schedule." },
  { cat: "arch", q: "What are Availability Sets?", a: "Group VMs across multiple fault domains and update domains within a datacenter to protect against hardware failures and maintenance downtime." },
  { cat: "arch", q: "What is Azure App Service?", a: "A PaaS offering for building, deploying, and scaling web apps, REST APIs, and mobile backends without managing infrastructure." },
  { cat: "arch", q: "What is Azure Container Instances (ACI)?", a: "The fastest, simplest PaaS way to run a single container in Azure without managing servers or orchestration." },
  { cat: "arch", q: "What is Azure Kubernetes Service (AKS)?", a: "A managed Kubernetes service for orchestrating and scaling large numbers of containers across clusters." },
  { cat: "arch", q: "What are containers vs VMs?", a: "VMs virtualize hardware and each has its own OS (heavier). Containers virtualize the OS, are lightweight, start fast, and share the host OS kernel." },
  { cat: "arch", q: "What is Azure Functions?", a: "A serverless compute service that runs event-driven code without provisioning infrastructure. You pay per execution; ideal for short tasks triggered by events." },
  { cat: "arch", q: "What is Azure Virtual Desktop?", a: "A desktop and app virtualization service in the cloud, delivering Windows desktops accessible from anywhere (supports multi-session Windows)." },
  { cat: "arch", q: "What is an Azure Virtual Network (VNet)?", a: "A logically isolated network in Azure that enables Azure resources (like VMs) to securely communicate with each other, the internet, and on-premises networks." },
  { cat: "arch", q: "What is VNet peering?", a: "Connects two virtual networks so resources can communicate privately via the Microsoft backbone, as if on the same network." },
  { cat: "arch", q: "What is a VPN Gateway?", a: "Sends encrypted traffic between an Azure VNet and on-premises over the public internet (site-to-site) or to individual clients (point-to-site)." },
  { cat: "arch", q: "What is Azure ExpressRoute?", a: "A private, dedicated connection between on-premises and Azure that does NOT go over the public internet — offering higher reliability, speed, and security." },
  { cat: "arch", q: "What is Azure DNS?", a: "A hosting service for DNS domains, providing name resolution using Microsoft Azure infrastructure." },
  { cat: "arch", q: "Name the four Azure Storage data services.", a: "Blob storage (objects), File storage (SMB/NFS file shares), Queue storage (messaging), and Table storage (NoSQL key-value)." },
  { cat: "arch", q: "What is Azure Blob Storage?", a: "Object storage for massive amounts of unstructured data (text, images, video, backups). Supports access tiers for cost optimization." },
  { cat: "arch", q: "What are the blob storage access tiers?", a: "Hot (frequent access), Cool (infrequent, 30+ days), Cold (rarely, 90+ days), and Archive (lowest cost, offline, rehydration needed). Cost decreases but access latency/cost increases down the tiers." },
  { cat: "arch", q: "What is LRS (Locally Redundant Storage)?", a: "Replicates data 3 times within a single datacenter in one region. Lowest cost, lowest durability — protects against drive/server failures only." },
  { cat: "arch", q: "What is ZRS (Zone-Redundant Storage)?", a: "Replicates data synchronously across 3 availability zones within a region — protects against datacenter (zone) failure." },
  { cat: "arch", q: "What is GRS (Geo-Redundant Storage)?", a: "Replicates data to a secondary region (LRS in each), protecting against a full regional outage. GZRS combines ZRS in the primary region with geo-replication." },
  { cat: "arch", q: "What is Azure Migrate?", a: "A central hub of tools for discovering, assessing, and migrating on-premises servers, databases, and apps to Azure." },
  { cat: "arch", q: "What is Azure Data Box?", a: "A physical appliance shipped to you to transfer large amounts of data (up to ~80 TB) to Azure offline when network transfer is impractical." },
  { cat: "arch", q: "What is AzCopy?", a: "A command-line tool for copying blobs or files to/from a storage account quickly." },
  { cat: "arch", q: "What is Azure File Sync?", a: "Centralizes file shares in Azure Files while keeping a cached copy on a local Windows Server for fast local access." },
  { cat: "arch", q: "What is Microsoft Entra ID (formerly Azure AD)?", a: "Microsoft's cloud-based identity and access management service. Handles authentication, SSO, and access to apps/resources." },
  { cat: "arch", q: "Authentication vs Authorization?", a: "Authentication (AuthN) = proving who you are. Authorization (AuthZ) = determining what you're allowed to do/access. AuthN comes first." },
  { cat: "arch", q: "What is Single Sign-On (SSO)?", a: "Lets a user sign in once and access multiple applications/resources without re-entering credentials." },
  { cat: "arch", q: "What is Multi-Factor Authentication (MFA)?", a: "Requires two or more verification factors: something you know (password), something you have (phone/token), something you are (biometric)." },
  { cat: "arch", q: "What is Conditional Access?", a: "A Microsoft Entra feature that applies access policies based on signals (user, location, device, risk) to allow, block, or require MFA." },
  { cat: "arch", q: "Microsoft Entra ID vs Active Directory Domain Services (AD DS)?", a: "AD DS is on-premises, uses Kerberos/LDAP, and manages domain-joined devices. Entra ID is cloud-based, uses modern protocols (SAML/OAuth/OpenID), and is for web/cloud apps." },
  { cat: "arch", q: "What are Microsoft Entra external identities (B2B vs B2C)?", a: "B2B = collaborate with partners/guests using their own credentials. B2C = manage identities of customers/consumers of your app." },

  // ---- Management & Governance ----
  { cat: "govern", q: "What factors affect Azure cost?", a: "Resource type, services used, location/region, ingress vs egress (outbound data) traffic, subscription type, and Azure Marketplace items." },
  { cat: "govern", q: "What is the Azure Pricing Calculator?", a: "A tool to estimate the cost of Azure products and services before deploying them." },
  { cat: "govern", q: "What is the Total Cost of Ownership (TCO) Calculator?", a: "A tool that estimates cost savings by comparing on-premises infrastructure costs with running equivalent workloads in Azure." },
  { cat: "govern", q: "What is Microsoft Cost Management?", a: "A tool to monitor, analyze, and optimize actual Azure spend, set budgets, and create alerts on usage." },
  { cat: "govern", q: "What are tags in Azure?", a: "Name/value metadata pairs applied to resources for organizing, grouping costs, and reporting (e.g., Environment=Production, CostCenter=Finance)." },
  { cat: "govern", q: "What is Azure Policy?", a: "A governance service that creates, assigns, and manages rules to ensure resources stay compliant with corporate standards (e.g., allowed regions, required tags)." },
  { cat: "govern", q: "What is Role-Based Access Control (RBAC)?", a: "Grants users/groups specific permissions (roles) scoped to management groups, subscriptions, resource groups, or resources. Follows least-privilege; uses allow model." },
  { cat: "govern", q: "What are resource locks?", a: "Prevent accidental deletion or modification of resources. Two types: CanNotDelete (read/modify but not delete) and ReadOnly (read only)." },
  { cat: "govern", q: "What is the Microsoft Purview?", a: "A unified data governance and compliance solution to manage and govern on-premises, multi-cloud, and SaaS data." },
  { cat: "govern", q: "What is the Service Trust Portal?", a: "A portal that publishes Microsoft's security, privacy, and compliance audit reports, certifications, and related resources." },
  { cat: "govern", q: "What is Microsoft Entra ID's relationship to compliance?", a: "Supports governance through identity, but compliance documentation lives in the Service Trust Portal; data governance in Microsoft Purview." },
  { cat: "govern", q: "What is the Azure portal?", a: "A web-based, unified graphical console to build, manage, and monitor Azure resources without command-line tools." },
  { cat: "govern", q: "What is Azure Cloud Shell?", a: "A browser-based shell (Bash or PowerShell) for managing Azure, requiring no local installation." },
  { cat: "govern", q: "Azure CLI vs Azure PowerShell?", a: "Both are command-line management tools. Azure CLI uses cross-platform 'az' commands; Azure PowerShell uses cmdlets (Verb-Noun). Choice is usually preference/existing skills." },
  { cat: "govern", q: "What are ARM templates?", a: "JSON files that define infrastructure as code, allowing repeatable, declarative, automated deployment of Azure resources." },
  { cat: "govern", q: "What is Bicep?", a: "A domain-specific language (DSL) that simplifies authoring infrastructure as code for Azure, compiling down to ARM JSON with cleaner syntax." },
  { cat: "govern", q: "What is Azure Advisor?", a: "A free service that analyzes your configurations and gives personalized recommendations across Cost, Security, Reliability, Operational Excellence, and Performance." },
  { cat: "govern", q: "What is Azure Service Health?", a: "Provides a personalized view of the health of the Azure services and regions you use, including outages, planned maintenance, and health advisories." },
  { cat: "govern", q: "What is Azure Monitor?", a: "A comprehensive platform for collecting, analyzing, and acting on telemetry (metrics and logs) from Azure and on-premises environments." },
  { cat: "govern", q: "What is Log Analytics?", a: "A tool within Azure Monitor used to edit and run log queries (KQL) against collected data and analyze results." },
  { cat: "govern", q: "What is Application Insights?", a: "An Azure Monitor feature for monitoring live web applications — performance, availability, and usage analytics for developers." },
  { cat: "govern", q: "What are Azure Monitor alerts?", a: "Proactively notify you (or trigger actions) when monitoring data crosses a defined threshold or condition." },
  { cat: "govern", q: "What is the Microsoft Trust Center / SLA?", a: "An SLA (Service Level Agreement) is Microsoft's commitment to uptime/performance for a service. Free/preview services usually have no SLA. Higher redundancy raises the SLA." },
];

/* ---------------------------------------------------------------------
   MOCK-TEST QUESTIONS — { q, options[], answer(index), explain, cat }
   --------------------------------------------------------------------- */
const QUESTIONS = [
  // Cloud Concepts
  { cat: "cloud", topic: "c_models", q: "Which cloud model allows data and applications to be shared between on-premises infrastructure and a public cloud?", options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"], answer: 2, explain: "A hybrid cloud combines public and private clouds, letting data and apps move between them — useful for legacy, compliance, or burst scenarios." },
  { cat: "cloud", topic: "c_cost", q: "A company wants to avoid large upfront hardware purchases and pay only for what they use. Which expenditure model does the cloud primarily support?", options: ["CapEx (Capital Expenditure)", "OpEx (Operational Expenditure)", "Fixed cost", "Deferred expenditure"], answer: 1, explain: "Cloud uses OpEx — ongoing, pay-as-you-go operational spending — rather than large upfront CapEx investments." },
  { cat: "cloud", topic: "c_shared", q: "In the shared responsibility model, which item is ALWAYS the customer's responsibility regardless of service type?", options: ["Physical datacenter", "Information and data", "Physical network", "Physical hosts"], answer: 1, explain: "Data, devices, and accounts/identities are always the customer's responsibility. Physical hosts, network, and datacenter are always the provider's." },
  { cat: "cloud", topic: "c_types", q: "Which cloud service type gives the customer the MOST control over the operating system?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], answer: 2, explain: "IaaS gives the most control — the customer manages the OS, runtime, and applications, while the provider manages physical infrastructure." },
  { cat: "cloud", topic: "c_types", q: "Microsoft 365 and Outlook are examples of which cloud service model?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], answer: 2, explain: "These are fully managed software products you simply use — Software as a Service (SaaS)." },
  { cat: "cloud", topic: "c_benefits", q: "Adding more CPU and RAM to an existing virtual machine is an example of:", options: ["Horizontal scaling (scale out)", "Vertical scaling (scale up)", "Load balancing", "Geo-replication"], answer: 1, explain: "Adding power to an existing resource is vertical scaling (scaling up). Adding more instances is horizontal scaling (scaling out)." },
  { cat: "cloud", topic: "c_benefits", q: "Which benefit describes a system's ability to recover from failures and continue functioning?", options: ["Scalability", "Elasticity", "Reliability", "Agility"], answer: 2, explain: "Reliability is the ability to recover from failures and keep working, supported by a globally distributed design." },
  { cat: "cloud", topic: "c_models", q: "Which Azure capability extends Azure management and governance to on-premises and other clouds?", options: ["Azure Arc", "Azure Migrate", "Azure Monitor", "Azure Policy"], answer: 0, explain: "Azure Arc projects on-premises, multi-cloud, and edge resources into Azure so they can be managed centrally." },
  { cat: "cloud", topic: "c_types", q: "A startup wants to deploy a web app without managing any servers, OS patching, or runtime. Which model best fits?", options: ["IaaS", "PaaS", "On-premises", "Co-location"], answer: 1, explain: "PaaS (e.g., Azure App Service) lets developers focus on the app while the provider manages OS, runtime, and infrastructure." },
  { cat: "cloud", topic: "c_models", q: "Which is a key characteristic of a public cloud?", options: ["Hardware is dedicated to one organization", "Requires significant CapEx", "Resources are shared (multi-tenant) over the internet", "Must be hosted on-premises"], answer: 2, explain: "Public cloud is multi-tenant, delivered over the internet by a third party, with no CapEx and high scalability." },

  // Architecture & Services
  { cat: "arch", topic: "a_core", q: "What is the correct Azure management hierarchy from top to bottom?", options: ["Subscriptions → Management groups → Resource groups → Resources", "Management groups → Subscriptions → Resource groups → Resources", "Resource groups → Subscriptions → Management groups → Resources", "Resources → Resource groups → Subscriptions → Management groups"], answer: 1, explain: "Top to bottom: Management groups → Subscriptions → Resource groups → Resources." },
  { cat: "arch", topic: "a_core", q: "Which feature protects an application from an entire datacenter failure within a region?", options: ["Region pairs", "Availability Zones", "Resource groups", "Availability Sets"], answer: 1, explain: "Availability Zones are physically separate datacenters within a region, each with independent power, cooling, and networking." },
  { cat: "arch", topic: "a_core", q: "A region pair consists of two regions that are at least how far apart?", options: ["50 miles", "100 miles", "300 miles", "1000 miles"], answer: 2, explain: "Region pairs are at least 300 miles apart within the same geography for disaster recovery." },
  { cat: "arch", topic: "a_compute", q: "Which compute service is serverless and runs event-driven code, billing per execution?", options: ["Azure Virtual Machines", "Azure App Service", "Azure Functions", "Azure Kubernetes Service"], answer: 2, explain: "Azure Functions is serverless — it runs code in response to events and you pay only for executions." },
  { cat: "arch", topic: "a_compute", q: "Which service provides a managed environment for orchestrating large numbers of containers?", options: ["Azure Container Instances", "Azure Kubernetes Service", "Azure App Service", "Azure Functions"], answer: 1, explain: "AKS (Azure Kubernetes Service) is the managed Kubernetes orchestration service for running containers at scale." },
  { cat: "arch", topic: "a_network", q: "Which connection type provides a private, dedicated link to Azure that does NOT use the public internet?", options: ["VPN Gateway", "VNet peering", "ExpressRoute", "Azure DNS"], answer: 2, explain: "ExpressRoute creates a private dedicated connection between on-premises and Azure, bypassing the public internet." },
  { cat: "arch", topic: "a_storage", q: "A company needs to store large amounts of unstructured data such as images and video backups. Which service fits best?", options: ["Azure Files", "Azure Blob Storage", "Azure Queue Storage", "Azure Table Storage"], answer: 1, explain: "Blob storage is object storage optimized for massive amounts of unstructured data." },
  { cat: "arch", topic: "a_storage", q: "Which storage redundancy option replicates data across three availability zones in the primary region?", options: ["LRS", "ZRS", "GRS", "RA-GRS"], answer: 1, explain: "ZRS (Zone-Redundant Storage) replicates synchronously across three availability zones, protecting against zone/datacenter failure." },
  { cat: "arch", topic: "a_storage", q: "Which blob access tier offers the lowest storage cost for rarely accessed, long-term archival data?", options: ["Hot", "Cool", "Cold", "Archive"], answer: 3, explain: "Archive is the lowest-cost, offline tier for rarely accessed data; retrieving data requires rehydration." },
  { cat: "arch", topic: "a_storage", q: "You need to transfer 80 TB of data to Azure but have limited network bandwidth. What's the best option?", options: ["AzCopy", "Azure File Sync", "Azure Data Box", "Azure Migrate"], answer: 2, explain: "Azure Data Box is a physical appliance for offline transfer of very large datasets when network transfer is impractical." },
  { cat: "arch", topic: "a_identity", q: "What is the difference between authentication and authorization?", options: ["They are the same thing", "Authentication proves identity; authorization determines access rights", "Authorization proves identity; authentication determines access rights", "Both only apply to on-premises systems"], answer: 1, explain: "Authentication (AuthN) verifies who you are; authorization (AuthZ) determines what you can do. AuthN happens first." },
  { cat: "arch", topic: "a_identity", q: "Which Microsoft Entra feature lets a user sign in once to access multiple applications?", options: ["Multi-Factor Authentication", "Single Sign-On (SSO)", "Conditional Access", "Resource locks"], answer: 1, explain: "Single Sign-On (SSO) allows one set of credentials to access many apps without repeated sign-ins." },
  { cat: "arch", topic: "a_identity", q: "A policy requires MFA when users sign in from an unfamiliar location. Which Entra feature enforces this?", options: ["Azure Policy", "Conditional Access", "RBAC", "Resource locks"], answer: 1, explain: "Conditional Access applies access decisions based on signals like location, device, user, and risk." },
  { cat: "arch", topic: "a_compute", q: "Which service should you use to create and manage a group of identical, autoscaling, load-balanced VMs?", options: ["Availability Sets", "Virtual Machine Scale Sets", "App Service", "AKS"], answer: 1, explain: "Virtual Machine Scale Sets create and manage groups of identical, load-balanced VMs that autoscale." },
  { cat: "arch", topic: "a_core", q: "Which statement best describes a resource group?", options: ["A billing boundary for an entire organization", "A logical container for related Azure resources", "A physical datacenter", "A network isolation boundary"], answer: 1, explain: "A resource group is a logical container holding related resources; a resource belongs to exactly one group." },
  { cat: "arch", topic: "a_identity", q: "Which on-premises identity solution uses Kerberos and LDAP and manages domain-joined devices?", options: ["Microsoft Entra ID", "Active Directory Domain Services (AD DS)", "Entra B2C", "Conditional Access"], answer: 1, explain: "AD DS is the on-premises directory using Kerberos/LDAP; Entra ID is the cloud identity service using modern protocols." },

  // Management & Governance
  { cat: "govern", topic: "g_cost", q: "Which tool estimates the cost of Azure services BEFORE you deploy them?", options: ["Cost Management", "TCO Calculator", "Pricing Calculator", "Azure Advisor"], answer: 2, explain: "The Pricing Calculator estimates the cost of configuring and deploying Azure products before deployment." },
  { cat: "govern", topic: "g_cost", q: "Which tool compares the cost of running workloads on-premises versus in Azure?", options: ["Pricing Calculator", "TCO Calculator", "Cost Management", "Azure Monitor"], answer: 1, explain: "The Total Cost of Ownership (TCO) Calculator estimates savings by comparing on-premises vs Azure costs." },
  { cat: "govern", topic: "g_gov", q: "Which service enforces organizational rules such as 'resources may only be deployed in specific regions'?", options: ["RBAC", "Azure Policy", "Resource locks", "Azure Advisor"], answer: 1, explain: "Azure Policy creates and enforces rules to keep resources compliant with standards like allowed regions or required tags." },
  { cat: "govern", topic: "g_gov", q: "You want to grant a user permission to manage only one resource group. Which feature should you use?", options: ["Azure Policy", "Role-Based Access Control (RBAC)", "Resource locks", "Tags"], answer: 1, explain: "RBAC assigns roles scoped to a resource, resource group, subscription, or management group following least privilege." },
  { cat: "govern", topic: "g_gov", q: "Which feature prevents a critical resource from being accidentally deleted?", options: ["Tags", "Resource lock (CanNotDelete)", "Azure Policy", "RBAC"], answer: 1, explain: "A CanNotDelete resource lock allows reading/modifying but blocks deletion of the resource." },
  { cat: "govern", topic: "g_monitor", q: "Which free Azure service provides personalized recommendations across cost, security, reliability, performance, and operational excellence?", options: ["Azure Monitor", "Azure Advisor", "Service Health", "Azure Policy"], answer: 1, explain: "Azure Advisor analyzes your usage and gives best-practice recommendations across five categories." },
  { cat: "govern", topic: "g_monitor", q: "Where do you go to see whether an Azure region you use is currently experiencing an outage?", options: ["Azure Advisor", "Azure Service Health", "Cost Management", "Log Analytics"], answer: 1, explain: "Azure Service Health gives a personalized view of outages, planned maintenance, and advisories for the services/regions you use." },
  { cat: "govern", topic: "g_monitor", q: "Which tool within Azure Monitor lets you write and run KQL queries against collected log data?", options: ["Application Insights", "Log Analytics", "Service Health", "Azure Advisor"], answer: 1, explain: "Log Analytics is the Azure Monitor tool for editing and running KQL log queries." },
  { cat: "govern", topic: "g_monitor", q: "A developer wants to monitor the performance and availability of a live web application. Which tool fits best?", options: ["Application Insights", "Azure Policy", "Cost Management", "Resource locks"], answer: 0, explain: "Application Insights (part of Azure Monitor) monitors live application performance, availability, and usage." },
  { cat: "govern", topic: "g_cost", q: "Which name/value metadata helps organize resources and group costs (e.g., Environment=Production)?", options: ["Resource locks", "Tags", "Policies", "Roles"], answer: 1, explain: "Tags are name/value pairs that organize resources and enable cost grouping and reporting." },
  { cat: "govern", topic: "g_tools", q: "Which browser-based tool lets you run Bash or PowerShell commands to manage Azure without local installation?", options: ["Azure CLI installed locally", "Azure Cloud Shell", "Azure PowerShell module", "ARM templates"], answer: 1, explain: "Azure Cloud Shell is a browser-based shell (Bash or PowerShell) requiring no local install." },
  { cat: "govern", topic: "g_tools", q: "Which language simplifies authoring infrastructure as code for Azure and compiles to ARM JSON?", options: ["YAML", "Bicep", "Terraform", "JSON Schema"], answer: 1, explain: "Bicep is a domain-specific language with cleaner syntax that compiles down to ARM templates." },
  { cat: "govern", topic: "g_gov", q: "Where can you find Microsoft's compliance certifications and audit reports?", options: ["Azure Advisor", "Service Trust Portal", "Cost Management", "Azure Monitor"], answer: 1, explain: "The Service Trust Portal publishes Microsoft's security, privacy, and compliance reports and certifications." },
  { cat: "govern", topic: "g_cost", q: "Which factor does NOT directly affect the cost of an Azure resource?", options: ["Region/location", "Outbound (egress) data transfer", "The color theme of the Azure portal", "Resource type and size"], answer: 2, explain: "Portal theme has no cost impact. Region, data egress, resource type/size, and subscription type all affect cost." },
  { cat: "govern", topic: "g_gov", q: "What does an SLA (Service Level Agreement) represent in Azure?", options: ["A discount program for reserved instances", "Microsoft's formal commitment to uptime/performance for a service", "A list of allowed regions", "A backup retention policy"], answer: 1, explain: "An SLA is Microsoft's formal commitment to a service's uptime/performance. Free/preview tiers typically have no SLA." },
];

/* ---------------------------------------------------------------------
   TERM / DEFINITION PAIRS — for memory & matching games
   --------------------------------------------------------------------- */
const PAIRS = [
  { term: "IaaS", def: "Provider manages physical infra; you manage OS & apps", cat: "cloud" },
  { term: "PaaS", def: "Provider manages OS & runtime; you manage apps & data", cat: "cloud" },
  { term: "SaaS", def: "Provider manages everything; you just use the software", cat: "cloud" },
  { term: "Hybrid cloud", def: "Mix of public and private cloud", cat: "cloud" },
  { term: "CapEx", def: "Large upfront spend on physical assets", cat: "cloud" },
  { term: "OpEx", def: "Ongoing pay-as-you-go spending", cat: "cloud" },
  { term: "Vertical scaling", def: "Add power (CPU/RAM) to an existing resource", cat: "cloud" },
  { term: "Horizontal scaling", def: "Add or remove resource instances", cat: "cloud" },
  { term: "Availability Zone", def: "Physically separate datacenter within a region", cat: "arch" },
  { term: "Region pair", def: "Two regions 300+ miles apart for disaster recovery", cat: "arch" },
  { term: "Resource group", def: "Logical container for related resources", cat: "arch" },
  { term: "Management group", def: "Container above subscriptions for governance", cat: "arch" },
  { term: "ARM", def: "Azure's deployment & management layer", cat: "arch" },
  { term: "Azure Functions", def: "Serverless, event-driven, pay-per-execution compute", cat: "arch" },
  { term: "AKS", def: "Managed Kubernetes container orchestration", cat: "arch" },
  { term: "ExpressRoute", def: "Private dedicated link to Azure, not over internet", cat: "arch" },
  { term: "Blob storage", def: "Object storage for unstructured data", cat: "arch" },
  { term: "LRS", def: "3 copies in one datacenter (lowest cost)", cat: "arch" },
  { term: "GRS", def: "Replicates data to a secondary region", cat: "arch" },
  { term: "Entra ID", def: "Cloud identity & access management service", cat: "arch" },
  { term: "MFA", def: "Requires two or more verification factors", cat: "arch" },
  { term: "SSO", def: "Sign in once to access many apps", cat: "arch" },
  { term: "Azure Policy", def: "Enforces compliance rules on resources", cat: "govern" },
  { term: "RBAC", def: "Grants scoped permissions via roles", cat: "govern" },
  { term: "Resource lock", def: "Prevents accidental delete/modify", cat: "govern" },
  { term: "Tags", def: "Name/value metadata for organizing & costing", cat: "govern" },
  { term: "Azure Advisor", def: "Personalized best-practice recommendations", cat: "govern" },
  { term: "Service Health", def: "Status of Azure services & regions you use", cat: "govern" },
  { term: "Log Analytics", def: "Run KQL queries against log data", cat: "govern" },
  { term: "Application Insights", def: "Monitors live web app performance", cat: "govern" },
  { term: "Pricing Calculator", def: "Estimate Azure cost before deploying", cat: "govern" },
  { term: "TCO Calculator", def: "Compare on-prem vs Azure cost", cat: "govern" },
];

/* expose globally */
window.AZ = { CATEGORIES, TOPICS, FLASHCARDS, QUESTIONS, PAIRS };
