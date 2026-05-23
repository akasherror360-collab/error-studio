// 1. CONFIGURATION
const ADMIN_EMAIL = "tn31holidays@gmail.com";

/**
 * Main function that handles form submissions (JSON format)
 */
function doPost(e) {
  try {
    Logger.log("--- New Submission Received ---");
    
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Empty request body or invalid format");
    }

    const data = JSON.parse(e.postData.contents);
    Logger.log("Data received: " + JSON.stringify(data));

    // A. Append to Sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    
    // Columns: Timestamp, Name, Email, Mobile, Project Type, Message
    sheet.appendRow([
      new Date(),
      data.fullName || "N/A",
      data.email || "N/A",
      data.mobile || "N/A",
      data.projectType || "N/A",
      data.message || "N/A",
    ]);
    Logger.log("✅ Successfully appended to sheet");

    // B. Send Admin Email
    try {
      sendAdminNotification(data);
      Logger.log("✅ Admin notification sent");
    } catch (err) {
      Logger.log("❌ Admin Email Error: " + err.toString());
    }

    // C. Send User Confirmation Email
    if (data.email && data.email !== "N/A") {
      try {
        sendUserConfirmation(data);
        Logger.log("✅ User confirmation sent");
      } catch (err) {
        Logger.log("❌ User Email Error: " + err.toString());
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("FATAL ERROR: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendAdminNotification(data) {
  const subject = "New Project Enquiry from " + (data.fullName || "Customer");
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #FF8D1D; border-bottom: 2px solid #FF8D1D; padding-bottom: 10px;">New Enquiry Details</h2>
      <p style="font-size: 16px;"><strong>Name:</strong> ${data.fullName}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${data.email}</p>
      <p style="font-size: 16px;"><strong>Mobile:</strong> ${data.mobile}</p>
      <p style="font-size: 16px;"><strong>Project Type:</strong> ${data.projectType}</p>
      <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px;">
        <p style="font-size: 16px;"><strong>Message:</strong></p>
        <p style="font-size: 14px; color: #555;">${data.message}</p>
      </div>
    </div>
  `;
  GmailApp.sendEmail(ADMIN_EMAIL, subject, "New enquiry received.", { htmlBody: htmlBody });
}

function sendUserConfirmation(data) {
  const subject = "Thank you for contacting Error Studio!";
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #111; color: white; border-radius: 15px;">
      <h1 style="color: #ff5252; letter-spacing: 2px;">ERROR STUDIO</h1>
      <p style="font-size: 18px;">Hi ${data.fullName},</p>
      <p style="font-size: 16px; color: #ccc;">We have received your enquiry for <strong>${data.projectType}</strong>.</p>
      <p style="font-size: 14px; color: #cc;">Our team will review your details and contact you shortly to discuss the next steps.</p>
      <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
        <p style="font-weight: bold; color: #ff5252;">Team Error Studio</p>
      </div>
    </div>
  `;
  GmailApp.sendEmail(data.email, subject, "Thank you for your enquiry.", { htmlBody: htmlBody });
}

/**
 * 🚨 IMPORTANT: RUN THIS ONCE MANUALLY
 * Click 'Run' next to this function in the toolbar to authorize Gmail.
 */
function runOnceToAuthorize() {
  const email = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(email, "Authorization Successful", "Your script is now authorized to send emails.");
  Logger.log("Authorization email sent to: " + email);
}
