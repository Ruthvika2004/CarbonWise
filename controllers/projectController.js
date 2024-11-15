const Project= require('../models/projectModel')

//func to get all projects

const mongoose = require('mongoose')

// get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1})

  res.status(200).json(projects)
}

// get a single project
const getProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }

  const project = await Project.findById(id)

  if (!project) {
    return res.status(404).json({error: 'No such project'})
  }

  res.status(200).json(project)
}

// create a new project
const createProject = async (req, res) => {
  const {Project_title,Carbon_credits,Location} = req.body

  // add to the database
  try {
    const project = await Project.create({ Project_title,Carbon_credits,Location })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a project
const deleteProject = async (req, res) => {

}

// update a project
const updateProject = async (req, res) => {

}

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
}

