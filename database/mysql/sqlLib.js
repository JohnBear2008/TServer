const sqlLib = {
    getMatchUserInfo: 'select * from `users` where UserAID=? and Password=?',
    modifyPassword: 'update `users` set password=? where UserAID=?',
    getBillsUndone: 'SELECT A.*,CONCAT(A.BPID,A.CTRName) AS title FROM (SELECT C.* FROM `ppm_bills_plan` C, (SELECT BPID AS billBPID, MAX(version) AS billVersion FROM `ppm_bills_plan` GROUP BY billBPID) D WHERE C.BPID = D.billBPID AND C.version = D.billVersion AND C.WFStatus <> 0 AND C.WFStatus<>100 ) A where auditor=? and auditResult is null'
}
module.exports = sqlLib;