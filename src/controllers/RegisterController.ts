import Express, { RequestHandler } from 'express';
import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';



import { register } from '../services/index';

import { APP_VERSION } from '../config/common';

const RegisterController = Express.Router();

const registerHandler: RequestHandler = async (req, res) => {
  const { class: clasz, students, subject, teacher } = req.body;

  console.log('[registerEgg] ', register.registerEgg());

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

  const registeredClass = await register.findCreateClass(clasz);
  const registeredTeacher = await register.findCreateTeacher(teacher);
  const registeredSubject = await register.findCreateSubject(subject);

  const registeredClassTeacher = await register.findCreateClassTeacher({
    teacherId: registeredTeacher.id,
    claszId: registeredClass.id
  });

  const registeredSubjectTeacher = await register.findCreateSubjectTeacher({
    teacherId: registeredTeacher.id,
    subjectId: registeredSubject.id
  });

  const registeredClassSubject = await register.findCreateClassSubject({
    claszId: registeredClass.id,
    subjectId: registeredSubject.id
  });

  students.map(async (student: any) => {
    const registeredStudent = await register.findCreateStudent(student);
    const registeredClassStudent = await register.findCreateClassStudent({
      studentId: registeredStudent.id,
      claszId: registeredClass.id
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
