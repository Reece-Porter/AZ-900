/* =====================================================================
   SC-200 Study Hub — shared data
   Microsoft Security Operations Analyst.
   Categories map to the three product domains the exam is built around.
   ===================================================================== */

window.COURSE = "sc200";

const CATEGORIES = {
  xdr:      { name: "Microsoft Defender XDR",       weight: "~35–40%", color: "#3a8dff" },
  cloud:    { name: "Microsoft Defender for Cloud", weight: "~15–20%", color: "#36d399" },
  sentinel: { name: "Microsoft Sentinel",           weight: "~40–45%", color: "#7c5cff" },
};

/* ---------------------------------------------------------------------
   TOPICS — finer-grained subjects within each domain.
   --------------------------------------------------------------------- */
const TOPICS = {
  // Defender XDR
  x_endpoint:  { name: "Defender for Endpoint",         cat: "xdr" },
  x_office:    { name: "Defender for Office 365",        cat: "xdr" },
  x_identity:  { name: "Defender for Identity",          cat: "xdr" },
  x_mda:       { name: "Defender for Cloud Apps",        cat: "xdr" },
  x_incidents: { name: "XDR Incidents & Response",       cat: "xdr" },
  x_hunting:   { name: "Advanced Hunting",               cat: "xdr" },

  // Defender for Cloud
  c_cspm:      { name: "CSPM & Secure Score",            cat: "cloud" },
  c_plans:     { name: "Workload Protection Plans",      cat: "cloud" },
  c_compliance:{ name: "Regulatory Compliance",          cat: "cloud" },

  // Sentinel
  s_workspace: { name: "Workspace & Roles",              cat: "sentinel" },
  s_connectors:{ name: "Data Connectors & Ingestion",    cat: "sentinel" },
  s_analytics: { name: "Analytics Rules",                cat: "sentinel" },
  s_soar:      { name: "Automation (SOAR)",              cat: "sentinel" },
  s_hunting:   { name: "Hunting, Workbooks & UEBA",      cat: "sentinel" },
  s_ti:        { name: "Threat Intelligence",            cat: "sentinel" },
  s_incidents: { name: "Incident Management",            cat: "sentinel" },
  s_kql:       { name: "KQL",                            cat: "sentinel" },
};

/* ---------------------------------------------------------------------
   FLASHCARDS  — { q, a, cat }
   --------------------------------------------------------------------- */
const FLASHCARDS = [
  // ---- Defender XDR ----
  { cat: "xdr", q: "What is Microsoft Defender XDR?", a: "A unified, cross-product security suite (formerly Microsoft 365 Defender) that correlates signals across endpoints, identities, email, and apps into incidents. Managed from the Microsoft Defender portal (security.microsoft.com)." },
  { cat: "xdr", q: "Which workloads make up Microsoft Defender XDR?", a: "Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps, Microsoft Entra ID Protection, and Defender Vulnerability Management (plus Defender for IoT)." },
  { cat: "xdr", q: "What is the difference between an alert and an incident?", a: "An alert is a single detection/signal. An incident is a collection of correlated alerts and evidence that tell the story of an attack across products." },
  { cat: "xdr", q: "What portal is used to manage Microsoft Defender XDR?", a: "The Microsoft Defender portal at security.microsoft.com." },
  { cat: "xdr", q: "What is Microsoft Defender for Endpoint (MDE)?", a: "An endpoint detection and response (EDR) platform providing next-gen antivirus, attack surface reduction, vulnerability management, automated investigation, and response actions on devices." },
  { cat: "xdr", q: "Name common response actions you can take on a device in MDE.", a: "Isolate device, restrict app execution, run antivirus scan, collect investigation package, initiate live response, and (for files) stop and quarantine." },
  { cat: "xdr", q: "What are Attack Surface Reduction (ASR) rules?", a: "MDE rules that reduce the attack surface by blocking risky behaviors (e.g., Office child processes, credential theft from LSASS, executable content from email). Can run in Audit or Block mode." },
  { cat: "xdr", q: "What are custom indicators (IoCs) in Defender for Endpoint?", a: "Indicators you define to allow or block file hashes, IP addresses, URLs/domains, and certificates across your devices." },
  { cat: "xdr", q: "How can devices be onboarded to Defender for Endpoint?", a: "Via local script, Group Policy, Microsoft Intune, Configuration Manager, or VDI scripts. Onboarding uses a configuration package/blob." },
  { cat: "xdr", q: "What is Defender Vulnerability Management (TVM)?", a: "Discovers, assesses, and prioritizes device weaknesses and misconfigurations with risk-based context and remediation recommendations." },
  { cat: "xdr", q: "What is Microsoft Defender for Office 365?", a: "Protects email and collaboration (Teams, SharePoint, OneDrive) from phishing, malware, and business email compromise using Safe Attachments, Safe Links, anti-phishing, and ZAP." },
  { cat: "xdr", q: "What are Safe Attachments and Safe Links?", a: "Safe Attachments detonates attachments in a sandbox before delivery; Safe Links rewrites and time-of-click scans URLs in email and Office docs." },
  { cat: "xdr", q: "What is Zero-hour Auto Purge (ZAP)?", a: "A Defender for Office 365 feature that retroactively removes malicious or phishing messages already delivered to mailboxes once new intelligence identifies them." },
  { cat: "xdr", q: "What is the Tenant Allow/Block List?", a: "A place in the Defender portal to manually allow or block senders, domains, URLs, files, and spoofed identities for your tenant." },
  { cat: "xdr", q: "What are preset security policies in Defender for Office 365?", a: "Microsoft-recommended baseline protection (Standard and Strict) that automatically apply anti-malware, anti-phishing, Safe Links, and Safe Attachments settings." },
  { cat: "xdr", q: "What is Microsoft Defender for Identity (MDI)?", a: "Monitors on-premises Active Directory (via sensors on domain controllers/AD FS/AD CS) to detect identity-based threats like reconnaissance, lateral movement, and domain dominance." },
  { cat: "xdr", q: "Give examples of attacks Defender for Identity detects.", a: "Pass-the-Hash, Pass-the-Ticket, Golden Ticket, DCSync, reconnaissance (LDAP/DNS), brute force, and other lateral-movement and domain-dominance techniques." },
  { cat: "xdr", q: "Where is the Defender for Identity sensor installed?", a: "Directly on domain controllers, AD FS, and AD CS servers (or as a standalone sensor). It monitors traffic and events locally." },
  { cat: "xdr", q: "What is Microsoft Defender for Cloud Apps (MDA)?", a: "A Cloud Access Security Broker (CASB) that provides cloud discovery (shadow IT), app connectors, session/access control, and policies to protect SaaS apps." },
  { cat: "xdr", q: "What is Conditional Access App Control in Defender for Cloud Apps?", a: "A reverse-proxy capability (integrated with Entra Conditional Access) that enforces real-time session policies — e.g., block downloads, require read-only access, monitor risky sessions." },
  { cat: "xdr", q: "What is Cloud Discovery in Defender for Cloud Apps?", a: "Analysis of traffic logs (from firewalls/proxies or MDE) to identify Shadow IT — apps in use, their risk score, and usage." },
  { cat: "xdr", q: "What is Microsoft Entra ID Protection?", a: "Detects identity risks (risky sign-ins and risky users) and can drive risk-based Conditional Access policies to require MFA or block access." },
  { cat: "xdr", q: "What is Automated Investigation and Response (AIR)?", a: "Automation in Defender XDR that investigates alerts, determines verdicts, and can take or recommend remediation actions to reduce analyst workload." },
  { cat: "xdr", q: "What is advanced hunting in Defender XDR?", a: "A query-based (KQL) threat-hunting tool over a unified schema of raw data (e.g., DeviceEvents, EmailEvents, IdentityLogonEvents, CloudAppEvents, AlertInfo/AlertEvidence)." },
  { cat: "xdr", q: "What is a custom detection rule in Defender XDR?", a: "A saved advanced-hunting (KQL) query set to run on a schedule that generates alerts and can trigger automated response actions." },
  { cat: "xdr", q: "Name key advanced hunting tables in Defender XDR.", a: "DeviceEvents, DeviceProcessEvents, DeviceNetworkEvents, EmailEvents, EmailAttachmentInfo, IdentityLogonEvents, IdentityInfo, CloudAppEvents, AlertInfo, and AlertEvidence." },

  // ---- Defender for Cloud ----
  { cat: "cloud", q: "What is Microsoft Defender for Cloud?", a: "A Cloud-Native Application Protection Platform (CNAPP) that provides Cloud Security Posture Management (CSPM) and workload protection (CWPP) for Azure, on-premises, AWS, and GCP." },
  { cat: "cloud", q: "What is CSPM (Cloud Security Posture Management)?", a: "Continuous assessment of resource configurations against security best practices, producing recommendations and a Secure Score. Foundational CSPM is free." },
  { cat: "cloud", q: "What is Secure Score in Defender for Cloud?", a: "A percentage that measures your security posture based on how many recommendations you've remediated; higher is better." },
  { cat: "cloud", q: "What is the Microsoft Cloud Security Benchmark (MCSB)?", a: "The default policy initiative in Defender for Cloud that drives recommendations and Secure Score, based on industry best practices." },
  { cat: "cloud", q: "What are Defender plans (CWPP) in Defender for Cloud?", a: "Paid workload-protection plans that add threat detection/alerts for specific resource types — e.g., Defender for Servers, Storage, SQL, Containers, App Service, Key Vault, Resource Manager, DNS, and APIs." },
  { cat: "cloud", q: "What does Defender for Servers provide?", a: "Threat protection for VMs/servers, including integration with Defender for Endpoint, just-in-time (JIT) VM access, file integrity monitoring (FIM), and vulnerability assessment." },
  { cat: "cloud", q: "What is Just-in-Time (JIT) VM access?", a: "A Defender for Servers feature that keeps management ports (RDP/SSH) closed and opens them only on approved request for a limited time, reducing brute-force exposure." },
  { cat: "cloud", q: "What is File Integrity Monitoring (FIM)?", a: "Monitors critical files, registry keys, and OS files for changes that may indicate an attack." },
  { cat: "cloud", q: "How does Defender for Cloud support multicloud?", a: "You can connect AWS and GCP accounts (via a native connector) to extend CSPM recommendations and Defender workload protection to those clouds." },
  { cat: "cloud", q: "What is the Regulatory Compliance dashboard?", a: "Maps your environment against standards (e.g., ISO 27001, PCI-DSS, NIST, CIS) and shows compliance status for controls; requires an enabled Defender plan for full standards." },
  { cat: "cloud", q: "How do you get Defender for Cloud alerts into Microsoft Sentinel?", a: "Use the Microsoft Defender for Cloud data connector (or the Defender XDR connector) in Sentinel, and optionally continuous export / workflow automation." },
  { cat: "cloud", q: "What is workflow automation in Defender for Cloud?", a: "Triggering Logic Apps automatically in response to security alerts or recommendations (e.g., send a notification, open a ticket, remediate)." },

  // ---- Microsoft Sentinel ----
  { cat: "sentinel", q: "What is Microsoft Sentinel?", a: "A cloud-native SIEM and SOAR solution built on a Log Analytics workspace, providing data collection, detection, investigation, hunting, and automated response at cloud scale." },
  { cat: "sentinel", q: "What does Microsoft Sentinel run on top of?", a: "A Log Analytics workspace (Azure Monitor). Sentinel is enabled on a workspace and uses KQL for queries." },
  { cat: "sentinel", q: "What is SIEM vs SOAR?", a: "SIEM = Security Information and Event Management (collect, detect, analyze). SOAR = Security Orchestration, Automation, and Response (automate reactions). Sentinel provides both." },
  { cat: "sentinel", q: "What are data connectors in Microsoft Sentinel?", a: "Integrations that ingest data from sources — Microsoft services (often free), CEF/Syslog via the Azure Monitor Agent, REST APIs, and codeless connectors. Many come as solutions from the Content hub." },
  { cat: "sentinel", q: "What are the analytics rule types in Sentinel?", a: "Scheduled (KQL), Near-real-time (NRT), Microsoft Security (create incidents from Microsoft Defender alerts), Fusion (ML multistage attack detection), Anomaly, and Threat Intelligence." },
  { cat: "sentinel", q: "What is a Fusion rule?", a: "A built-in machine-learning analytics rule that correlates low-fidelity signals across products to detect multistage attacks and generate high-fidelity incidents." },
  { cat: "sentinel", q: "What is a Near-Real-Time (NRT) analytics rule?", a: "An analytics rule that runs about once per minute to detect threats as quickly as possible (single query, no lookback join)." },
  { cat: "sentinel", q: "What is an automation rule in Microsoft Sentinel?", a: "A rule that centrally manages incident handling — it can run playbooks, change status/severity, assign owners, add tags, and suppress incidents, based on conditions." },
  { cat: "sentinel", q: "What is a playbook in Microsoft Sentinel?", a: "An automated response workflow built on Azure Logic Apps, triggered by alerts, incidents, or manually, to orchestrate actions (e.g., isolate a device, block a user, post to Teams)." },
  { cat: "sentinel", q: "How are playbooks triggered in Sentinel?", a: "Via automation rules, directly from analytics rules (alert trigger), the incident trigger, entity triggers, or run manually on an incident/entity." },
  { cat: "sentinel", q: "What is a watchlist in Microsoft Sentinel?", a: "An imported list of data (e.g., VIP users, allowed IPs, asset inventory) you can reference in analytics, hunting, and automation queries." },
  { cat: "sentinel", q: "What are hunting queries in Sentinel?", a: "Proactive KQL queries (many mapped to MITRE ATT&CK) used to search for threats that haven't triggered alerts. Results can be saved as bookmarks." },
  { cat: "sentinel", q: "What is a bookmark in Microsoft Sentinel?", a: "A saved hunting result you want to keep for investigation; bookmarks can be added to incidents." },
  { cat: "sentinel", q: "What is Livestream in Sentinel hunting?", a: "Runs a hunting query continuously to notify you in near real time when there are new matches." },
  { cat: "sentinel", q: "What are notebooks in Microsoft Sentinel?", a: "Jupyter notebooks for advanced, code-driven hunting and investigation (e.g., Python / MSTICPy) beyond standard KQL." },
  { cat: "sentinel", q: "What is UEBA in Microsoft Sentinel?", a: "User and Entity Behavior Analytics — builds behavioral baselines to detect anomalies (e.g., impossible travel, unusual activity), enriching entities via the BehaviorAnalytics table." },
  { cat: "sentinel", q: "What are workbooks in Microsoft Sentinel?", a: "Interactive visual dashboards (based on Azure Monitor workbooks) for monitoring and reporting on your data." },
  { cat: "sentinel", q: "How is threat intelligence used in Sentinel?", a: "TI indicators are ingested via the Threat Intelligence connectors (TAXII, or the Upload Indicators API / platforms connector) into the ThreatIntelligenceIndicator table and matched by analytics rules." },
  { cat: "sentinel", q: "Name key Microsoft Sentinel RBAC roles.", a: "Microsoft Sentinel Reader (view), Responder (view + manage incidents), Contributor (create/edit content), Playbook Operator (run playbooks), and Automation Contributor (let Sentinel run playbooks)." },
  { cat: "sentinel", q: "What is the Content hub in Microsoft Sentinel?", a: "A centralized marketplace of packaged solutions (connectors, analytics rules, workbooks, playbooks, hunting queries) you can install for specific products." },
  { cat: "sentinel", q: "What are entities in a Sentinel incident?", a: "Identified items such as accounts, hosts, IPs, URLs, and files, mapped from the data so they can be investigated (via the investigation graph) and correlated." },
  { cat: "sentinel", q: "What is the investigation graph in Sentinel?", a: "A visual, interactive map of an incident's entities and their relationships, used to explore the scope of an attack." },
  { cat: "sentinel", q: "What is a commitment tier (pricing) in Microsoft Sentinel?", a: "A billing option where you reserve a daily data volume (e.g., 100 GB/day) at a discount versus pay-as-you-go per-GB ingestion." },

  // ---- KQL ----
  { cat: "sentinel", q: "What is KQL?", a: "Kusto Query Language — the read-only query language used across Log Analytics, Microsoft Sentinel, and Defender XDR advanced hunting to search and analyze data." },
  { cat: "sentinel", q: "What does the KQL 'where' operator do?", a: "Filters rows by a condition (e.g., | where TimeGenerated > ago(1d) and DeviceName == \"PC1\")." },
  { cat: "sentinel", q: "What does 'summarize' do in KQL?", a: "Aggregates rows into groups and computes values (e.g., | summarize Count = count() by DeviceName). Often used with count(), dcount(), min(), max(), avg()." },
  { cat: "sentinel", q: "What does 'project' vs 'extend' do in KQL?", a: "project selects (and can rename) specific columns; extend adds a new calculated column while keeping existing ones." },
  { cat: "sentinel", q: "What do ago() and bin() do in KQL?", a: "ago(1d) returns a time relative to now (for filtering); bin(TimeGenerated, 1h) rounds timestamps into buckets (useful with summarize and render timechart)." },
  { cat: "sentinel", q: "What does 'join' vs 'union' do in KQL?", a: "join combines rows from two tables on a matching key; union returns rows from multiple tables together (stacked)." },
  { cat: "sentinel", q: "How do you limit KQL results or get the top rows?", a: "Use take/limit N for an arbitrary sample, or top N by Column to get the highest/lowest by a value; sort/order by orders results." },

  // ---- Deeper coverage ----
  { cat: "xdr", q: "What is tamper protection in Defender for Endpoint?", a: "Prevents attackers and malicious apps from disabling Microsoft Defender Antivirus or changing its security settings (real-time protection, cloud protection, etc.)." },
  { cat: "xdr", q: "What is EDR in block mode?", a: "Lets Defender for Endpoint remediate malicious artifacts detected post-breach even when a non-Microsoft antivirus is the primary product." },
  { cat: "xdr", q: "What does the device group automation level control?", a: "How Automated Investigation and Response (AIR) acts — e.g., 'Full' auto-remediates threats, while semi-automated levels require analyst approval." },
  { cat: "xdr", q: "What is Microsoft Secure Score (Defender portal)?", a: "A measurement of your Microsoft 365 security posture (identities, devices, apps, data) with prioritized improvement actions. Different from Defender for Cloud's Secure Score for cloud resources." },
  { cat: "xdr", q: "What is Threat analytics in Defender XDR?", a: "Threat-intelligence reports on active campaigns and actors, showing your exposure, impacted assets, and recommended mitigations." },
  { cat: "xdr", q: "What is the Action center in Defender XDR?", a: "The central place to review, approve, and track pending and completed remediation actions (automated and manual)." },
  { cat: "xdr", q: "What can a custom detection rule do when it triggers?", a: "Generate an alert AND take response actions such as isolate device, run AV scan, collect investigation package, or block/quarantine a file. It runs on a frequency from continuous up to every 24 hours." },
  { cat: "cloud", q: "What does the paid Defender CSPM plan add?", a: "Advanced posture features: attack path analysis, the cloud security explorer, agentless machine scanning, and more — beyond the free foundational CSPM." },
  { cat: "cloud", q: "What is an exemption in Defender for Cloud?", a: "Excludes a specific resource from a recommendation (with justification) so it doesn't affect Secure Score, without disabling the recommendation for everyone." },
  { cat: "cloud", q: "What are governance rules in Defender for Cloud?", a: "Assign owners and remediation due dates to recommendations to drive accountability." },
  { cat: "cloud", q: "What is continuous export in Defender for Cloud?", a: "Streams alerts, recommendations, and secure score continuously to a Log Analytics workspace or Event Hub for retention and integration (e.g., with Sentinel/SIEM)." },
  { cat: "cloud", q: "Defender for Servers Plan 1 vs Plan 2?", a: "Plan 1 focuses on Defender for Endpoint integration. Plan 2 adds FIM, JIT VM access, OS-level threat detection, regulatory standards, and a data-ingestion benefit." },
  { cat: "cloud", q: "Which agent does Defender for Cloud use to collect data now?", a: "The Azure Monitor Agent (AMA) on Azure and Azure Arc-enabled servers; the legacy Log Analytics (MMA) agent has been retired." },
  { cat: "sentinel", q: "Analytics vs Basic vs archive log plans?", a: "Analytics logs = full features (alerts, interactive retention). Basic logs = cheap for high-volume/low-value data with limited querying. Archive/long-term retention = cheap storage queried via search jobs/restore." },
  { cat: "sentinel", q: "What is a search job in Microsoft Sentinel?", a: "A way to run a KQL search over archived/long-term data that isn't in interactive retention, returning results to a new table." },
  { cat: "sentinel", q: "What are summary rules in Sentinel?", a: "Rules that periodically aggregate high-volume data into a summarized table to reduce cost and speed up detections/queries." },
  { cat: "sentinel", q: "What is the Codeless Connector Platform (CCP)?", a: "Lets you build custom Sentinel data connectors declaratively (no code to write or host)." },
  { cat: "sentinel", q: "What are Sentinel Repositories?", a: "Connect a GitHub or Azure DevOps repo to deploy Sentinel content (analytics rules, workbooks, etc.) as code via CI/CD." },
  { cat: "sentinel", q: "Event grouping vs alert grouping in an analytics rule?", a: "Event grouping decides whether all query results form one alert or one alert per result row. Alert grouping (incident settings) combines related alerts into a single incident." },
  { cat: "sentinel", q: "What are incident tasks in Sentinel?", a: "A standardized checklist of steps attached to an incident to guide and track analyst investigation and response." },
  { cat: "sentinel", q: "Upload Indicators API vs TAXII connector?", a: "Upload Indicators API (platforms) lets a TI platform PUSH STIX indicators into Sentinel; the TAXII connector PULLS indicators from a TAXII server." },
  { cat: "sentinel", q: "What is a playbook's managed identity used for?", a: "It lets the Logic App authenticate and act (read Sentinel, take Azure actions) with least-privilege RBAC roles instead of stored credentials." },
];

/* ---------------------------------------------------------------------
   TERM / DEFINITION PAIRS — for memory & matching games
   --------------------------------------------------------------------- */
const PAIRS = [
  { term: "Defender XDR", def: "Unified cross-product security suite", cat: "xdr" },
  { term: "MDE", def: "Defender for Endpoint (EDR)", cat: "xdr" },
  { term: "MDO", def: "Defender for Office 365 (email security)", cat: "xdr" },
  { term: "MDI", def: "Defender for Identity (on-prem AD)", cat: "xdr" },
  { term: "MDA / MCAS", def: "Defender for Cloud Apps (CASB)", cat: "xdr" },
  { term: "ASR rules", def: "Attack Surface Reduction behavior blocks", cat: "xdr" },
  { term: "Safe Attachments", def: "Detonate email attachments in a sandbox", cat: "xdr" },
  { term: "Safe Links", def: "Time-of-click URL scanning", cat: "xdr" },
  { term: "ZAP", def: "Zero-hour Auto Purge of delivered mail", cat: "xdr" },
  { term: "Incident", def: "Correlated group of related alerts", cat: "xdr" },
  { term: "Advanced hunting", def: "KQL queries over raw XDR data", cat: "xdr" },
  { term: "Custom indicator", def: "Allow/block a hash, IP, URL, or cert", cat: "xdr" },
  { term: "Entra ID Protection", def: "Detects risky users and sign-ins", cat: "xdr" },
  { term: "Defender for Cloud", def: "CNAPP: posture + workload protection", cat: "cloud" },
  { term: "CSPM", def: "Cloud Security Posture Management", cat: "cloud" },
  { term: "Secure Score", def: "Posture measurement in Defender for Cloud", cat: "cloud" },
  { term: "JIT VM access", def: "Open RDP/SSH ports only on request", cat: "cloud" },
  { term: "FIM", def: "File Integrity Monitoring", cat: "cloud" },
  { term: "Defender plan", def: "Paid workload protection (CWPP)", cat: "cloud" },
  { term: "MCSB", def: "Microsoft Cloud Security Benchmark", cat: "cloud" },
  { term: "Microsoft Sentinel", def: "Cloud-native SIEM + SOAR", cat: "sentinel" },
  { term: "Log Analytics workspace", def: "What Sentinel is built on", cat: "sentinel" },
  { term: "Data connector", def: "Ingests a data source into Sentinel", cat: "sentinel" },
  { term: "Analytics rule", def: "Detection logic that makes alerts/incidents", cat: "sentinel" },
  { term: "Fusion", def: "ML multistage attack detection", cat: "sentinel" },
  { term: "NRT rule", def: "Near-real-time detection (~1 min)", cat: "sentinel" },
  { term: "Playbook", def: "Logic Apps automated response", cat: "sentinel" },
  { term: "Automation rule", def: "Orchestrates incident handling", cat: "sentinel" },
  { term: "Watchlist", def: "Imported reference list for queries", cat: "sentinel" },
  { term: "UEBA", def: "User & Entity Behavior Analytics", cat: "sentinel" },
  { term: "Workbook", def: "Interactive visualization dashboard", cat: "sentinel" },
  { term: "KQL", def: "Kusto Query Language", cat: "sentinel" },
  { term: "Tamper protection", def: "Stops disabling of Defender AV settings", cat: "xdr" },
  { term: "EDR in block mode", def: "Remediate artifacts behind 3rd-party AV", cat: "xdr" },
  { term: "Threat analytics", def: "Reports on active campaigns & exposure", cat: "xdr" },
  { term: "Action center", def: "Track & approve remediation actions", cat: "xdr" },
  { term: "Microsoft Secure Score", def: "M365 posture score (Defender portal)", cat: "xdr" },
  { term: "Defender CSPM plan", def: "Attack paths & cloud security explorer", cat: "cloud" },
  { term: "Governance rules", def: "Owners + due dates for recommendations", cat: "cloud" },
  { term: "Continuous export", def: "Stream alerts to Log Analytics/Event Hub", cat: "cloud" },
  { term: "Basic logs", def: "Low-cost plan for high-volume data", cat: "sentinel" },
  { term: "Search job", def: "Query archived long-term data", cat: "sentinel" },
  { term: "Summary rules", def: "Aggregate high-volume data on a schedule", cat: "sentinel" },
  { term: "Incident tasks", def: "Analyst checklist on an incident", cat: "sentinel" },
  { term: "arg_max()", def: "Latest row per group in KQL", cat: "sentinel" },
  { term: "dcount()", def: "Distinct count in KQL", cat: "sentinel" },
  { term: "has vs contains", def: "Term match (fast) vs substring (slow)", cat: "sentinel" },
];

/* expose globally.
   The scenario question bank lives in js/questions.js (loaded first as
   window.AZ_QUESTIONS) and js/questions-formats.js. */
const QUESTIONS = [];
window.AZ = {
  CATEGORIES,
  TOPICS,
  FLASHCARDS,
  QUESTIONS: (typeof window !== "undefined" && window.AZ_QUESTIONS && window.AZ_QUESTIONS.length) ? window.AZ_QUESTIONS : QUESTIONS,
  PAIRS,
};
