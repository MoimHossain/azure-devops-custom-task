import * as TaskLibrary from "azure-pipelines-task-lib/task";

TaskLibrary.debug("Hello world!");

TaskLibrary.setProgress(50, "Hello world!");

console.log("[Written with console log] Hello world!");

TaskLibrary.setResult(TaskLibrary.TaskResult.Succeeded, "Hello world!");
