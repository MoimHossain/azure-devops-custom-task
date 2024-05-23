import tl = require("azure-pipelines-task-lib/task");

async function run() {
    try {

        const inputString: string | undefined = tl.getInput("filename", true);
        console.log("Reading immediate values...." + inputString);
        console.log("finished execution", inputString);

        const fs = require("fs");
        const path = require("path");
        const fileName = inputString;
        const filePath = path.join(__dirname, fileName);
        const currentTime = new Date().toISOString();
        fs.writeFileSync(filePath, currentTime);
        console.log("File created successfully");

        // now upload this file as attachment
        const attachmentType = "Distributedtask.Core.Summary";
        const attachmentName = "ComplianceCheck";
        const attachmentLocation = filePath;
        console.log("Uploading attachment....");
        tl.command("task.addattachment", { type: attachmentType, name: attachmentName }, attachmentLocation);
        console.log("Attachment uploaded successfully");

        tl.setResult(tl.TaskResult.Succeeded, "Task completed successfully");
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
