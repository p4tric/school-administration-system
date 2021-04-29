import Express, { RequestHandler } from 'express';
import { OK } from 'http-status-codes';

import { Clasz, Student, Subject, Teacher, ClassSubject,
  ClassStudent, SubjectTeacher, ClassTeacher } from '../models/index';

import { APP_VERSION } from '../config/common';

const ReportController = Express.Router();

const reportHandler: RequestHandler = async (req, res) => {
  let workloadBody = {} as any;
  const teachers = await Teacher.findAll();

  await Promise.all(teachers.map(async (teacher: any) => {

    const subjects = await teacher.getSubjects();

    workloadBody[teacher.name] = await Promise.all(subjects
      .map(async (subject: any) => {

      const classes = await subject.getClaszs();

      return {
        subjectCode: subject.subjectCode,
        subjectName: subject.name,
        numberOfClasses: classes.length,
      };
    }));
  }));

  return res.json({
    status: OK,
    version: APP_VERSION,
    data: workloadBody,
  });

}

ReportController.get('/reports/workload', reportHandler);

export default ReportController;
