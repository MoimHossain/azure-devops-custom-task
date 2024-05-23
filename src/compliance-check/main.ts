import tl = require("azure-pipelines-task-lib/task");

async function run() {
    try {
        const fs = require("fs");
        const path = require("path");

        const fileName: string | undefined = tl.getInput("filename", true);
        const filePath: string | undefined = tl.getInput("filepath", true);

        console.log("File name provided by user...." + fileName);
        console.log("File path provided by user...." + filePath);
        // const filePath = path.join(__dirname, fileName);

        if (!fs.existsSync(filePath)) {
            const currentTime = new Date().toISOString();
            fs.writeFileSync(filePath, currentTime);
            console.log("File was not found, created a new file with current time....");
        }

        // now upload this file as attachment
        const attachmentType = "Distributedtask.Core.Summary";
        const attachmentName = fileName;
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
