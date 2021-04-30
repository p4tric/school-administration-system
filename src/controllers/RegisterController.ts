import Express, { RequestHandler } from 'express';
import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';

import { register } from '../services/index';

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

  await register.registerPayload(req, res);

  return res.json({
    status: NO_CONTENT,
    version: APP_VERSION,
    message: 'Registration successful.'
  });
}

RegisterController.post('/register', registerHandler);

export default RegisterController;
