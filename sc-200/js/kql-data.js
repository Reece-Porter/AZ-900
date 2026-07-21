/* =====================================================================
   SC-200 Study Hub — KQL sandbox data + scenarios
   Realistic (fictional) security tables and a set of gated challenges
   that increase in difficulty. The sandbox's "current time" is fixed so
   ago()/now() are deterministic.
   ===================================================================== */
(function () {
  const NOW = Date.parse("2026-06-21T00:00:00Z"); // sandbox "now"

  const TABLES = {
    /* ---------------- SigninLogs ---------------- */
    SigninLogs: [
      { TimeGenerated: "2026-06-20T08:12:00Z", UserPrincipalName: "jsmith@contoso.com",    IPAddress: "203.0.113.10", Location: "US-NY",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Office 365 Exchange Online" },
      { TimeGenerated: "2026-06-20T08:45:00Z", UserPrincipalName: "jsmith@contoso.com",    IPAddress: "203.0.113.10", Location: "US-NY",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Microsoft Teams" },
      { TimeGenerated: "2026-06-20T12:03:00Z", UserPrincipalName: "jsmith@contoso.com",    IPAddress: "203.0.113.10", Location: "US-NY",     ResultType: "50074", ResultDescription: "MFA required",         AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-19T09:20:00Z", UserPrincipalName: "jsmith@contoso.com",    IPAddress: "203.0.113.10", Location: "US-NY",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "SharePoint Online" },
      { TimeGenerated: "2026-06-18T16:40:00Z", UserPrincipalName: "jsmith@contoso.com",    IPAddress: "198.51.100.7", Location: "US-CA",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Office 365 Exchange Online" },

      { TimeGenerated: "2026-06-20T07:55:00Z", UserPrincipalName: "aparker@contoso.com",   IPAddress: "198.51.100.22",Location: "US-CA",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Microsoft Teams" },
      { TimeGenerated: "2026-06-20T10:15:00Z", UserPrincipalName: "aparker@contoso.com",   IPAddress: "198.51.100.22",Location: "US-CA",     ResultType: "50074", ResultDescription: "MFA required",         AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-19T11:00:00Z", UserPrincipalName: "aparker@contoso.com",   IPAddress: "198.51.100.22",Location: "US-CA",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "SharePoint Online" },
      { TimeGenerated: "2026-06-18T13:30:00Z", UserPrincipalName: "aparker@contoso.com",   IPAddress: "198.51.100.22",Location: "US-CA",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "OneDrive" },

      { TimeGenerated: "2026-06-20T02:01:00Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "185.220.101.5",Location: "RU-Moscow", ResultType: "50126", ResultDescription: "Invalid credentials", AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-20T02:01:20Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "185.220.101.5",Location: "RU-Moscow", ResultType: "50126", ResultDescription: "Invalid credentials", AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-20T02:01:45Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "185.220.101.5",Location: "RU-Moscow", ResultType: "50126", ResultDescription: "Invalid credentials", AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-20T02:02:10Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "185.220.101.5",Location: "RU-Moscow", ResultType: "53003", ResultDescription: "Blocked by CA policy",AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-20T02:02:30Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "185.220.101.5",Location: "RU-Moscow", ResultType: "50126", ResultDescription: "Invalid credentials", AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-19T18:22:00Z", UserPrincipalName: "bpatel@contoso.com",    IPAddress: "10.10.5.30",   Location: "UK-London", ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Microsoft Teams" },

      { TimeGenerated: "2026-06-20T09:05:00Z", UserPrincipalName: "mchen@contoso.com",     IPAddress: "10.10.5.31",   Location: "UK-London", ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "SharePoint Online" },
      { TimeGenerated: "2026-06-20T14:40:00Z", UserPrincipalName: "mchen@contoso.com",     IPAddress: "10.10.5.31",   Location: "UK-London", ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "OneDrive" },
      { TimeGenerated: "2026-06-18T08:10:00Z", UserPrincipalName: "mchen@contoso.com",     IPAddress: "10.10.5.31",   Location: "UK-London", ResultType: "50126", ResultDescription: "Invalid credentials", AppDisplayName: "Azure Portal" },

      { TimeGenerated: "2026-06-20T11:11:00Z", UserPrincipalName: "twilliams@contoso.com", IPAddress: "192.0.2.44",   Location: "DE-Berlin", ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Office 365 Exchange Online" },
      { TimeGenerated: "2026-06-19T15:05:00Z", UserPrincipalName: "twilliams@contoso.com", IPAddress: "192.0.2.44",   Location: "DE-Berlin", ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Microsoft Teams" },

      { TimeGenerated: "2026-06-20T03:30:00Z", UserPrincipalName: "svc-backup@contoso.com",IPAddress: "10.10.9.9",    Location: "US-NY",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Azure Portal" },
      { TimeGenerated: "2026-06-18T03:30:00Z", UserPrincipalName: "svc-backup@contoso.com",IPAddress: "10.10.9.9",    Location: "US-NY",     ResultType: "0",     ResultDescription: "Success",             AppDisplayName: "Azure Portal" },
    ],

    /* ---------------- SecurityEvent ---------------- */
    SecurityEvent: [
      { TimeGenerated: "2026-06-20T08:12:05Z", Computer: "WKS-FIN01", Account: "CONTOSO\\jsmith",        EventID: 4624, Activity: "An account was successfully logged on", LogonType: 2,  IpAddress: "203.0.113.10" },
      { TimeGenerated: "2026-06-20T08:12:06Z", Computer: "SRV-FILE01",Account: "CONTOSO\\jsmith",        EventID: 4624, Activity: "An account was successfully logged on", LogonType: 3,  IpAddress: "203.0.113.10" },
      { TimeGenerated: "2026-06-20T02:01:05Z", Computer: "SRV-DC01",  Account: "CONTOSO\\bpatel",        EventID: 4625, Activity: "An account failed to log on",          LogonType: 3,  IpAddress: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T02:01:25Z", Computer: "SRV-DC01",  Account: "CONTOSO\\bpatel",        EventID: 4625, Activity: "An account failed to log on",          LogonType: 3,  IpAddress: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T02:01:50Z", Computer: "SRV-DC01",  Account: "CONTOSO\\bpatel",        EventID: 4625, Activity: "An account failed to log on",          LogonType: 3,  IpAddress: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T01:40:00Z", Computer: "SRV-DC01",  Account: "CONTOSO\\administrator", EventID: 4625, Activity: "An account failed to log on",          LogonType: 10, IpAddress: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T01:40:20Z", Computer: "SRV-DC01",  Account: "CONTOSO\\administrator", EventID: 4625, Activity: "An account failed to log on",          LogonType: 10, IpAddress: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T04:00:00Z", Computer: "SRV-DC01",  Account: "CONTOSO\\administrator", EventID: 4624, Activity: "An account was successfully logged on", LogonType: 10, IpAddress: "10.10.5.30" },
      { TimeGenerated: "2026-06-20T04:05:00Z", Computer: "SRV-FILE01",Account: "CONTOSO\\administrator", EventID: 4624, Activity: "An account was successfully logged on", LogonType: 3,  IpAddress: "10.10.5.30" },
      { TimeGenerated: "2026-06-20T04:10:00Z", Computer: "SRV-SQL01", Account: "CONTOSO\\administrator", EventID: 4672, Activity: "Special privileges assigned to new logon", LogonType: 10, IpAddress: "10.10.5.30" },
      { TimeGenerated: "2026-06-20T04:11:00Z", Computer: "SRV-SQL01", Account: "CONTOSO\\administrator", EventID: 4624, Activity: "An account was successfully logged on", LogonType: 3,  IpAddress: "10.10.5.30" },
      { TimeGenerated: "2026-06-19T09:00:00Z", Computer: "SRV-SQL01", Account: "CONTOSO\\svc-sql",       EventID: 4624, Activity: "An account was successfully logged on", LogonType: 5,  IpAddress: "10.10.5.40" },
      { TimeGenerated: "2026-06-19T09:00:10Z", Computer: "SRV-SQL01", Account: "CONTOSO\\svc-sql",       EventID: 4672, Activity: "Special privileges assigned to new logon", LogonType: 5,  IpAddress: "10.10.5.40" },
      { TimeGenerated: "2026-06-20T09:05:03Z", Computer: "WKS-FIN02", Account: "CONTOSO\\mchen",         EventID: 4624, Activity: "An account was successfully logged on", LogonType: 2,  IpAddress: "10.10.5.31" },
      { TimeGenerated: "2026-06-18T08:10:03Z", Computer: "WKS-FIN02", Account: "CONTOSO\\mchen",         EventID: 4625, Activity: "An account failed to log on",          LogonType: 2,  IpAddress: "10.10.5.31" },
      { TimeGenerated: "2026-06-20T11:11:05Z", Computer: "WKS-ENG01", Account: "CONTOSO\\twilliams",     EventID: 4624, Activity: "An account was successfully logged on", LogonType: 2,  IpAddress: "192.0.2.44" },
    ],

    /* ---------------- DeviceProcessEvents ---------------- */
    DeviceProcessEvents: [
      { TimeGenerated: "2026-06-20T02:05:00Z", DeviceName: "wks-fin01", AccountName: "jsmith",        FileName: "powershell.exe", ProcessCommandLine: "powershell.exe -NoProfile -EncodedCommand SQBFAFgA", InitiatingProcessFileName: "winword.exe" },
      { TimeGenerated: "2026-06-20T02:06:00Z", DeviceName: "srv-file01",AccountName: "administrator", FileName: "powershell.exe", ProcessCommandLine: "powershell -w hidden -EncodedCommand JABzAD0A", InitiatingProcessFileName: "cmd.exe" },
      { TimeGenerated: "2026-06-20T09:30:00Z", DeviceName: "wks-fin02", AccountName: "mchen",         FileName: "powershell.exe", ProcessCommandLine: "powershell.exe Get-Process",           InitiatingProcessFileName: "explorer.exe" },
      { TimeGenerated: "2026-06-20T02:07:00Z", DeviceName: "srv-file01",AccountName: "administrator", FileName: "mimikatz.exe",   ProcessCommandLine: "mimikatz.exe sekurlsa::logonpasswords", InitiatingProcessFileName: "cmd.exe" },
      { TimeGenerated: "2026-06-20T02:08:00Z", DeviceName: "srv-file01",AccountName: "administrator", FileName: "cmd.exe",        ProcessCommandLine: "cmd.exe /c whoami /all",              InitiatingProcessFileName: "powershell.exe" },
      { TimeGenerated: "2026-06-20T02:09:00Z", DeviceName: "srv-file01",AccountName: "administrator", FileName: "net.exe",        ProcessCommandLine: "net user administrator /domain",      InitiatingProcessFileName: "cmd.exe" },
      { TimeGenerated: "2026-06-20T02:10:00Z", DeviceName: "srv-dc01",  AccountName: "administrator", FileName: "reg.exe",        ProcessCommandLine: "reg save hklm\\sam sam.hive",         InitiatingProcessFileName: "cmd.exe" },
      { TimeGenerated: "2026-06-19T14:00:00Z", DeviceName: "wks-eng01", AccountName: "twilliams",     FileName: "code.exe",       ProcessCommandLine: "code.exe .",                          InitiatingProcessFileName: "explorer.exe" },
      { TimeGenerated: "2026-06-20T12:00:00Z", DeviceName: "wks-fin01", AccountName: "jsmith",        FileName: "excel.exe",      ProcessCommandLine: "excel.exe budget.xlsx",               InitiatingProcessFileName: "explorer.exe" },
      { TimeGenerated: "2026-06-20T21:15:00Z", DeviceName: "wks-fin01", AccountName: "jsmith",        FileName: "powershell.exe", ProcessCommandLine: "powershell.exe -enc dwBoAG8AYQBtAGkA", InitiatingProcessFileName: "outlook.exe" },
    ],

    /* ---------------- DeviceLogonEvents ---------------- */
    DeviceLogonEvents: [
      { TimeGenerated: "2026-06-20T08:12:00Z", DeviceName: "wks-fin01", AccountName: "jsmith",        ActionType: "LogonSuccess", LogonType: "Interactive", RemoteIP: "" },
      { TimeGenerated: "2026-06-20T02:01:00Z", DeviceName: "srv-dc01",  AccountName: "bpatel",        ActionType: "LogonFailed",  LogonType: "Network",     RemoteIP: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T02:01:20Z", DeviceName: "srv-dc01",  AccountName: "bpatel",        ActionType: "LogonFailed",  LogonType: "Network",     RemoteIP: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T01:40:00Z", DeviceName: "srv-dc01",  AccountName: "administrator", ActionType: "LogonFailed",  LogonType: "RemoteInteractive", RemoteIP: "185.220.101.5" },
      { TimeGenerated: "2026-06-20T04:00:00Z", DeviceName: "srv-dc01",  AccountName: "administrator", ActionType: "LogonSuccess", LogonType: "RemoteInteractive", RemoteIP: "10.10.5.30" },
      { TimeGenerated: "2026-06-20T09:05:00Z", DeviceName: "wks-fin02", AccountName: "mchen",         ActionType: "LogonSuccess", LogonType: "Interactive", RemoteIP: "" },
      { TimeGenerated: "2026-06-20T11:11:00Z", DeviceName: "wks-eng01", AccountName: "twilliams",     ActionType: "LogonSuccess", LogonType: "Interactive", RemoteIP: "" },
      { TimeGenerated: "2026-06-18T08:10:00Z", DeviceName: "wks-fin02", AccountName: "mchen",         ActionType: "LogonFailed",  LogonType: "Interactive", RemoteIP: "" },
    ],

    /* ---------------- SecurityAlert ---------------- */
    SecurityAlert: [
      { TimeGenerated: "2026-06-20T02:15:00Z", AlertName: "Multiple failed sign-ins (possible brute force)", Severity: "High",   CompromisedEntity: "bpatel@contoso.com",  ProviderName: "Microsoft Entra ID Protection" },
      { TimeGenerated: "2026-06-20T02:20:00Z", AlertName: "Suspicious PowerShell encoded command",           Severity: "High",   CompromisedEntity: "jsmith@contoso.com",  ProviderName: "Microsoft Defender for Endpoint" },
      { TimeGenerated: "2026-06-20T02:25:00Z", AlertName: "Credential theft tool detected (Mimikatz)",       Severity: "High",   CompromisedEntity: "unknown@contoso.com", ProviderName: "Microsoft Defender for Endpoint" },
      { TimeGenerated: "2026-06-20T10:00:00Z", AlertName: "Impossible travel activity",                      Severity: "Medium", CompromisedEntity: "aparker@contoso.com", ProviderName: "Microsoft Defender for Cloud Apps" },
      { TimeGenerated: "2026-06-19T09:10:00Z", AlertName: "Anomalous service account logon",                 Severity: "Low",    CompromisedEntity: "svc-sql@contoso.com", ProviderName: "Microsoft Sentinel" },
      { TimeGenerated: "2026-06-20T04:12:00Z", AlertName: "Special privileges assigned to new logon",        Severity: "Medium", CompromisedEntity: "administrator@contoso.com", ProviderName: "Microsoft Defender for Cloud" },
    ],
  };

  const SCENARIOS = [
    { id: "s1", title: "Filter with where", level: "Beginner", table: "SigninLogs", ordered: false,
      task: "Return every sign-in performed by the user jsmith@contoso.com.",
      solution: 'SigninLogs | where UserPrincipalName == "jsmith@contoso.com"',
      hints: ["Start with the table name, then pipe into an operator: SigninLogs | ...", "Use where to filter rows and == to compare.", 'String values need double quotes: where UserPrincipalName == "jsmith@contoso.com"'] },

    { id: "s2", title: "Count the rows", level: "Beginner", table: "SigninLogs", ordered: false,
      task: "How many sign-in records are in SigninLogs in total? Return a single number.",
      solution: "SigninLogs | count",
      hints: ["The count operator returns the number of rows.", "SigninLogs | count"] },

    { id: "s3", title: "Project specific columns", level: "Beginner", table: "SigninLogs", ordered: false,
      task: 'Return only the UserPrincipalName and IPAddress of every FAILED sign-in. (A successful sign-in has ResultType "0"; anything else is a failure.)',
      solution: 'SigninLogs | where ResultType != "0" | project UserPrincipalName, IPAddress',
      hints: ['Filter failures with where ResultType != "0".', "Choose columns with project.", "project UserPrincipalName, IPAddress"] },

    { id: "s4", title: "Distinct values", level: "Beginner", table: "SigninLogs", ordered: false,
      task: "List the distinct Locations that sign-ins originated from.",
      solution: "SigninLogs | distinct Location",
      hints: ["distinct returns unique rows for the column(s) you name.", "SigninLogs | distinct Location"] },

    { id: "s5", title: "Aggregate with summarize", level: "Intermediate", table: "SigninLogs", ordered: false,
      task: "Count how many sign-ins occurred for each ResultType. Use the default count column name (count_).",
      solution: "SigninLogs | summarize count() by ResultType",
      hints: ["summarize count() by <column> groups rows and counts them.", "The default count column is named count_.", "SigninLogs | summarize count() by ResultType"] },

    { id: "s6", title: "Top N by count", level: "Intermediate", table: "SigninLogs", ordered: true,
      task: "Which 3 users have the most sign-ins? Return UserPrincipalName and count_, highest first.",
      solution: "SigninLogs | summarize count() by UserPrincipalName | top 3 by count_ desc",
      hints: ["First summarize count() by UserPrincipalName.", "Then use top 3 by count_ desc.", "top keeps the highest values first."] },

    { id: "s7", title: "Filter on time", level: "Intermediate", table: "SigninLogs", ordered: false,
      task: "Return all sign-ins from the last 24 hours. (The sandbox's current time is 2026-06-21 00:00Z.)",
      solution: "SigninLogs | where TimeGenerated > ago(1d)",
      hints: ["ago(1d) is the datetime 24 hours before now.", "Compare TimeGenerated > ago(1d).", "SigninLogs | where TimeGenerated > ago(1d)"] },

    { id: "s8", title: "Failed logons per account", level: "Intermediate", table: "SecurityEvent", ordered: false,
      task: "In SecurityEvent, find failed logons (EventID 4625) and count them per Account (default count column name).",
      solution: "SecurityEvent | where EventID == 4625 | summarize count() by Account",
      hints: ["EventID 4625 means a failed logon.", "Filter first, then summarize count() by Account.", "EventID is a number, so no quotes: EventID == 4625"] },

    { id: "s9", title: "Threat hunt (contains + and)", level: "Advanced", table: "DeviceProcessEvents", ordered: false,
      task: 'Hunt for PowerShell running encoded commands. Return DeviceName and ProcessCommandLine where FileName is "powershell.exe" AND the command line contains "encodedcommand".',
      solution: 'DeviceProcessEvents | where FileName == "powershell.exe" and ProcessCommandLine contains "encodedcommand" | project DeviceName, ProcessCommandLine',
      hints: ["Combine two conditions with and.", "contains is a case-insensitive substring match.", 'Finish with project DeviceName, ProcessCommandLine'] },

    { id: "s10", title: "Distinct count (dcount)", level: "Advanced", table: "SecurityEvent", ordered: false,
      task: "For successful logons (EventID 4624), how many DISTINCT Computers did each Account log on to? Return Account and dcount_Computer.",
      solution: "SecurityEvent | where EventID == 4624 | summarize dcount(Computer) by Account",
      hints: ["dcount() counts distinct values.", "Its default column name is dcount_Computer.", "Filter EventID == 4624 first, then summarize dcount(Computer) by Account"] },

    { id: "s11", title: "Join two tables", level: "Expert", table: "SecurityAlert + SigninLogs", ordered: false,
      task: "Find users who have a HIGH severity alert AND also appear in SigninLogs. Return the distinct UserPrincipalName. (SecurityAlert.CompromisedEntity holds the user; match it to SigninLogs.UserPrincipalName.)",
      solution: 'SecurityAlert | where Severity == "High" | project UserPrincipalName = CompromisedEntity | join kind=inner (SigninLogs) on UserPrincipalName | distinct UserPrincipalName',
      hints: ['Filter High alerts, then rename the entity: project UserPrincipalName = CompromisedEntity', "Join to the other table: join kind=inner (SigninLogs) on UserPrincipalName", "Finish with distinct UserPrincipalName"] },
  ];

  const API = { NOW, TABLES, SCENARIOS };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (typeof window !== "undefined") window.KQLDATA = API;
})();
