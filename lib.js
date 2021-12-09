const crypto = require("crypto");

function getPatientHash(guarantor, famFinUrgNote, apptModNote, email) {
  return getBase64SHA256(guarantor + famFinUrgNote + apptModNote + email);
}

// Date pay format yyyy-MM-dd
function getSplitHash(splitNum, patNum, splitAmt, datePay) {
  return getBase64SHA256(splitNum + patNum + splitAmt + datePay);
}

// AptDateTime Format : yyyy-MM-dd HH:mm:ss
function getApptHash(aptStatusEnumId, confirmed, aptDateTime) {
  let aptStatus = null;

  switch (aptStatusEnumId) {
    case 0:
      aptStatus = "None";
    ///<summary>1- Shows as a regularly scheduled appointment.</summary>
    case 1:
      aptStatus = "Scheduled";
      break;
    ///<summary>2- Shows greyed out.</summary>
    case 2:
      aptStatus = "Complete";
      break;
    case 3:
      aptStatus = "UnschedList";
      break;
    case 4:
      aptStatus = "ASAP";
      break;
    case 5:
      aptStatus = "Broken";
      break;
    case 6:
      aptStatus = "Planned";
      break;
    case 7:
      aptStatus = "PtNote";
      break;
    case 8:
      aptStatus = "PtNoteCompleted";
      break;
  }

  if (!aptStatus) throw Error("Unknown App Status Enum Id " + aptStatusEnumId);

  return getBase64SHA256(aptStatus + confirmed + aptDateTime);
}

function getBase64SHA256(s) {
  return crypto
    .createHash("sha256")
    .update(s + "lOWLBEhO9qS8nb5E", "utf16le")
    .digest("base64");
}

module.exports = {
  getPatientHash: getPatientHash,
  getApptHash: getApptHash,
  getSplitHash: getSplitHash,
};
