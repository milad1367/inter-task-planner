export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string;
  labels: string[];
  status: string;
  comments: string[];
  attachments: string[];
}
