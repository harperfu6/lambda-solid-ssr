import { APIEvent, json } from "solid-start/api";
import {
  CloudWatchLogsClient,
  DescribeLogGroupsCommand,
  GetLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
const client = new CloudWatchLogsClient({ region: REGION });

const getLog = async () => {
  try {
    const command = new GetLogEventsCommand({
      logStreamName: "2023/07/29/[$LATEST]f43302f1a7aa4d53beb6a84beef9657f",
      logGroupName:
        "/aws/lambda/CdkStack-LambdaDockerWebAppHandler7EA9860B-2SvncSW7UO6z",
      startTime: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days
      endTime: Date.now(),
    });
    const response = await client.send(command);
    const events = response.events!.map((event) => event.message);
    return events;
  } catch (error) {
    return [error];
  }
};

const listLogGroups = async () => {
  try {
    const command = new DescribeLogGroupsCommand({});
    const response = await client.send(command);
    const logGroups = response.logGroups!.map(
      (logGroup) => logGroup.logGroupName
    );
    return logGroups;
  } catch (error) {
    return [error];
  }
};
export async function GET() {
  // const response = await listLogGroups();
  const response = await getLog();
  return json({ response });
}
