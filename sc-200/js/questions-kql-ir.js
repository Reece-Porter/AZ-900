/* =====================================================================
   SC-200 Study Hub — KQL-interpretation & incident-response question bank
   Drills the two areas the real SC-200 tests most heavily but that were
   thin in the other files:

     1. KQL you must READ or COMPLETE — "what does this query return",
        "finish the query", "pick the correct operator/function". This is
        the single most common question shape on the live exam.
     2. Incident-response & case-management WORKFLOW — given an alert or
        incident, what is the correct next action (triage, assign, classify,
        suppress, automate, run a playbook, tune a rule).

   Loaded AFTER questions.js / questions-formats.js / questions-extra.js,
   appending to the shared AZ_QUESTIONS pool so mock tests pick them up.
   Formats: single { answer }, multi { answers[] }, yesno, sentence.
   ===================================================================== */
(function () {
  const extra = [

  /* ================================================================
     PART 1 — KQL INTERPRETATION (read the query)
     ================================================================ */

  { cat: "sentinel", topic: "s_kql", q: "What does this query return?\n\nSigninLogs\n| where ResultType != 0\n| summarize FailedCount = count() by UserPrincipalName\n| top 5 by FailedCount desc", options: ["The 5 users with the most failed sign-ins", "All failed sign-ins for 5 named users", "The 5 most recent sign-ins overall", "The 5 users with the most successful sign-ins"], answer: 0, explain: "ResultType != 0 keeps failures (0 = success). summarize counts them per user, and top 5 by FailedCount desc returns the five users with the highest failure counts." },

  { cat: "sentinel", topic: "s_kql", q: "In KQL, which line correctly keeps only the events from the last 24 hours?", options: ["| where TimeGenerated > ago(1d)", "| filter TimeGenerated = 24h", "| where TimeGenerated < now(24h)", "| take TimeGenerated > 1d"], answer: 0, explain: "ago(1d) returns the timestamp 24 hours before now; 'where TimeGenerated > ago(1d)' keeps rows newer than that. 'filter' and 'take' are not used this way, and there is no now(24h)." },

  { cat: "sentinel", topic: "s_kql", q: "Complete the query. A hunter wants the COUNT of distinct devices per alert severity:\n\nDeviceInfo\n| summarize _____ by Severity", options: ["dcount(DeviceId)", "count(DeviceId)", "distinct DeviceId", "make_set(Severity)"], answer: 0, explain: "dcount() returns the number of distinct values. count() counts all rows (including duplicates); 'distinct' is a separate operator, not an aggregation inside summarize." },

  { cat: "sentinel", topic: "s_kql", q: "What is the difference between these two lines?\n\nA)  | where Account has \"admin\"\nB)  | where Account contains \"admin\"", options: ["'has' matches a whole indexed term (faster); 'contains' matches any substring (slower)", "They are identical in every way", "'has' is case-sensitive; 'contains' is case-insensitive", "'contains' only works on numbers"], answer: 0, explain: "'has' matches full indexed terms and is far more efficient; 'contains' does a substring scan (so 'badminton' would match 'admin'). Prefer 'has' when matching whole words." },

  { cat: "sentinel", topic: "s_kql", q: "Which operator joins two tables so that you keep ONLY the rows from the left table that have NO match in the right table (e.g., devices with no corresponding alert)?", options: ["join kind=leftanti", "join kind=inner", "join kind=leftouter", "union"], answer: 0, explain: "leftanti returns left-table rows with no match on the right — ideal for 'find X that has no Y'. inner keeps matches, leftouter keeps all left rows plus matches, union stacks tables." },

  { cat: "sentinel", topic: "s_kql", q: "What does this query produce?\n\nSecurityEvent\n| where EventID == 4625\n| summarize Attempts = count() by bin(TimeGenerated, 1h), Account\n| where Attempts > 10", options: ["Per-hour buckets where an account had more than 10 failed logons (4625)", "The 10 accounts with the most logons", "All successful logons grouped by day", "A single count of every 4625 event"], answer: 0, explain: "EventID 4625 = failed logon. bin(TimeGenerated, 1h) groups into hourly buckets per account, then 'where Attempts > 10' keeps the noisy hours — a classic brute-force pattern." },

  { cat: "sentinel", topic: "s_kql", q: "Finish the line so it returns the single MOST RECENT row per device with all its columns:\n\nDeviceEvents\n| summarize _____ by DeviceId", options: ["arg_max(Timestamp, *)", "max(Timestamp)", "top 1 by Timestamp", "last(Timestamp)"], answer: 0, explain: "arg_max(Timestamp, *) returns the entire row (all columns via *) that has the maximum Timestamp per group. max() would return only the timestamp value, not the whole row." },

  { cat: "sentinel", topic: "s_kql", q: "A query uses 'project'. What does 'project' do?", options: ["Selects (and optionally renames/computes) specific columns to keep", "Filters rows by a condition", "Sorts the result set", "Groups rows and aggregates them"], answer: 0, explain: "project chooses which columns appear (and can rename or create computed columns). 'where' filters rows, 'sort'/'order' sorts, and 'summarize' aggregates." },

  { cat: "sentinel", topic: "s_kql", q: "Which line correctly extends the result with a new calculated column?", options: ["| extend DurationMin = Duration / 60", "| project DurationMin == Duration / 60", "| summarize DurationMin = Duration / 60", "| where DurationMin = Duration / 60"], answer: 0, explain: "extend adds a computed column while keeping existing ones. project would REPLACE the column list, summarize needs an aggregation, and where filters (and uses == for comparison)." },

  { cat: "sentinel", topic: "s_kql", q: "What does the '| take 10' (or '| limit 10') operator do?", options: ["Returns an arbitrary sample of up to 10 rows (order not guaranteed)", "Returns the 10 newest rows", "Returns the top 10 rows sorted descending", "Deletes 10 rows from the table"], answer: 0, explain: "take/limit returns up to N rows with NO guaranteed order — useful for a quick peek. For ordered results use 'top N by <column>' or 'sort by ... | take N'." },

  { cat: "sentinel", topic: "s_kql", q: "You need to search EVERY table in the workspace for the string 'mimikatz'. Which is correct?", options: ["search \"mimikatz\"", "find \"mimikatz\"", "where * == \"mimikatz\"", "union * | contains \"mimikatz\""], answer: 0, explain: "The 'search' operator does a free-text search across columns/tables (search \"mimikatz\"). It's convenient for hunting but heavier than a targeted table query." },

  { cat: "sentinel", topic: "s_kql", q: "In advanced hunting, which query correctly finds processes launched by PowerShell?", options: ["DeviceProcessEvents | where InitiatingProcessFileName =~ \"powershell.exe\"", "DeviceProcessEvents | where FileName = powershell", "DeviceProcessEvents | summarize powershell.exe", "DeviceProcessEvents | project powershell.exe"], answer: 0, explain: "InitiatingProcessFileName is the parent/launcher; =~ is a case-insensitive equality match. This finds child processes spawned by powershell.exe." },

  { cat: "sentinel", topic: "s_kql", q: "What does '=~' mean in KQL (e.g., Account =~ \"Admin\")?", options: ["Case-insensitive string equality", "Regular-expression match", "Not equal", "Approximate numeric match"], answer: 0, explain: "=~ compares strings ignoring case, so \"Admin\" =~ \"admin\" is true. Use 'matches regex' for regular expressions and '!=' / '!~' for not-equal." },

  { cat: "sentinel", topic: "s_kql", q: "Which pair correctly orders these operators for 'filter first, then aggregate, then sort'?", options: ["where → summarize → sort by", "summarize → where → project", "sort by → where → summarize", "project → sort by → where"], answer: 0, explain: "Filter early with 'where' (cheapest, reduces data), then 'summarize' to aggregate, then 'sort by' to order the results. Filtering before aggregating is a key performance habit." },

  { cat: "sentinel", topic: "s_kql", q: "What does this return?\n\nlet suspiciousIPs = dynamic([\"10.0.0.5\",\"10.0.0.9\"]);\nSigninLogs\n| where IPAddress in (suspiciousIPs)", options: ["Sign-ins from either of the two listed IP addresses", "Sign-ins from any IP except the two listed", "A syntax error, because 'let' cannot hold a list", "All sign-ins, ignoring the IP filter"], answer: 0, explain: "'let' defines a reusable variable (here a dynamic array), and 'in (...)' keeps rows whose IPAddress matches any value in that list. Use '!in' to exclude." },

  { cat: "sentinel", topic: "s_kql", q: "Which function converts a string column into a datetime so you can compare it with ago()?", options: ["todatetime(Column)", "datetime_add(Column)", "format_datetime(Column)", "bin(Column)"], answer: 0, explain: "todatetime() casts a value to the datetime type. format_datetime() turns a datetime into a string (the opposite), and bin() rounds a value into buckets." },

  { cat: "sentinel", topic: "s_kql", q: "A hunter writes:\n\nDeviceNetworkEvents\n| where RemoteUrl endswith \".ru\"\n| distinct DeviceName, RemoteUrl\n\nWhat does 'distinct' do here?", options: ["Returns unique DeviceName + RemoteUrl combinations", "Counts the rows", "Sorts the rows alphabetically", "Keeps only the first row"], answer: 0, explain: "distinct returns unique combinations of the listed columns, removing duplicates. It's like summarize by those columns but without an aggregation." },

  /* ---------- KQL — multiple response ---------- */

  { type: "multi", cat: "sentinel", topic: "s_kql", q: "Which TWO operators reduce the number of ROWS returned (as opposed to columns)? (Choose two.)", options: ["where", "take", "project", "extend"], answers: [0, 1], explain: "'where' filters rows by a predicate and 'take' caps the row count. 'project' and 'extend' change columns, not the number of rows." },

  { type: "multi", cat: "xdr", topic: "x_hunting", q: "Which TWO tables in Microsoft Defender advanced hunting would you use to investigate suspicious process execution and its network activity? (Choose two.)", options: ["DeviceProcessEvents", "DeviceNetworkEvents", "EmailEvents", "IdentityInfo"], answers: [0, 1], explain: "DeviceProcessEvents holds process creations and DeviceNetworkEvents holds network connections — join them by DeviceId/Timestamp to link a process to its traffic." },

  { type: "multi", cat: "sentinel", topic: "s_kql", q: "Which TWO are valid ways to aggregate values into a collection inside summarize? (Choose two.)", options: ["make_set(Column)", "make_list(Column)", "collect(Column)", "group(Column)"], answers: [0, 1], explain: "make_set() returns distinct values as an array; make_list() returns all values (with duplicates) as an array. 'collect' and 'group' are not KQL aggregation functions." },

  /* ---------- KQL — complete the sentence ---------- */

  { type: "sentence", cat: "sentinel", topic: "s_kql", segments: ["To group events into 5-minute time buckets you use ", { options: ["bin(TimeGenerated, 5m)", "floor(TimeGenerated, 5m)"], answer: 0 }, ", and to count rows in each bucket you use ", { options: ["count()", "sum()"], answer: 0 }, "."], explain: "bin() rounds timestamps down into fixed buckets (5m). count() tallies rows per group; sum() would add a numeric column's values." },

  { type: "sentence", cat: "sentinel", topic: "s_kql", segments: ["To combine two tables and keep every row from both, use ", { options: ["union", "join kind=inner"], answer: 0 }, "; to match rows that share a key and keep only matches, use ", { options: ["union", "join kind=inner"], answer: 1 }, "."], explain: "union stacks tables (all rows from each). join kind=inner keeps only rows whose key matches in both tables." },

  { type: "sentence", cat: "sentinel", topic: "s_kql", segments: ["To keep rows where DeviceName starts with 'FIN' use ", { options: ["startswith", "endswith"], answer: 0 }, ", and to keep rows where it ends with '-PC' use ", { options: ["startswith", "endswith"], answer: 1 }, "."], explain: "startswith matches a prefix; endswith matches a suffix. Both are case-insensitive by default (use the _cs variants for case-sensitive)." },

  { type: "sentence", cat: "sentinel", topic: "s_analytics", segments: ["A scheduled analytics rule that maps the Account and IP columns to entities does so through ", { options: ["entity mapping", "column projection"], answer: 0 }, ", which lets Sentinel build the ", { options: ["investigation graph", "workbook"], answer: 0 }, " for the resulting incident."], explain: "Entity mapping tells Sentinel which query columns represent accounts, hosts, IPs, etc., powering the investigation graph and entity pages on the incident." },

  /* ---------- KQL — yes/no ---------- */

  { type: "yesno", cat: "sentinel", topic: "s_kql", q: "A scheduled analytics rule must alert whenever ANY row is returned by its KQL query. Proposed solution: set the alert threshold to 'is greater than 0'. Does this meet the goal?", options: ["Yes", "No"], answer: 0, explain: "Yes. The rule's threshold 'Generate alert when number of query results is greater than 0' fires whenever the query returns at least one row." },

  { type: "yesno", cat: "sentinel", topic: "s_kql", q: "You need the newest record per user with every column preserved. Proposed solution: use 'summarize max(TimeGenerated) by UserPrincipalName'. Does this meet the goal?", options: ["Yes", "No"], answer: 1, explain: "No. max(TimeGenerated) returns only the timestamp, dropping the other columns. Use arg_max(TimeGenerated, *) to keep the whole latest row." },

  { type: "yesno", cat: "xdr", topic: "x_hunting", q: "You want to turn a valuable advanced-hunting query into an automatic detection that raises alerts in Defender XDR. Proposed solution: save it as a custom detection rule. Does this meet the goal?", options: ["Yes", "No"], answer: 0, explain: "Yes. In Defender advanced hunting you can 'Create detection rule' from a query so it runs on a schedule and generates alerts/incidents with response actions." },

  /* ================================================================
     PART 2 — INCIDENT RESPONSE & CASE MANAGEMENT (workflow)
     ================================================================ */

  { cat: "sentinel", topic: "s_incidents", q: "A Sentinel incident has just been triaged and assigned. To reflect that an analyst is actively working it, what should the analyst set the incident STATUS to?", options: ["Active", "New", "Closed", "Resolved"], answer: 0, explain: "Sentinel incident status flows New → Active → Closed. Moving it to Active signals work is in progress; closing requires a classification." },

  { cat: "sentinel", topic: "s_incidents", q: "When CLOSING a Microsoft Sentinel incident, which is a valid classification (reason) you must select?", options: ["True positive – suspicious activity", "Escalated", "Snoozed", "Suppressed"], answer: 0, explain: "Closing an incident requires a classification: True positive, Benign positive, False positive, or Undetermined. This feeds tuning and metrics." },

  { cat: "sentinel", topic: "s_incidents", q: "Two Sentinel incidents clearly describe the same attack on the same host. What is the correct case-management action?", options: ["Merge the incidents so alerts and evidence are combined", "Delete one incident", "Close both as false positive", "Create a third incident manually"], answer: 0, explain: "Merging combines related incidents into one, consolidating alerts, entities, comments, and bookmarks so the case is investigated as a single unit." },

  { cat: "sentinel", topic: "s_soar", q: "A repetitive rule keeps generating incidents that should always be assigned to the same team and tagged, with no analyst effort. What should you create?", options: ["An automation rule", "A hunting query", "A watchlist", "A workbook"], answer: 0, explain: "Automation rules run at incident creation (or update) to assign owners, add tags, change status/severity, or trigger playbooks — automating triage without code." },

  { cat: "sentinel", topic: "s_soar", q: "You need an incident-triggered workflow that calls an external system to block an IP on the firewall and post to Teams. What should you build, and how is it invoked?", options: ["A playbook (Logic App), invoked by an automation rule or manually from the incident", "A KQL function invoked by 'invoke'", "A workbook invoked on a schedule", "A watchlist invoked by a connector"], answer: 0, explain: "Playbooks are Azure Logic Apps. They run multi-step actions (firewall block, Teams/email, ticketing) and are triggered by automation rules or run manually on an incident/alert." },

  { cat: "sentinel", topic: "s_analytics", q: "A scheduled analytics rule is generating too many near-identical incidents for the same benign activity. Which built-in feature reduces the noise without disabling detection?", options: ["Enable alert grouping (group related alerts into a single incident)", "Delete the analytics rule", "Lower the workspace retention", "Turn off the data connector"], answer: 0, explain: "In the analytics rule's Incident settings, alert grouping consolidates alerts (e.g., within a time window, by entity) into one incident — cutting duplicate incidents while keeping the detection." },

  { cat: "xdr", topic: "x_incidents", q: "In Microsoft Defender XDR, an incident is confirmed to be a real attack. To record the verdict for reporting and to improve future automation, what should the analyst set?", options: ["Classify the incident as True positive and set the determination", "Assign it to Microsoft support", "Delete the underlying alerts", "Suppress the device group"], answer: 0, explain: "Classifying the incident (True/False/Informational) and choosing a determination (e.g., malware, phishing) records the verdict and feeds Defender's automation and analytics." },

  { cat: "xdr", topic: "x_incidents", q: "An alert in Defender XDR is a confirmed false positive that recurs from a known-good internal tool. What is the best way to stop it recurring?", options: ["Create a suppression rule (tune the alert)", "Isolate every device", "Delete the incident", "Disable Defender for Endpoint"], answer: 0, explain: "A suppression rule tunes future instances of that alert (globally or for a device scope) so the known-good behavior stops generating alerts, without weakening other detections." },

  { cat: "sentinel", topic: "s_incidents", q: "During triage, which single Sentinel view lets an analyst see all related alerts, entities, and a timeline for an incident to understand its full scope?", options: ["The incident's investigation graph", "A workbook", "The data connectors page", "The pricing tier page"], answer: 0, explain: "The investigation graph visually maps the incident's entities (accounts, hosts, IPs) and their relationships, letting analysts expand nodes to explore scope quickly." },

  { cat: "sentinel", topic: "s_incidents", q: "A SOC lead needs to know which analyst owns a given incident and its current progress. Which incident properties support this case management?", options: ["Owner (assignment) and Status", "Severity and Tactics only", "Workspace name and Region", "Data connector and Table name"], answer: 0, explain: "Assigning an Owner and tracking Status (New/Active/Closed) are the core case-management fields; tags and comments add context for handoffs." },

  { cat: "sentinel", topic: "s_soar", q: "You want a playbook to run AUTOMATICALLY the moment any high-severity incident is created, with no analyst click. How do you wire it up?", options: ["Create an automation rule with a condition on severity that runs the playbook", "Add the playbook to a workbook", "Schedule the playbook with a cron connector", "Add the playbook to a watchlist"], answer: 0, explain: "An automation rule with a trigger of 'When incident is created' and a condition (Severity = High) runs the playbook automatically. Automation rules are the standard way to auto-invoke playbooks." },

  { cat: "xdr", topic: "x_incidents", q: "Automated investigation and response (AIR) in Defender XDR has produced remediation actions that are pending approval. Where does an analyst review and approve them?", options: ["The Action center", "The Data connectors page", "The Secure Score page", "The Threat analytics page"], answer: 0, explain: "The Action center lists pending and completed remediation actions from AIR (and manual actions) so analysts can approve, reject, or undo them." },

  /* ---------- IR — multiple response ---------- */

  { type: "multi", cat: "sentinel", topic: "s_incidents", q: "Which TWO actions are valid when closing a Microsoft Sentinel incident? (Choose two.)", options: ["Select a classification reason", "Add a closing comment", "Delete the workspace", "Remove the data connector"], answers: [0, 1], explain: "Closing an incident requires a classification (True/Benign/False positive or Undetermined) and lets you add a comment for the record. Deleting workspaces/connectors is unrelated." },

  { type: "multi", cat: "sentinel", topic: "s_soar", q: "Which TWO tasks can a Sentinel AUTOMATION RULE perform directly (without a playbook)? (Choose two.)", options: ["Change an incident's severity", "Assign an owner to the incident", "Detonate a file in a sandbox", "Block an IP on a firewall"], answers: [0, 1], explain: "Automation rules natively change status/severity, assign owners, and add tags. Complex actions (sandbox detonation, firewall blocks) require a playbook, which the rule can also call." },

  /* ---------- IR — yes/no ---------- */

  { type: "yesno", cat: "sentinel", topic: "s_soar", q: "You must automatically assign every new incident from a specific analytics rule to the Tier-1 team and tag it 'phishing'. Proposed solution: create an automation rule triggered on incident creation. Does this meet the goal?", options: ["Yes", "No"], answer: 0, explain: "Yes. An automation rule 'When incident is created' with a condition on the rule name can assign an owner and add a tag with no playbook needed." },

  { type: "yesno", cat: "sentinel", topic: "s_analytics", q: "Duplicate incidents are flooding the queue from one rule. Proposed solution: enable alert grouping in that analytics rule's incident settings. Does this meet the goal?", options: ["Yes", "No"], answer: 0, explain: "Yes. Alert grouping consolidates related alerts into a single incident (e.g., by entity or within a time window), reducing duplicate incidents while keeping detection active." },

  { type: "yesno", cat: "xdr", topic: "x_incidents", q: "A recurring alert from a legitimate admin script is a confirmed false positive. Proposed solution: delete each incident as it appears. Does this meet the goal?", options: ["Yes", "No"], answer: 1, explain: "No. Deleting incidents is reactive busywork and loses history. Create a suppression rule to tune the alert so it stops recurring for that known-good activity." },

  { type: "sentence", cat: "sentinel", topic: "s_incidents", segments: ["A Sentinel incident moves from ", { options: ["New", "Active"], answer: 0 }, " when it is created, to ", { options: ["New", "Active"], answer: 1 }, " while being worked, and finally to Closed with a required ", { options: ["classification", "severity"], answer: 0 }, "."], explain: "Status lifecycle: New → Active → Closed. Closing requires a classification (True/Benign/False positive or Undetermined); severity is set independently." },

  ];

  window.AZ_QUESTIONS = (window.AZ_QUESTIONS || []).concat(extra);
})();
