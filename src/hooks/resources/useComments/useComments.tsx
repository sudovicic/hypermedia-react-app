import type { Resource } from '../../../utils/api';

export interface Comment {
  dateCreated: number;
  content: string;
}

// TODO: return real data
// eslint-disable-next-line
export default function useComments(resource: Resource): Comment[] {
  return [
    { dateCreated: Date.now(), content: 'test comment' },
    { dateCreated: Date.now() - 100000, content: 'best movie ever' },
  ];
}
