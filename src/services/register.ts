import {
  Clasz, Student, Subject, Teacher,
  ClassSubject, ClassStudent, SubjectTeacher,
  ClassTeacher
} from '../models/index';

export const registerEgg = () => {
  return '[EAT THIS EGG]';
};

export const findCreateClass = async (params: any) => {
  const [res, isCreated] = await Clasz.findOrCreate({
    where: { classCode: params.classCode },
    defaults: params
  });
  return res;
};

export const findCreateTeacher = async (params: any) => {
  const [res, isCreated] = await Teacher.findOrCreate({
    where: { email: params.email },
    defaults: params
  });
  return res;
};

export const findCreateSubject = async (params: any) => {
  const [res, isCreated] = await Subject.findOrCreate({
    where: { subjectCode: params.subjectCode },
    defaults: params
  });
  return res;
};

export const findCreateClassTeacher = async (params: any) => {
  const [res, isCreated] = await ClassTeacher.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateSubjectTeacher = async (params: any) => {
  const [res, isCreated] = await SubjectTeacher.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateClassSubject = async (params: any) => {
  const [res, isCreated] = await ClassSubject.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateStudent = async (params: any) => {
  const [res, isCreated] = await Student.findOrCreate({
    where: { email: params.email },
    defaults: params,
  });
  return res;
};

export const findCreateClassStudent = async (params: any) => {
  const [res, isCreated] = await ClassStudent.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};
