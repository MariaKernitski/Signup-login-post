import User from "../models/user-model.js";
import {generateToken} from "../services/jwt-service.js";

export const signup = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.create({email, password});

    const token = generateToken(user);

    res.status(201).json({token});
  }
  catch(error) {
    res.status(500).send(error.message);
  } 
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({email});

    if (user && (await user.isValidPassword(password))) {
      const token = generateToken(user);

      res.json({token});
    }
    else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    res.status(500).send(error.message);
  }
};

import Post from "../models/post-model.js";

export const store = async (req, res) => {
  try {
    const { text } = req.body;
    const user = req.user._id;

    const content = await Post.create({
      text,
      user,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Post.find().exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Post.findById(req.params.id).exec();
    res.json(content);
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Post.findByIdAndUpdate({_id: req.params.id, user,}).exec();
    res.json(content);
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    const content = await Post.findByIdAndDelete({_id: req.params.id,user,}).exec();
    res.json(content);
  
  } catch (error) {
    res.status(500).send(error.message);
  }
};