import Express, { RequestHandler } from 'express';
import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';

import { Clasz, Student, Subject, Teacher, ClassSubject,
  ClassStudent, SubjectTeacher, ClassTeacher } from '../models/index';

import { APP_VERSION } from '../config/common';

const RegisterController = Express.Router();

const registerHandler: RequestHandler = async (req, res) => {
  const { class: clasz, students, subject, teacher } = req.body;

  if (!teacher || !subject || !students || !clasz ||
    Object.keys(teacher).length < 2 ||
    Object.keys(subject).length < 2 ||
    Object.keys(clasz).length < 2 ||
    students.length === 0) {

    return res.json({
      status: BAD_REQUEST,
      version: APP_VERSION,
      message: 'All fields are mandatory.'
    });

  }

  const [resClass, classCreated] = await Clasz.findOrCreate({
    where: { classCode: clasz.classCode },
    defaults: clasz
  });

  const [resTeacher, teacherCreated] = await Teacher.findOrCreate({
    where: { email: teacher.email },
    defaults: teacher
  });

  const [resSubject, subjectCreated] = await Subject.findOrCreate({
    where: { subjectCode: subject.subjectCode },
    defaults: subject
  });

  const [resClassTeacher, classTeacherCreated] = await ClassTeacher.findOrCreate({
    where: {
      teacherId: resTeacher.id,
      claszId: resClass.id
    },
    defaults: {
      teacherId: resTeacher.id,
      claszId: resClass.id
    },
  });

  const [resSubjectTeacher, subjectTeacherCreated] = await SubjectTeacher.findOrCreate({
    where: {
      teacherId: resTeacher.id,
      subjectId: resSubject.id
    },
    defaults: {
      teacherId: resTeacher.id,
      subjectId: resSubject.id
    },
  });

  const [resClassSubject, classSubjectCreated] = await ClassSubject.findOrCreate({
    where: {
      claszId: resClass.id,
      subjectId: resSubject.id
    },
    defaults: {
      claszId: resClass.id,
      subjectId: resSubject.id
    },
  });

  students.map(async (student: any) => {
    const [resStudent, studentCreated] = await Student.findOrCreate({
      where: { email: student.email },
      defaults: student
    });

    const [resClassStudent, classStudentCreated] = await ClassStudent.findOrCreate({
      where: {
        studentId: resStudent.id,
        claszId: resClass.id
      },
      defaults: {
        studentId: resStudent.id,
        claszId: resClass.id
      }
    });
  });

  return res.json({
    status: NO_CONTENT,
    version: APP_VERSION,
    message: 'Registration successful.'
  });
}

RegisterController.post('/register', registerHandler);

export default RegisterController;
