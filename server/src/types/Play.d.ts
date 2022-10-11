import { Schema } from 'mongoose';

interface Play {
  userID: any;
  questions: [
    {
      questionId: any;
      answered: boolean;
      answer: number;
    },
  ];
  timeOut: Date;
  totalScore: number;
  attitudeScore: number;
  knowledgeScore: number;
  interviewer: string;
  comment: string;
  isInterviewed: boolean;
}
